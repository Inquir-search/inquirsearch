import EventEmitter from './EventEmitter.js';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

async function retryFetch(url, options, attempt = 1) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    } catch (error) {
        if (attempt >= MAX_RETRIES) {
            throw new Error(`Failed after ${MAX_RETRIES} attempts: ${error.message}`);
        }
        
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return retryFetch(url, options, attempt + 1);
    }
}

/**
 * SSEClient
 * ----------
 * Handles Server-Sent Events with explicit event names.
 * If an event name is provided (`event: eventName`), it will emit that event.
 * Otherwise, it defaults to the "message" event.
 * 
 * Client was create to handle the SSE data from the server and emit events based on the backend's `event:` declarations.
 * Native EventSource does not allow for custom event names, so this client was created to handle that as well as support POST requests and Body.
 */
export class SSEClient extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * fetchDataSSE
     * -------------
     * Fetches SSE data from the server and emits events based on the backend's `event:`
     * declarations. Falls back to 'message' for lines without `event:`.
     * Default method is POST.
     *
     * @param {string} url - The URL to fetch the SSE data from.
     * @param {RequestInit} [options] - The fetch options.
     */
    async fetchDataSSE(url, options = { method: 'POST' }) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await retryFetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const reader = response.body?.getReader();
                if (!reader) {
                    throw new Error('No readable stream in response.');
                }
                const decoder = new TextDecoder('utf-8');
                let buffer = '';
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        this.emit('done');
                        break;
                    }
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split(/\r?\n/);
                    buffer = lines.pop() || '';
                    let currentEvent = 'message';
                    for (const line of lines) {
                        if (line.startsWith('event: ')) {
                            currentEvent = line.slice('event: '.length).trim();
                        } else if (line.startsWith('data: ')) {
                            const dataString = line.slice('data: '.length).trim();
                            try {
                                const data = JSON.parse(dataString);
                                this.emit(currentEvent, data);
                            } catch (err) {
                                if (currentEvent !== 'end') {
                                    this.emit(currentEvent, dataString);
                                    this.emit('error', { error: err, raw: dataString });
                                }
                            }
                        }
                    }
                }
                resolve();
            } catch (error) {
                console.error('SSE fetch failed:', error);
                this.emit('error', error);
                reject(error);
            }
        })
    }
}
