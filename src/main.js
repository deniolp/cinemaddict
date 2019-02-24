import makeFilter from '../src/make-filter';
import makeCard from '../src/make-card';

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

const getRandomNumber = (first = 0, second = 15) => {
  const min = Math.floor(first);
  const max = Math.ceil(second);
  return Math.round(Math.random() * (max - min) + min);
};

const filtersContainer = document.querySelector(`.main-navigation`);
const cinemaCardsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);

FILTERS.forEach((item) => filtersContainer.appendChild(makeFilter(item.name, item.hasAmount, getRandomNumber(), item.isActive, item.isAdditional)));

for (let i = 0; i < 7; i++) {
  cinemaCardsContainer.appendChild(makeCard());
}

for (let i = 0; i < 2; i++) {
  topRatedContainer.appendChild(makeCard(false));
}

for (let i = 0; i < 2; i++) {
  mostCommentedContainer.appendChild(makeCard(false));
}

const filters = filtersContainer.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--active):not(.main-navigation__item--additional)`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cinemaCardsContainer.innerHTML = ``;

  for (let i = 0; i < tempAmount; i++) {
    cinemaCardsContainer.appendChild(makeCard());
  }
}));
