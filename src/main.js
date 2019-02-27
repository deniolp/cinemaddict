import makeFilter from '../src/make-filter';
import makeCard from '../src/make-card';
import utils from '../src/utils';
import getCards from '../src/get-cards';

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

const filtersContainer = document.querySelector(`.main-navigation`);
const cinemaCardsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, item.hasAmount, utils.getRandomNumber(), item.isActive, item.isAdditional)));

getCards(7).forEach((item) => cinemaCardsContainer.appendChild(makeCard(item)));

getCards(2).forEach((item) => topRatedContainer.appendChild(makeCard(item, false)));

getCards(2).forEach((item) => mostCommentedContainer.appendChild(makeCard(item, false)));

const filters = filtersContainer.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--active):not(.main-navigation__item--additional)`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cinemaCardsContainer.innerHTML = ``;

  getCards(tempAmount).forEach((elem) => cinemaCardsContainer.appendChild(makeCard(elem)));
}));
