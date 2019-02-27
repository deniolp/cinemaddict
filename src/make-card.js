import utils from '../src/utils';

export default (card, isControls = true) => {
  const descriptionElement = `
  <p class="film-card__description">${card.description}</p>
  `;
  const formElement = `
  <form class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
</form>
  `;

  const cardMarkdown = `
  <article class="film-card${isControls ? `` : ` film-card--no-controls`}">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">${card.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.year}</span>
      <span class="film-card__duration">${utils.countDuration(card.duration)[0]}h&nbsp;${utils.countDuration(card.duration)[1]}m</span>
      <span class="film-card__genre">${card.genre}</span>
    </p>
    <img src="./images/posters/${card.poster}.jpg" alt="" class="film-card__poster">
    ${isControls ? descriptionElement : ``}
    <button class="film-card__comments">${card.commentsQuantity} comments</button>

    ${isControls ? formElement : ``}
  </article>
  `;

  const cardTemplate = document.createElement(`template`);
  cardTemplate.innerHTML = cardMarkdown;
  return cardTemplate.content.cloneNode(true);
};
