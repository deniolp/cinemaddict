export default class ModelMovie {
  constructor(data) {
    console.log(data);
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.poster = data[`film_info`][`poster`];
    this.altTitle = data[`film_info`][`alternative_title`];
    this.actors = data[`film_info`][`actors`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.description = data[`film_info`][`description`];
    this.description = data[`film_info`][`description`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.releaseCountry = data[`film_info`][`release`][`release_country`];
    this.runtime = data[`film_info`][`runtime`];
    this.genre = new Set(data[`film_info`][`genre`] || []);
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`] || [];
    this.totalRating = data[`film_info`][`total_rating`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavourite = data[`user_details`][`favorite`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.comments = data[`comments`] || [];
    console.log(this.comments);
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }
}
