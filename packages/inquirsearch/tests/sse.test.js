import { SSEClient } from '../src/SSE.js';
import EventEmitter from '../src/EventEmitter.js';

describe('SSEClient', () => {
    let sseClient;
    let fetchMock;

    beforeEach(() => {
        sseClient = new SSEClient();
        fetchMock = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be an instance of EventEmitter', () => {
        expect(sseClient).toBeInstanceOf(EventEmitter);
    });

    it('should fetch data from the server and emit events', async () => {
        const mockResponse = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode('event: testEvent\ndata: {"key":"value"}\n\n'));
                controller.close();
            }
        });

        fetchMock.mockResolvedValue({
            ok: true,
            body: mockResponse
        });

        const eventHandler = jest.fn();
        sseClient.on('testEvent', eventHandler);

        await sseClient.fetchDataSSE('http://example.com/sse');

        expect(eventHandler).toHaveBeenCalledWith({ key: 'value' });
    });

    it('should emit an error event if fetch fails', async () => {
        fetchMock.mockRejectedValue(new Error('Fetch failed'));

        const errorHandler = jest.fn();
        sseClient.on('error', errorHandler);

        await sseClient.fetchDataSSE('http://example.com/sse');

        expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should emit an error event if response is not ok', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 500
        });

        const errorHandler = jest.fn();
        sseClient.on('error', errorHandler);

        await sseClient.fetchDataSSE('http://example.com/sse');

        expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should emit a done event when the stream ends', async () => {
        const mockResponse = new ReadableStream({
            start(controller) {
                controller.close();
            }
        });

        fetchMock.mockResolvedValue({
            ok: true,
            body: mockResponse
        });

        const doneHandler = jest.fn();
        sseClient.on('done', doneHandler);

        await sseClient.fetchDataSSE('http://example.com/sse');

        expect(doneHandler).toHaveBeenCalled();
    });

    it('should handle incomplete lines correctly', async () => {
        const mockResponse = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode('event: testEvent\ndata: {"key":"value"}\n'));
                controller.enqueue(new TextEncoder().encode('event: testEvent2\ndata: {"key2":"value2"}\n\n'));
                controller.close();
            }
        });

        fetchMock.mockResolvedValue({
            ok: true,
            body: mockResponse
        });

        const eventHandler1 = jest.fn();
        const eventHandler2 = jest.fn();
        sseClient.on('testEvent', eventHandler1);
        sseClient.on('testEvent2', eventHandler2);

        await sseClient.fetchDataSSE('http://example.com/sse');

        expect(eventHandler1).toHaveBeenCalledWith({ key: 'value' });
        expect(eventHandler2).toHaveBeenCalledWith({ key2: 'value2' });
    });
});