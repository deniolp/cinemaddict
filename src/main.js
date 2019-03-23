import {Filter} from './filter';
import getMovies from './get-movies';
import renderMovie from './render-movie';
import {drawStat, watchedStatistics} from './draw-stat';
import utils from './utils';

const FILTERS = [
  {
    name: `All`,
    hasAmount: false,
    isActive: true
  },
  {
    name: `Watchlist`
  },
  {
    name: `History`
  },
  {
    name: `Favorites`
  },
  {
    name: `Stats`,
    hasAmount: false,
    isAdditional: true
  }
];

const initialMovies = getMovies(7);

const filtersContainer = document.querySelector(`.main-navigation`);
const moviesContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);

const updateMovie = (movieToUpdate, newMovie) => {
  for (const key of Object.keys(newMovie)) {
    if (key in movieToUpdate && newMovie[key] !== ``) {
      movieToUpdate[key] = newMovie[key];
    }
  }

  return movieToUpdate;
};

const filterMovies = (movies, filterName) => {
  switch (filterName.trim()) {
    case `All`:
      statBoard.classList.add(`visually-hidden`);
      filmBoard.classList.remove(`visually-hidden`);
      return movies;

    case `Watchlist`:
      return movies.filter((it) => it.isInWatchlist);

    case `History`:
      return movies.filter((it) => it.isWatched);

    case `Favorites`:
      return movies.filter((it) => it.isFavourite);

    default:
      return movies;
  }
};

FILTERS.forEach((item) => {
  const filterComponent = new Filter(item.name, item.hasAmount, item.isActive, item.isAdditional);
  filtersContainer.appendChild(filterComponent.render());

  filterComponent.onFilter = (evt) => {
    const filterName = evt.target.textContent;
    const filteredTasks = filterMovies(initialMovies, filterName);

    moviesContainer.innerHTML = ``;
    filteredTasks.forEach((movie) => renderMovie(movie, moviesContainer));
  };
});

initialMovies.forEach((item) => renderMovie(item, moviesContainer));

getMovies(2).forEach((item) => renderMovie(item, topRatedContainer, false));

getMovies(2).forEach((item) => renderMovie(item, mostCommentedContainer, false));

const statButtonElement = document.querySelector(`.main-navigation__item--additional`);
const filmBoard = document.querySelector(`.films`);
const statBoard = document.querySelector(`.statistic`);
const textStatistic = document.querySelectorAll(`p.statistic__item-text`);
const rankLabelElement = document.querySelector(`.statistic__rank-label`);

const getRankLabel = (genre) => {
  switch (genre) {
    case `Comedy`:
      return `ComedyMan`;

    case `History`:
      return `HistoryLover`;

    case `Drama`:
      return `DramaTic`;

    case `Horror`:
      return `HorrorAble`;

    case `Series`:
      return `SeriesLonger`;

    case `Western`:
      return `Gunner`;

    case `Action`:
      return `ActionEr`;

    case `Adventure`:
      return `Driver`;

    default:
      return `Uups`;
  }
};

const onStatClick = () => {
  drawStat(initialMovies);

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

  const rankLabel = getRankLabel(watchedStatistics.mostWatchedGenre);

  rankLabelElement.innerHTML = rankLabel;
};

statButtonElement.addEventListener(`click`, onStatClick);

export {updateMovie};
