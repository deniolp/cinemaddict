const Provider = class {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    return this._api.getMovies()
    .then((movies) => {
      movies.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
      return movies;
    });
  }

  updateMovie({id, data}) {
    return this._api.updateMovie({id, data})
    .then((movie) => {
      this._store.setItem({key: movie.id, item: movie.toRAW()});
      return movie;
    });
  }
};

export {Provider};
