import EventEmitter from './EventEmitter';
import { BASE_URL } from './constants';

class SearchManager extends EventEmitter {
    constructor({ apiKey, indexName, debounce = 0, state = {} }) {
        super();
        this.apiKey = apiKey;
        this.debounce = debounce;
        this.state = {
            query: '',
            indexName,
            size: 10,
            page: 1,
            facets: [],
            fields: [],
            searchFields: [],
            results: [],
            loading: false,
            unique: true,
            ...state,
        };
        this.executeSearch = this.executeSearch.bind(this);
        this.debounceTimeout = null;
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState,
        };
    }

    updateQuery(query) {
        this.setState({ query });
        this.notify('queryChange', this.state);
        this.executeSearch();
    }

    notify(eventName, data) {
        this.emit(eventName, data);
    }

    updateQueryParams(params) {
        this.setState(params);
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
            unique,
        } = this.state;

        const queryObject = {
            indexName,
            q: query,
            size,
            page,
            facets,
            fields,
            searchFields,
            unique
        };

        Object.keys(queryObject).forEach(
            (key) => queryObject[key] == null && delete queryObject[key]
        );

        return queryObject;
    }

    executeSearch() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            this.setState({ loading: true });
            this.notify('loading', true);
            const queryObject = this.buildQueryObject();
            const apiUrl = `${BASE_URL}/api/v1/search/query`;
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
                this.setState({ results: data.result.results || [], loading: false });
                this.notify('resultsChange', this.state.results);
                this.notify('loading', false); // Notify listeners that loading is complete
            }).catch((error) => {
                console.error('Search error:', error);
                this.setState({ loading: false }); // Set loading to false on error
                this.notify('error', error);
                this.notify('loading', false); // Notify listeners that loading is complete
            });
        }, this.debounce);
    }
}

export default SearchManager;
