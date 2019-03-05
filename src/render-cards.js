import {Card} from './card';

export default (item, container) => {
  const cardComponent = new Card(item);
  container.appendChild(cardComponent.render());
};
