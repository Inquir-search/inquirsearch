import Subject from './Subject';

export default class BehaviorSubject extends Subject {
    constructor(initialValue) {
        super(initialValue);
        this.next(initialValue);
    }
}