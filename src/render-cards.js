import {Card} from './card';

export default (item, container, flag = true) => {
  const cardComponent = new Card(item, flag);
  container.appendChild(cardComponent.render());
};
