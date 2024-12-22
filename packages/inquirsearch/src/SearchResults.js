import EventEmitter from './EventEmitter';

class SearchResults extends EventEmitter {
    constructor(searchManager) {
        super();
        this.searchManager = searchManager;
        this.results = [];
        this.updateResults = this.updateResults.bind(this);
        this.unsubscribeFromSearchManager = this.searchManager
            .subscribe('resultsChange', this.updateResults);
    }

    subscribe(cb) {
        if (!this.events['resultsChange']) {
            this.events['resultsChange'] = [];
        }
        this.events['resultsChange'].push(cb);
        return () => this.unsubscribe('resultsChange', cb);
    }

    updateResults(results) {
        this.results = results;
        this.emit('resultsChange', this.results);
    }

    getResults() {
        return this.results;
    }

    destroy() {
        if (this.unsubscribeFromSearchManager) {
            this.unsubscribeFromSearchManager();
        }
        this.removeAllListeners('resultsChange');
    }
}

export default SearchResults;
