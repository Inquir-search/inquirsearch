import EventEmitter from './EventEmitter';

class SearchBox {
    constructor(searchManager) {
        this.searchManager = searchManager;
        this.query = '';
        this.eventEmitter = new EventEmitter();
    }

    setQuery(query) {
        this.query = query;
        this.searchManager.updateQueryParams({ query });
        this.eventEmitter.emit('queryChange', this.query);
    }

    subscribe(listener) {
        return this.eventEmitter.subscribe('queryChange', listener);
    }

    getQuery() {
        return this.query;
    }
}

export default SearchBox;
