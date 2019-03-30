import ModelMovie from './model-movie';

const objectToArray = (obj) => {
  return Object.keys(obj).map((id) => obj[id]);
};

const Provider = class {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        movies.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
        return movies;
      });
    } else {
      const rawMovieMap = this._store.getAll();
      const rawMovies = objectToArray(rawMovieMap);
      const movies = ModelMovie.parseMovies(rawMovies);

      return Promise.resolve(movies);
    }
  }

  updateMovie({id, data}) {
    if (this._isOnline()) {
      return this._api.updateMovie({id, data})
      .then((movie) => {
        this._store.setItem({key: movie.id, item: movie.toRAW()});
        return movie;
      });
    } else {
      const movie = data;
      this._needSync = true;
      this._store.setItem({key: movie.id, item: movie});
      return Promise.resolve(ModelMovie.parseMovie(movie));
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
};

export {Provider};
