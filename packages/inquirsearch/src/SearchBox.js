import EventEmitter from './EventEmitter';

class SearchBox extends EventEmitter {
    constructor(searchManager) {
        super();
        this.searchManager = searchManager;
        this.query = '';
    }

    setQuery(query) {
        if (this.query !== query) { // Add condition to prevent infinite loop
            this.query = query;
            this.searchManager.updateQueryParams({ query });
            this.emit('queryChange', this.query);
        }
    }

    subscribe(listener) {
        if (!this.events['queryChange']) {
            this.events['queryChange'] = [];
        }
        this.events['queryChange'].push(listener);
        return () => this.unsubscribe('queryChange', listener);
    }

    getQuery() {
        return this.query;
    }
}

export default SearchBox;
