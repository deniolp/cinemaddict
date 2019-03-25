import {Component} from './component';
import moment from 'moment';

const KEYCODE_ENTER = 13;

class Popup extends Component {
  constructor({title, poster, description, rating, releaseDate, duration,
    genres, comments, score, isInWatchlist, isWatched, isFavourite}) {
    super();
    this._title = title;
    this._poster = poster;
    this._description = description;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genres = genres;
    this._comments = comments;
    this._score = score;
    this._isInWatchlist = isInWatchlist;
    this._isWatched = isWatched;
    this._isFavourite = isFavourite;

    this._onSubmit = null;
    this._onClose = null;
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onAddCommentKeydown = this._onAddCommentKeydown.bind(this);
    this._onVoteClick = this._onVoteClick.bind(this);
  }

  _getScore() {
    const arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push(`
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${i === +this._score ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `);
    }
    return arr.join(``);
  }

  _getComment() {
    return this._comments.map((item) => {
      return `
      <li class="film-details__comment">
      <span class="film-details__comment-emoji">${item.emoji}</span>
      <div>
        <p class="film-details__comment-text">${item.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${item.author}</span>
          <span class="film-details__comment-day">${moment(item.time).fromNow()}</span>
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
          <img class="film-details__poster-img" src="images/posters/${this._poster}.jpg" alt="${this._title}">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">${this._title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
              <p class="film-details__user-rating">Your rate ${this._score}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Brad Bird</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Brad Bird</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this._releaseDate} (USA)</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._duration} min</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${[...this._genres][0]}</span>
                <span class="film-details__genre">${[...this._genres][1]}</span>
                <span class="film-details__genre">${[...this._genres][2]}</span></td>
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
          <span class="film-details__watched-status film-details__watched-status${this._isWatched ? `--active` : ``}">Already watched</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="images/posters/${this._poster}.jpg" alt="${this._title}" class="film-details__user-rating-img">
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

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseClick() {
    const newData = this._prepareData();

    this.update(newData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  _onAddCommentKeydown(evt) {
    if (evt.keyCode === KEYCODE_ENTER && evt.metaKey) {
      evt.preventDefault();
      const newData = this._prepareData();

      this._comments.push({
        author: `Someone`,
        time: new Date(),
        comment: newData.comment.comment,
        emoji: this._emojiMapper(newData.comment.emoji),
      });

      this.update(newData);

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData, this._comments);
      }

      this._rerender();
    }
  }

  _onVoteClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const newData = this._prepareData();
      this.update(newData);

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this._rerender();
    }
  }

  _prepareData() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return this._processForm(formData);
  }

  _emojiMapper(key) {
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
      comment: {},
      score: ``,
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
    this._score = data.score;
  }

  _addListeners() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._onAddCommentKeydown);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onVoteClick);
  }

  _removeListeners() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, this._onAddComment);
    this._element.querySelector(`.film-details__user-rating-score`).removeEventListener(`click`, this._onVoteClick);
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
        target.comment.emoji = value;
      },
      'score': (value) => {
        target.score = value;
      }
    };
  }
}

export {Popup};