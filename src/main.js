const FILTERS = [
  {
    name: `All`,
    hasAmount: false
  },
  {
    name: `Watchlist`
  },
  {
    name: `History`
  },
  {
    name: `Favorites`
  }
];

const getFilterElement = (name, hasAmount = true, amount) => {
  const spanElement = hasAmount ? `<span class="main-navigation__item-count">${amount}</span>` : ``;
  const filterMarkdown = `
  <a href="#${name.toLowercase()}" class="main-navigation__item">${name} ${spanElement}</a>
    </label>
`;
  const filterTemplate = document.createElement(`template`);
  filterTemplate.innerHTML = filterMarkdown;
  return filterTemplate.content.cloneNode(true);
};
