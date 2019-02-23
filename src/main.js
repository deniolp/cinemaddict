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

const getFilterElement = (name, hasAmount = true, amount, isActive = false, isAdditional = false) => {
  const filterMarkdown = `
  <a href="#${name.toLowerCase()}" class="main-navigation__item main-navigation__item--${isActive ? `active` : ``}${isAdditional ? `additional` : ``}">${name} ${hasAmount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}</a>
    </label>
`;
  const filterTemplate = document.createElement(`template`);
  filterTemplate.innerHTML = filterMarkdown;
  return filterTemplate.content.cloneNode(true);
};

const getCinemaCard = () => {
  const cardMarkdown = `
  <article class="film-card">
  <h3 class="film-card__title">The Assassination Of Jessie James By The Coward Robert Ford</h3>
  <p class="film-card__rating">9.8</p>
  <p class="film-card__info">
    <span class="film-card__year">2018</span>
    <span class="film-card__duration">1h&nbsp;13m</span>
    <span class="film-card__genre">Comedy</span>
  </p>
  <img src="./images/posters/three-friends.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.</p>
  <button class="film-card__comments">13 comments</button>

  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
  </form>
</article>
  `;

  const cardTemplate = document.createElement(`template`);
  cardTemplate.innerHTML = cardMarkdown;
  return cardTemplate.content.cloneNode(true);
};

const filtersContainer = document.querySelector(`.main-navigation`);
const cinemaCardsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`.films-list--extra:first-child .films-list__container`);
const mostCommentedContainer = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

FILTERS.forEach((item) => filtersContainer.appendChild(getFilterElement(item.name, item.hasAmount, getRandomNumber(), item.isActive, item.isAdditional)));

for (let i = 0; i < 7; i++) {
  cinemaCardsContainer.appendChild(getCinemaCard());
}
