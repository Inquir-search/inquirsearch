class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        return this.subscribe(event, listener);
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.unsubscribe(event, wrapper);
            return listener(...args);
        };
        this.subscribe(event, wrapper);
    }

    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.unsubscribe(event, listener);
    }

    unsubscribe(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(
            (listener) => listener !== listenerToRemove
        );
    }

    removeAllListeners() {
        this.events = {};
    }

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach((listener) => listener(data));
    }
}

export default EventEmitter;
