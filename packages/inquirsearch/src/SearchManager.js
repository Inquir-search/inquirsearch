import EventEmitter from './EventEmitter';
import { BASE_URL } from './constants';

class SearchManager extends EventEmitter {
    constructor({ baseUrl = BASE_URL, apiKey, indexName, debounce = 250, state = {}, cacheTTL = 300000, maxRetries = 3 }) {
        super();
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.debounce = debounce;
        this.cacheTTL = cacheTTL;
        this.maxRetries = maxRetries;
        this.cache = new Map();
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
        this.executeSearch = this.debounceFunction(this.executeSearch.bind(this), this.debounce);
        this.abortController = null;
    }

    debounceFunction(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
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

    async executeSearch() {
        if (this.abortController) {
            this.abortController.abort();
        }
        this.abortController = new AbortController();
        const { signal } = this.abortController;

        this.setState({ loading: true });
        this.notify('loading', true);
        const queryObject = this.buildQueryObject();
        const cacheKey = JSON.stringify(queryObject);
        const cachedResult = this.cache.get(cacheKey);

        if (cachedResult && (Date.now() - cachedResult.timestamp < this.cacheTTL)) {
            this.setState({ results: cachedResult.data, loading: false });
            this.notify('resultsChange', cachedResult.data);
            this.notify('loading', false);
            return;
        }

        const apiUrl = `${this.baseUrl}/api/v1/search/query`;
        let attempts = 0;
        let success = false;

        while (attempts < this.maxRetries && !success) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                    },
                    body: JSON.stringify(queryObject),
                    signal,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API Error: ${errorData.message}`);
                }

                const data = await response.json();
                this.setState({ results: data.result.results || [], loading: false });
                this.notify('resultsChange', data.result.results || []);
                this.notify('loading', false);

                this.cache.set(cacheKey, { data: data.result.results || [], timestamp: Date.now() });
                success = true;
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                    return;
                }
                attempts += 1;
                console.error(`Search attempt ${attempts} failed:`, error);
                if (attempts >= this.maxRetries) {
                    this.setState({ loading: false });
                    this.notify('error', error);
                    this.notify('loading', false);
                } else {
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
                }
            }
        }
    }
}

export default SearchManager;
