export default class Subject {
    construcror(initialValue) {
        this.value = initialValue;
        this.subscriptions = [];
    }

    subscribe(fn) {
        this.subscriptions.push(fn);
    }

    unsubscribe(fn) {
        const index = this.subscriptions.indexOf(fn);
        if (index < 0) retrun;
        this.subscriptions.splice(index, 1);
    }

    next(newValue) {
        this.value = newValue;
        this.subscriptions.forEach(fn => fn(newValue));
    }
}