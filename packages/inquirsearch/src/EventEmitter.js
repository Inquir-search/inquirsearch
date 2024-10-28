class EventEmitter {
    constructor() {
        this.events = {};
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

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach((listener) => listener(data));
    }
}

export default EventEmitter;
