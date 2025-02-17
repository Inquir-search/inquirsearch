import EventEmitter from './EventEmitter'; // Correct import for custom EventEmitter
import { SSEClient } from './SSE';

class Message {
    /**
     * 
     * @param {string} message 
     * @param {"user" | "bot"} [sender] 
     */
    constructor(message, sender = "bot") {
        this._message = message;
        this._sender = sender;
    }

    set message(message) {
        this._message = message;
    }

    get message() {
        return this._message;
    }

    get sender() {
        return this._sender;
    }
}

export default class MessagesManager extends EventEmitter {
    constructor({ baseUrl = 'https://platform.inquir.org', apiKey: token }) {
        super();
        this.baseUrl = baseUrl;
        this.token = token;
        this.sseClient = new SSEClient();
        this.state = {
            loading: false,
            errors: null,
            messages: new Map(),
            history: [],
            objectProperties: undefined,
        };
        
        // Bind all methods
        this.setState = this.setState.bind(this);
        this.getState = this.getState.bind(this);
        this.initSubscriptions = this.initSubscriptions.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this.initSubscriptions();
        this.subscriptions = [];
    }

    // Convert getter methods to arrow functions to preserve context
    isLoading = () => {
        return this.state.loading;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.emit('update', this.state);
        this.subscriptions.forEach(sub => sub(this.state));
    }

    initSubscriptions() {
        this.sseClient.on('history', (data) => {
            this.setState({ history: data });
            this.emit('historyChange', data);
            this.subscriptions.forEach(sub => sub(this.state));
        });
        this.sseClient.once('message', () => {
            this.emit('startedLoading', true);
        });
        this.sseClient.on('message', (data) => {
            const { id, choices } = data;
            const message = choices?.[0]?.delta?.content || '';
            const messageInMap = this.state.messages.get(id);
            if (messageInMap) {
                messageInMap.message += message;
            } else {
                this.state.messages.set(id, new Message(message, "bot"));
            }
            this.setState({ messages: this.state.messages });
            this.emit('messagesChange', Array.from(this.state.messages.values()));
            this.subscriptions.forEach(sub => sub(this.state));
        });
        this.sseClient.on('objectProperties', (data) => {
            this.setState({ objectProperties: data });
            this.emit('objectPropertiesChange', data);
            this.subscriptions.forEach(sub => sub(this.state));
        });
        this.sseClient.on('error', (data) => {
            this.setState({ errors: data });
            this.emit('error', data);
            this.subscriptions.forEach(sub => sub(this.state));
        });
    }

    addMessage(message, sender = "user") {
        this.state.messages.set(Date.now(), new Message(message, sender));
        this.setState({ messages: this.state.messages });
        this.emit('messagesChange', Array.from(this.state.messages.values()));
        this.subscriptions.forEach(sub => sub(this.state));
    }

    clearMessages() {
        this.state.messages.clear();
        this.setState({ messages: this.state.messages });
        this.emit('messagesChange', []);
        this.subscriptions.forEach(sub => sub(this.state));
    }

    get messages() {
        return Array.from(this.state.messages.values());
    }

    subscribe(fn) {
        this.subscriptions.push(fn);
        return () => {
            this.subscriptions = this.subscriptions.filter(sub => sub !== fn);
        }
    }

    getState() {
        return this.state
    }

    get history() {
        return this.state.history;
    }

    /**
     * 
     * @param {Record<string, (string | number)>} body 
     */
    async sendMessage(body) {
        this.setState({ loading: true });
        this.emit('loading', true);
        try {
            // Add the user's query to the messages
            this.addMessage(body.query, "user");

            await this.sseClient.fetchDataSSE(`${this.baseUrl}/api/search/chat`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({ ...body, history: this.state.history })
            });

        } catch (error) {
            this.setState({ errors: error });
            this.emit('error', error);
        } finally {
            this.setState({ loading: false });
            this.emit('loading', false);
        }
    }
}