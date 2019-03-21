import {Component} from './component';

class Filter extends Component {
  constructor(name, hasAmount = true, isActive = false, isAdditional = false) {
    super();
    this._name = name;
    this._hasAmount = hasAmount;
    this._isActive = isActive;
    this._isAdditional = isAdditional;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    const filterMarkup = `
    <a href="#" class="main-navigation__item main-navigation__item--${this._isActive ? `active` : ``}${this._isAdditional ? `additional` : ``}">${this._name} ${this._hasAmount ? `<span class="main-navigation__item-count"></span>` : ``}</a>
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

  _addListeners() {
    this._element.querySelector(`.main-navigation__item`).addEventListener(`click`, this._onFilterClick);
  }
}

export {Filter};
