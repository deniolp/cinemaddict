export default (name, hasAmount = true, amount, isActive = false, isAdditional = false) => {
  const filterMarkdown = `
  <a href="#${name.toLowerCase()}" class="main-navigation__item main-navigation__item--${isActive ? `active` : ``}${isAdditional ? `additional` : ``}">${name} ${hasAmount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}</a>
    </label>
`;
  const filterTemplate = document.createElement(`template`);
  filterTemplate.innerHTML = filterMarkdown;
  return filterTemplate.content.cloneNode(true);
};
