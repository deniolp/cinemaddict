import utils from './utils';
import {Component} from './component';
import moment from 'moment';

class Movie extends Component {
  constructor({id, title, poster, altTitle, actors, ageRating, description, totalRating, releaseDate, releaseCountry, runtime, genre, director, writers, comments, personalRating, isInWatchlist, isWatched, isFavourite}, isControls = true) {
    super();
    this._id = id;
    this._title = title;
    this._poster = poster;
    this._altTitle = altTitle;
    this._actors = actors;
    this._ageRating = ageRating;
    this._description = description;
    this._totalRating = totalRating;
    this._releaseDate = releaseDate;
    this._releaseCountry = releaseCountry;
    this._runtime = runtime;
    this._genre = genre;
    this._director = director;
    this._writers = writers;
    this._isControls = isControls;
    this._comments = comments;
    this._personalRating = personalRating;
    this._isInWatchlist = isInWatchlist;
    this._isWatched = isWatched;
    this._isFavourite = isFavourite;

    this._onPopup = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onAddToWatchlistClick = this._onAddToWatchlistClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  get template() {
    const [hours, mins] = utils.countDuration(this._runtime);

    const descriptionElement = `
  <p class="film-card__description">${this._description}</p>
  `;
    const formElement = `
  <form class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
</form>
  `;

    const cardMarkup = `
  <article class="film-card${this._isControls ? `` : ` film-card--no-controls`}">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
      <span class="film-card__duration">${hours}h&nbsp;${mins}m</span>
      <span class="film-card__genre">${[...this._genre].length ? [...this._genre][0] : ``}</span>
    </p>
    <img src="/${this._poster}" alt="Film ${this._title}" class="film-card__poster">
    ${this._isControls ? descriptionElement : ``}
    <button class="film-card__comments">${this._comments.length} comments</button>

    ${this._isControls ? formElement : ``}
  </article>
  `.trim();

    const cardTemplate = document.createElement(`template`);
    cardTemplate.innerHTML = cardMarkup;
    return cardTemplate.content.cloneNode(true).firstChild;
  }

  set onPopup(fn) {
    this._onPopup = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  _onCommentsClick() {
    return typeof this._onPopup === `function` && this._onPopup();
  }

  _onAddToWatchlistClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._isInWatchlist = !this._isInWatchlist;
      this._onAddToWatchList(this._isInWatchlist);
    }
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._isWatched = !this._isWatched;
      this._onMarkAsWatched(this._isWatched);
    }
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsFavorite === `function`) {
      this._isFavourite = !this._isFavourite;
      this._onMarkAsFavorite(this._isFavourite);
    }
  }

  _addListeners() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsClick);
    if (this._element.querySelector(`.film-card__controls`)) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onMarkAsFavoriteClick);
    }
  }

  _removeListeners() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsClick);
    if (this._element.querySelector(`.film-card__controls`)) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onMarkAsFavoriteClick);
    }
  }

  update(data) {
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavourite = data.isFavourite;
    this._personalRating = data.personalRating;
    this._comments = data.comments;

    this._rerender();
  }
}

export {Movie};
