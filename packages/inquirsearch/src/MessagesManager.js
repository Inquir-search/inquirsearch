import BehaviorSubject from './BehaviorSubject';
import EventEmitter from './EventEmitter';
import { SSEClient } from './SSE';

class Message {
    constructor(message) {
        this._message = message;
    }

    set message(message) {
        this._message = message;
    }

    get message() {
        return this._message;
    }

}

export default class MessagesManager extends EventEmitter {

    messages = new BehaviorSubject(new Map());
    history = new BehaviorSubject([]);
    objectProperties = undefined;

    constructor({ baseUrl = 'https://platform.inquir.org', apiKey: token }) {
        super();
        this.baseUrl = baseUrl;
        this.token = token;
        this.sseClient = new SSEClient();
        this.initSubscriptions();
    }

    initSubscriptions() {
        const { messages, history } = this;
        this.sseClient.on('history', (data) => {
            history.next(data);
        });
        this.sseClient.on('message', (data) => {
            const { id, choices } = data;
            const message = choices?.[0]?.delta?.content || '';
            const messageInMap = this.messages.value.get(id);
            if (messageInMap) {
                messageInMap.message += message;
            } else {
                this.messages.value.set(id, new Message(message));
            }
            this.messages.next(new Map(this.messages.value));
        });
        this.sseClient.on('objectProperties', (data) => {
            this.objectProperties = data;
        });
        this.sseClient.on('error', (data) => {
        });
    }

    updateHistory(data) {

    }

    addMessage(message) {
        this.messages.push(new Message(message));
    }

    getMessages() {
        return this.messages;
    }

    clearMessages() {
        this.messages = [];
    }

    notify(eventName, data) {
        this.emit(eventName, data);
    }

    subscribe(event, listener) {
        return this.sseClient.on(event, listener);
    }

    unsubscribe(event, listener) {
        return this.sseClient.off(event, listener);
    }

    /**
     * 
     * @param {Record<string, (string | number)>} body 
     */
    sendMessage(body) {
        const { history } = this;
        return this.sseClient.fetchDataSSE(`${this.baseUrl}/api/search/chat`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ ...body, history: history.value })
        })
    }

}