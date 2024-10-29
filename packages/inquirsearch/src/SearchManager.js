import EventEmitter from './EventEmitter';
import { BASE_URL } from './constants';

class SearchManager {
    constructor({ apiKey, indexName, debouce = 50 }) {
        this.apiKey = apiKey;
        this.debouce = debouce;
        this.state = {
            query: '',
            indexName,
            size: 10,
            page: 1,
            facets: [],
            fields: [],
            searchFields: [],
            results: [],
        };
        this.eventEmitter = new EventEmitter();
        this.executeSearch = this.executeSearch.bind(this);
        this.debounceTimeout = null;
    }

    updateQuery(query) {
        this.state = {
            ...this.state,
            query,
        };
        this.notify('queryChange', this.state);
    }

    subscribe(eventName, listener) {
        return this.eventEmitter.subscribe(eventName, listener);
    }

    notify(eventName, data) {
        this.eventEmitter.emit(eventName, data);
    }

    updateQueryParams(params) {
        this.state = {
            ...this.state,
            ...params,
        };
        this.notify('queryParamsChange', this.state);
    }

    buildQueryObject() {
        const {
            indexName,
            query,
            size,
            page,
            facets,
            fields,
            searchFields,
        } = this.state;

        const queryObject = {
            indexName,
            q: query,
            size,
            page,
            facets,
            fields,
            searchFields,
        };

        Object.keys(queryObject).forEach(
            (key) => queryObject[key] == null && delete queryObject[key]
        );

        return queryObject;
    }

    executeSearch() {
        clearTimeout(this.debounceTimeout); // Clear the previous timeout if any

        this.debounceTimeout = setTimeout(() => {
            const queryObject = this.buildQueryObject();
            const apiUrl = BASE_URL + '/api/v1/search/query';
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(queryObject),
            }).then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(`API Error: ${errorData.message}`);
                    });
                }
                return response.json();
            }).then((data) => {
                this.state.results = data.result.results || [];
                this.notify('resultsChange', this.state.results);
            }).catch((error) => {
                console.error('Search error:', error);
                this.notify('error', error);
            });
        }, this.debouce);
    }
}

export default SearchManager;
