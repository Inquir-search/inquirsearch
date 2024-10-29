import EventEmitter from './EventEmitter';

class SearchBox extends EventEmitter {
    constructor(searchManager) {
        super();
        this.searchManager = searchManager;
        this.query = '';
    }

    setQuery(query) {
        this.query = query;
        this.searchManager.updateQueryParams({ query });
        this.emit('queryChange', this.query);
    }

    subscribe(listener) {
        return this.on('queryChange', listener);
    }

    getQuery() {
        return this.query;
    }
}

export default SearchBox;
