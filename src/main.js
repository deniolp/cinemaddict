import makeFilter from './make-filter';
import utils from './utils';
import getCards from './get-cards';
import {Card} from './card';
import renderCards from './render-cards';

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

getCards(7).forEach((item) => renderCards(item, cinemaCardsContainer));

getCards(2).forEach((item) => {
  const cardComponent = new Card(item, false);
  topRatedContainer.appendChild(cardComponent.render());
});

getCards(2).forEach((item) => {
  const cardComponent = new Card(item, false);
  mostCommentedContainer.appendChild(cardComponent.render());
});

const filters = filtersContainer.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--active):not(.main-navigation__item--additional)`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cinemaCardsContainer.innerHTML = ``;

  getCards(tempAmount).forEach((elem) => {
    const cardComponent = new Card(elem);
    cinemaCardsContainer.appendChild(cardComponent.render());
  });
}));
