import SearchManager from '../src/SearchManager';

test('SearchManager updates query and notifies subscribers', () => {
    const searchManager = new SearchManager();
    const mockListener = jest.fn();

    searchManager.subscribe(mockListener);
    searchManager.dispatch('UPDATE_QUERY', 'apple');

    expect(searchManager.state.query).toBe('apple');
    expect(mockListener).toHaveBeenCalledWith({
        query: 'apple',
        results: [],
    });
});
