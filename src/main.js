import {Filter} from './filter';
import {drawStat, unrenderStat, watchedStatistics} from './draw-stat';
import utils from './utils';
import {Movie} from './movie';
import {Popup} from './popup';
import {API} from './api';
import {Provider} from './provider';
import {Store} from './store';

const FilterWithNumberNames = {
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`,
};
const FILTERS = [
  {
    name: `All`,
    hasAmount: false,
  },
  {
    name: FilterWithNumberNames.watchlist,
  },
  {
    name: FilterWithNumberNames.history,
  },
  {
    name: FilterWithNumberNames.favorites,
  },
  {
    name: `Stats`,
    hasAmount: false,
    isAdditional: true,
  }
];
const RankLabels = {
  'Comedy': `ComedyMan`,
  'Thriller': `ThrillerMan`,
  'Drama': `DramaTic`,
  'Sci-Fi': `Sci-Fighter`,
  'Horror': `HorrorAble`,
  'Animation': `Animator`,
  'Family': `FamilyMan`,
  'Action': `ActionEr`,
  'Adventure': `Driver`
};
const AUTHORIZATION = `Basic uhiuy37^%8x4c9o&Y*&T&FH`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const MOVIES_STORE_KEY = `movies-store-key`;
const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION,
});
const store = new Store({key: MOVIES_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});

let initialMovies = [];
let filteredMovies = [];
let rankLabel = ``;
const filtersContainer = document.querySelector(`.main-navigation`);
const moviesContainer = document.querySelector(`.films-list__container`);
const moviesContainerTitle = document.querySelector(`.films-list__title`);
const profileRankElement = document.querySelector(`.profile__rating`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);
const filmBoard = document.querySelector(`.films`);
const statBoard = document.querySelector(`.statistic`);
const textStatistic = document.querySelectorAll(`p.statistic__item-text`);
const rankLabelElement = document.querySelector(`.statistic__rank-label`);

const updateMovie = (movieToUpdate, newMovie) => {
  for (const key of Object.keys(newMovie)) {
    if (key in movieToUpdate) {
      movieToUpdate[key] = newMovie[key];
    }
  }

  return movieToUpdate;
};

const filterMovies = (movies, filterName) => {
  switch (filterName.trim()) {
    case `All`:
      unrenderStat();
      statBoard.classList.add(`visually-hidden`);
      filmBoard.classList.remove(`visually-hidden`);
      filteredMovies = movies;
      return movies;

    case FilterWithNumberNames.watchlist:
      return movies.filter((it) => it.isInWatchlist);

    case FilterWithNumberNames.history:
      return movies.filter((it) => it.isWatched);

    case FilterWithNumberNames.favorites:
      return movies.filter((it) => it.isFavourite);

    case `Most rated`:
      return [...movies].sort((a, b) => b.totalRating - a.totalRating);

    case `Most commented`:
      return [...movies].sort((a, b) => b.comments.length - a.comments.length);

    default:
      return movies;
  }
};

const updateFilters = () => {
  const countElements = document.querySelectorAll(`.main-navigation__item-count`);
  Array.from(countElements).forEach((item, index) => {
    item.textContent = filterMovies(initialMovies, Object.values(FilterWithNumberNames)[index]).length;
  });
};

const renderMovie = (item, container, flag = true) => {
  const movieComponent = new Movie(item, flag);
  const popupComponent = new Popup(item);
  const body = document.querySelector(`body`);
  container.appendChild(movieComponent.render());

  const onCommentFocus = () => {
    popupComponent.element.querySelector(`.film-details__comment-input`).style.border = ``;
    popupComponent.element.querySelector(`.film-details__comment-input`).removeEventListener(`focus`, onCommentFocus);
  };

  movieComponent.onPopup = () => {
    popupComponent.render();
    body.appendChild(popupComponent.element);
  };

  movieComponent.onAddToWatchList = (boolean) => {
    item.isInWatchlist = boolean;
    popupComponent.update(item);
    provider.updateMovie({id: item.id, data: item.toRAW()})
        .then((newMovie) => {
          movieComponent.update(newMovie);
        });
    updateFilters();
    updateMoviesInBottom();
  };

  movieComponent.onMarkAsWatched = (boolean) => {
    item.isWatched = boolean;
    popupComponent.update(item);
    provider.updateMovie({id: item.id, data: item.toRAW()})
        .then((newMovie) => {
          movieComponent.update(newMovie);
        });
    drawStat(initialMovies);
    profileRankElement.innerHTML = RankLabels[watchedStatistics.mostWatchedGenre];
    updateFilters();
    updateMoviesInBottom();
    unrenderStat();
  };

  movieComponent.onMarkAsFavorite = (boolean) => {
    item.isFavourite = boolean;
    popupComponent.update(item);
    provider.updateMovie({id: item.id, data: item.toRAW()})
        .then((newMovie) => {
          movieComponent.update(newMovie);
        });
    updateFilters();
    updateMoviesInBottom();
  };

  popupComponent.onAddComment = (obj) => {
    item.comments.push(obj.comment);
    popupComponent.element.querySelector(`.film-details__comment-input`).disabled = true;

    provider.updateMovie({id: item.id, data: item.toRAW()})
    .then((newMovie) => {
      movieComponent.update(newMovie);
      popupComponent.update(newMovie);
      popupComponent.rerender();
      popupComponent.element.querySelector(`.film-details__comment-input`).disabled = false;
    })
    .catch(() => {
      item.comments.pop();
      popupComponent.element.querySelector(`.film-details__comment-input`).disabled = false;
      popupComponent.element.querySelector(`.film-details__comment-input`).style.border = `3px solid red`;

      shakeElement(popupComponent.element.querySelector(`.film-details__inner`));
      popupComponent.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, onCommentFocus);
    });
  };

  popupComponent.onVote = (obj) => {
    popupComponent.element.querySelector(`.film-details__user-rating-score`).style.backgroundColor = ``;
    const scoreInputs = popupComponent.element.querySelectorAll(`.film-details__user-rating-input`);
    Array.from(scoreInputs).forEach((it) => {
      it.disabled = true;
    });
    item.personalRating = obj.personalRating;

    provider.updateMovie({id: item.id, data: item.toRAW()})
    .then((newMovie) => {
      Array.from(scoreInputs).forEach((it) => {
        it.disabled = false;
      });
      movieComponent.update(newMovie);
      popupComponent.update(newMovie);
      popupComponent.rerender();
    })
    .catch(() => {
      Array.from(scoreInputs).forEach((it) => {
        it.disabled = false;
      });
      popupComponent.element.querySelector(`.film-details__user-rating-score`).style.backgroundColor = `red`;
      shakeElement(popupComponent.element.querySelector(`.film-details__user-rating-score`));
    });
  };

  popupComponent.onClose = (obj) => {
    const updatedMovie = updateMovie(item, obj);

    provider.updateMovie({id: updatedMovie.id, data: updatedMovie.toRAW()})
        .then((newMovie) => {
          movieComponent.update(newMovie);
          moviesContainer.innerHTML = ``;
          if (filteredMovies.length > 0) {
            filteredMovies.forEach((it) => renderMovie(it, moviesContainer));
          } else {
            initialMovies.forEach((it) => renderMovie(it, moviesContainer));
          }
          updateMoviesInBottom();
        });
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
    updateFilters();
  };
};

const shakeElement = (element) => {
  element.animate([
    {transform: `translateX(0)`},
    {transform: `translateX(-10px)`},
    {transform: `translateX(10px)`}
  ], {
    duration: 100,
    iterations: 5,
  });
};

const updateMoviesInBottom = () => {
  mostCommentedContainer.innerHTML = ``;
  topRatedContainer.innerHTML = ``;
  filterMovies(initialMovies, `Most rated`).splice(0, 2).forEach((item) => renderMovie(item, topRatedContainer, false));
  filterMovies(initialMovies, `Most commented`).splice(0, 2).forEach((item) => renderMovie(item, mostCommentedContainer, false));
};

const renderFilters = () => {
  FILTERS.forEach((item) => {
    const filterComponent = new Filter(item);
    filtersContainer.appendChild(filterComponent.render());

    if (filterComponent.template.firstChild.textContent) {
      filtersContainer.querySelector(`.main-navigation__item`).classList.add(`main-navigation__item--active`);
    }

    filterComponent.onFilter = (evt) => {
      const filtersElements = filtersContainer.querySelectorAll(`.main-navigation__item`);
      filtersElements.forEach((it) => it.classList.remove(`main-navigation__item--active`));
      evt.target.classList.add(`main-navigation__item--active`);
      const filterName = evt.target.firstChild.textContent;
      filteredMovies = filterMovies(initialMovies, filterName);

      moviesContainer.innerHTML = ``;
      filteredMovies.forEach((movie) => renderMovie(movie, moviesContainer));
    };
  });
};

const initStatButton = () => {
  const statButtonElement = document.querySelector(`.main-navigation__item--additional`);

  statButtonElement.addEventListener(`click`, onStatClick);
};

const onStatClick = () => {
  unrenderStat();
  drawStat(initialMovies);
  rankLabel = RankLabels[watchedStatistics.mostWatchedGenre];
  profileRankElement.innerHTML = rankLabel;

  statBoard.classList.remove(`visually-hidden`);
  filmBoard.classList.add(`visually-hidden`);

  textStatistic[0].innerHTML = `
  ${watchedStatistics.watchedAmount} <span class="statistic__item-description">movies</span>
  `;

  const [hours, mins] = utils.countDuration(watchedStatistics.watchedDuration);
  textStatistic[1].innerHTML = `
  ${hours} <span class="statistic__item-description">h</span> ${mins} <span class="statistic__item-description">m</span>
  `;
  textStatistic[2].innerHTML = watchedStatistics.mostWatchedGenre;

  rankLabelElement.innerHTML = rankLabel;
};

const showEmptyBoard = () => {
  moviesContainerTitle.textContent = `Loading movies...`;
  moviesContainerTitle.classList.remove(`visually-hidden`);
};

const removeEmptyBoard = () => {
  moviesContainerTitle.classList.add(`visually-hidden`);
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncMovies();
});

showEmptyBoard();
provider.getMovies()
.then((movies) => {
  removeEmptyBoard();
  initialMovies = movies;
  initialMovies.forEach((it) => renderMovie(it, moviesContainer));
})
.catch(() => {
  moviesContainerTitle.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
})
.then(() => {
  updateMoviesInBottom();
  renderFilters();
  updateFilters();
  drawStat(initialMovies);
  profileRankElement.innerHTML = RankLabels[watchedStatistics.mostWatchedGenre];
  initStatButton();
});
