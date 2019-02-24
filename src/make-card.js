export default (isControls = true) => {
  const descriptionElement = `
  <p class="film-card__description">A priests Romania and confront a malevolent force in the form of a demonic nun.</p>
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
    <h3 class="film-card__title">Incredibles 2</h3>
    <p class="film-card__rating">9.8</p>
    <p class="film-card__info">
      <span class="film-card__year">2018</span>
      <span class="film-card__duration">1h&nbsp;13m</span>
      <span class="film-card__genre">Comedy</span>
    </p>
    <img src="./images/posters/moonrise.jpg" alt="" class="film-card__poster">
    ${isControls ? descriptionElement : ``}
    <button class="film-card__comments">13 comments</button>

    ${isControls ? formElement : ``}
  </article>
  `;

  const cardTemplate = document.createElement(`template`);
  cardTemplate.innerHTML = cardMarkdown;
  return cardTemplate.content.cloneNode(true);
};
