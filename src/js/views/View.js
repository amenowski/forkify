import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this View {Object} View instance
   * @author Amen
   * @todo Display number of pages between the pagination buttons
   * @todo Ability to sort search results by duration or number of ingredients
   * @todo Perform ingredient validation in view, before submitting the form
   * @todo Imrove recipe ingredient input: separate in multiple fields and allow more than 6 ingredients;
   * @todo Shopping list feature: button on recipe to add ingredients to a list;
   * @todo Weekly meal planning feature: assign recipes to the next 7 days and show on a weekly calender;
   * @todo Get nutrition data on each ingredient from spooncular API
   *
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
      alert(`HACKED`);
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElemets = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`));

    newElemets.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
