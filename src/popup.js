import Component from './component';
import moment from 'moment';

const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

export default class Popup extends Component {
  constructor({id, title, poster, altTitle, actors, ageRating, description, totalRating,
    releaseDate, releaseCountry, runtime, genre, director, writers, comments, personalRating,
    isInWatchlist, isWatched, isFavourite}) {
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
    this._comments = comments;
    this._personalRating = personalRating;
    this._isInWatchlist = isInWatchlist;
    this._isWatched = isWatched;
    this._isFavourite = isFavourite;

    this._onClose = null;
    this._onAddComment = null;
    this._onVote = null;
    this._onRemoveComment = null;
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onAddCommentKeydown = this._onAddCommentKeydown.bind(this);
    this._onRemoveCommentClick = this._onRemoveCommentClick.bind(this);
    this._onVoteClick = this._onVoteClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }

  _getScore() {
    const arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push(`
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${i === +this._personalRating ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `);
    }
    return arr.join(``);
  }

  _getGenres() {
    return [...this._genre].map((item) => {
      return `
      <span class="film-details__genre">${item}</span>
      `;
    }).join(``);
  }

  _getComment() {
    return this._comments.map((item) => {
      return `
      <li class="film-details__comment">
      <span class="film-details__comment-emoji">${this._emotionMapper(item.emotion)}</span>
      <div>
        <p class="film-details__comment-text">${item.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${item.author}</span>
          <span class="film-details__comment-day">${moment(item.date).fromNow()}</span>
        </p>
      </div>
    </li>
      `;
    }).join(``);
  }

  get template() {
    const popupMarkup = `
    <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${this._poster}" alt="Film ${this._title}">

          <p class="film-details__age">${this._ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">${this._altTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._totalRating}</p>
              <p class="film-details__user-rating">Your rate ${this._personalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this.releaseDate).format(`DD MMMM YYYY`)} (${this._releaseCountry})</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._runtime} min</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${this._getGenres()}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isInWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavourite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>

      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${this._getComment()}
        </ul>

        <div class="film-details__new-comment">
          <div>
            <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
            <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
              <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
              <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
            </div>
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
          </label>
        </div>
      </section>

      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <span class="film-details__watched-status ${this._isWatched ? `film-details__watched-status--active` : ``} ${this._isInWatchlist ? `film-details__watched-status--active` : ``}">${this._isWatched ? `Already watched` : ``} ${this._isInWatchlist ? `Will watch` : ``}</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./${this._poster}" alt="Film ${this._title}" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
            ${this._getScore()}

            </div>
          </section>
        </div>
      </section>
    </form>
  </section>
  `.trim();

    const popupTemplate = document.createElement(`template`);
    popupTemplate.innerHTML = popupMarkup;
    return popupTemplate.content.cloneNode(true).firstChild;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onAddComment(fn) {
    this._onAddComment = fn;
  }

  set onRemoveComment(fn) {
    this._onRemoveComment = fn;
  }

  set onVote(fn) {
    this._onVote = fn;
  }

  _onCloseClick() {
    const newData = this._prepareData();

    this.update(newData);
    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
  }

  _onEscPress(evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      const newData = this._prepareData();

      this.update(newData);
      if (typeof this._onClose === `function`) {
        this._onClose(newData);
      }
    }
  }

  _onAddCommentKeydown(evt) {
    if (evt.keyCode === KEYCODE_ENTER && evt.metaKey || evt.keyCode === KEYCODE_ENTER && evt.ctrlKey) {
      evt.preventDefault();
      const newData = this._prepareData();

      if (typeof this._onAddComment === `function`) {
        this._onAddComment(newData);
      }
      this._userRatingControls.classList.remove(`visually-hidden`);
    }
  }

  _onRemoveCommentClick() {
    if (typeof this._onRemoveComment === `function`) {
      this._onRemoveComment();
    }
  }

  _onVoteClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const newData = this._prepareData();
      this.update(newData);
      if (typeof this._onVote === `function`) {
        this._onVote(newData);
      }
    }
  }

  _prepareData() {
    const formData = new FormData(this._formElement);
    return this._processForm(formData);
  }

  _emotionMapper(key) {
    switch (key) {
      case `sleeping`:
        return `😴`;
      case `neutral-face`:
        return `😐`;
      case `grinning`:
        return `😀`;
      default:
        return ``;
    }
  }

  _processForm(formData) {
    const entry = {
      isInWatchlist: ``,
      isWatched: ``,
      isFavourite: ``,
      comment: {
        author: `Someone`,
        comment: ``,
        date: new Date(),
        emotion: ``,
      },
      personalRating: ``,
    };
    const popupSubmitMapper = Popup.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (popupSubmitMapper[property]) {
        popupSubmitMapper[property](value);
      }
    }
    return entry;
  }

  update(data) {
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavourite = data.isFavourite;
    this._personalRating = data.personalRating;
    if (data.comments) {
      this._comments = data.comments;
    }
  }

  _initElements() {
    const element = this._element;
    this._closeButtonElement = element.querySelector(`.film-details__close-btn`);
    this._commentInputElement = element.querySelector(`.film-details__comment-input`);
    this._commentResetElement = element.querySelector(`.film-details__watched-reset`);
    this._voteAreaElement = element.querySelector(`.film-details__user-rating-score`);
    this._userRatingControls = element.querySelector(`.film-details__user-rating-controls`);
    this._formElement = element.querySelector(`.film-details__inner`);
  }

  _addListeners() {
    this._initElements();
    this._closeButtonElement.addEventListener(`click`, this._onCloseClick);
    this._commentInputElement.addEventListener(`keydown`, this._onAddCommentKeydown);
    this._commentResetElement.addEventListener(`click`, this._onRemoveCommentClick);
    this._voteAreaElement.addEventListener(`click`, this._onVoteClick);
    window.addEventListener(`keydown`, this._onEscPress);
  }

  _removeListeners() {
    this._closeButtonElement.removeEventListener(`click`, this._onCloseClick);
    this._commentInputElement.removeEventListener(`keydown`, this._onAddComment);
    this._commentResetElement.removeEventListener(`click`, this._onRemoveCommentClick);
    this._voteAreaElement.removeEventListener(`click`, this._onVoteClick);
    window.removeEventListener(`keydown`, this._onEscPress);
  }

  unrender() {
    this._removeListeners();
    this._element = null;
  }

  static createMapper(target) {
    return {
      'watched': (value) => {
        if (value === `on`) {
          target.isWatched = true;
          target.dateIsWatched = moment().format(`DD-MM-YYYY`);
        }
        if (value === ``) {
          target.isWatched = false;
        }
      },
      'watchlist': (value) => {
        if (value === `on`) {
          target.isInWatchlist = true;
        }
        if (value === ``) {
          target.isInWatchlist = false;
        }
      },
      'favorite': (value) => {
        if (value === `on`) {
          target.isFavourite = true;
        }
        if (value === ``) {
          target.isFavourite = false;
        }
      },
      'comment': (value) => {
        target.comment.comment = value;
      },
      'comment-emoji': (value) => {
        target.comment.emotion = value;
      },
      'score': (value) => {
        target.personalRating = value;
      }
    };
  }
}
