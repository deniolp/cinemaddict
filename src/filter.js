import Component from './component';

export default class Filter extends Component {
  constructor({name, hasAmount = true, isAdditional = false}) {
    super();
    this._name = name;
    this._hasAmount = hasAmount;
    this._isAdditional = isAdditional;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    const filterMarkup = `
    <a href="#" class="main-navigation__item ${this._isAdditional ? `main-navigation__item--additional` : ``}">${this._name} ${this._hasAmount ? `<span class="main-navigation__item-count">${this._amount}</span>` : ``}</a>
      </label>
  `.trim();

    const filterTemplate = document.createElement(`template`);
    filterTemplate.innerHTML = filterMarkup;
    return filterTemplate.content.cloneNode(true);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  _initElements() {
    this._filterElement = this._element.querySelector(`.main-navigation__item`);
  }

  _addListeners() {
    this._initElements();
    if (!this._filterElement.classList.contains(`.main-navigation__item--additional`)) {
      this._filterElement.addEventListener(`click`, this._onFilterClick);
    }
  }

  _removeListeners() {
    if (!this._filterElement.classList.contains(`.main-navigation__item--additional`)) {
      this._filterElement.removeEventListener(`click`, this._onFilterClick);
    }
  }
}
