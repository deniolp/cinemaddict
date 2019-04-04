import ModelMovie from './model-movie';

const objectToArray = (obj) => {
  return Object.keys(obj).map((id) => obj[id]);
};

export default class {
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
    }
    const rawMovieMap = this._store.getAll();
    const rawMovies = objectToArray(rawMovieMap);
    const movies = ModelMovie.parseMovies(rawMovies);

    return Promise.resolve(movies);
  }

  updateMovie({id, data}) {
    if (this._isOnline()) {
      return this._api.updateMovie({id, data})
      .then((movie) => {
        this._store.setItem({key: movie.id, item: movie.toRAW()});
        return movie;
      });
    }
    const movie = data;
    this._needSync = true;
    this._store.setItem({key: movie.id, item: movie});
    return Promise.resolve(ModelMovie.parseMovie(movie));
  }

  syncMovies() {
    return this._api.syncMovies({movies: objectToArray(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
