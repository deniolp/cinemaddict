class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = this.template;
    this.addListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }

  addListeners() {}
  removeListeners() {}
}

export {Component};
