// SearchResults.js
import EventEmitter from './EventEmitter';

class SearchResults {
    constructor(searchManager) {
        this.searchManager = searchManager;
        this.results = [];
        this.eventEmitter = new EventEmitter();
        this.updateResults = this.updateResults.bind(this);
        this.unsubscribeFromSearchManager = this.searchManager.subscribe('resultsChange', this.updateResults);
    }

    updateResults(results) {
        this.results = results;
        this.eventEmitter.emit('resultsChange', this.results);
    }

    subscribe(listener) {
        return this.eventEmitter.subscribe('resultsChange', listener);
    }

    getResults() {
        return this.results;
    }

    destroy() {
        this.unsubscribeFromSearchManager();
    }
}

export default SearchResults;
