import icons from 'url:../../img/icons.svg';


export default class View {
    _data;
    
    render(data) {
        if(data.length === 0) return this.renderError();
        
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    update(data) {
      // if(data.length === 0) return this.renderError();
        
      this._data = data;
      const newMarkup = this._generateMarkup();

      // These methods create dom node objects out of a string
      const newDOM = document.createRange().createContextualFragment(newMarkup);

      // This will create an array of all the nodes in the current and new DOM
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      // Loop over each node element in the current DOM array and compare it with the new
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(newEl.firstChild.nodeValue);

        // If the new element and current element are not the same & the new element has content (isnt just html without values) then change the node
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
          curEl.textContent = newEl.textContent;
        }

        // Update changed attributes
        if(!newEl.isEqualNode(curEl)) {
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
        }

      });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    };

    renderSpinner() {
        const spinnerHTML = `<div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
            </div> `
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', spinnerHTML);
    };

    renderError(message = this._errorMessage) {
        const markup = ` 
              <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderMessage(message = this._successMessage) {
        const markup = ` 
              <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      };
}