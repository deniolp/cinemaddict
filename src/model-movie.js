export default class ModelMovie {
  constructor(data) {
    console.log(data);
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }
}
