import {Filter} from './filter';
import getCards from './get-cards';
import renderCards from './render-cards';
import {drawStat} from './draw-stat';

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

const initialCards = getCards(7);

const filtersContainer = document.querySelector(`.main-navigation`);
const cinemaCardsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);

const updateCard = (cardToUpdate, newCard) => {
  const index = initialCards.findIndex((item) => item === cardToUpdate);

  for (const key of Object.keys(newCard)) {
    if (key in initialCards[index] && newCard[key] !== ``) {
      initialCards[index][key] = newCard[key];
    }
  }

  return initialCards[index];
};

const filterCards = (cards, filterName) => {
  switch (filterName.trim()) {
    case `All`:
      return cards;

    case `Watchlist`:
      return cards.filter((it) => it.isInWatchlist);

    case `History`:
      return cards.filter((it) => it.isWatched);

    case `Favorites`:
      return cards.filter((it) => it.isFavourite);

    default:
      return cards;
  }
};

FILTERS.forEach((item) => {
  const filterComponent = new Filter(item.name, item.hasAmount, item.isActive, item.isAdditional);
  filtersContainer.appendChild(filterComponent.render());

  filterComponent.onFilter = (evt) => {
    const filterName = evt.target.textContent;
    const filteredTasks = filterCards(initialCards, filterName);

    cinemaCardsContainer.innerHTML = ``;
    filteredTasks.forEach((card) => renderCards(card, cinemaCardsContainer));
  };
});

initialCards.forEach((item) => renderCards(item, cinemaCardsContainer));

getCards(2).forEach((item) => renderCards(item, topRatedContainer, false));

getCards(2).forEach((item) => renderCards(item, mostCommentedContainer, false));

const statButtonElement = document.querySelector(`.main-navigation__item--additional`);
const filmBoard = document.querySelector(`.films`);
const statBoard = document.querySelector(`.statistic`);

const onStatClick = () => {
  drawStat(initialCards);

  statBoard.classList.remove(`visually-hidden`);
  filmBoard.classList.add(`visually-hidden`);
};

statButtonElement.addEventListener(`click`, onStatClick);

export {updateCard};
