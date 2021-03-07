class SearchView {
    _parentElement = document.querySelector('.search');
    _searchField = document.querySelector('.search__field');

    getQuery() {
        const query = this._searchField.value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._searchField.value = '';
    }
    
    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();