import utils from './utils';
import {Component} from './component';

class Card extends Component {
  constructor({title, poster, description, rating, releaseDate, duration, genre, comments, score, isInWatchlist, isWatched, isFavourite}, isControls = true) {
    super();
    this._title = title;
    this._poster = poster;
    this._description = description;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genre = genre;
    this._isControls = isControls;
    this._comments = comments;
    this._score = score;
    this._isInWatchlist = isInWatchlist;
    this._isWatched = isWatched;
    this._isFavourite = isFavourite;

    this._onPopup = null;
  }

  get template() {
    const [hours, mins] = utils.countDuration(this._duration);

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
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._releaseDate.match(/\d{4}/)[0]}</span>
      <span class="film-card__duration">${hours}h&nbsp;${mins}m</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="./images/posters/${this._poster}.jpg" alt="${this._title}" class="film-card__poster">
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

  _onClick() {
    return typeof this._onPopup === `function` && this._onPopup();
  }

  addListeners() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClick.bind(this));
  }

  _partialUpdate() {
    this._element.innerHTML = this.template.innerHTML;
  }

  update(data) {
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavourite = data.isFavourite;
    this._score = data.score;
    this._comments = data.comments;

    this.removeListeners();
    this._partialUpdate();
    this.addListeners();
  }
}

export {Card};
