const Provider = class {
  constructor({api, store}) {
    this._api = api;
  }

  getMovies() {
    return this._api.getMovies();
  }

  updateMovie({id, data}) {
    return this._api.updateMovie({id, data});
  }
};

export {Provider};
