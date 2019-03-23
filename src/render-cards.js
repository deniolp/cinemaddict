import {Card} from './card';
import {Popup} from './popup';
import {updateCard} from './main';

export default (item, container, flag = true) => {
  const cardComponent = new Card(item, flag);
  const popupComponent = new Popup(item);
  const body = document.querySelector(`body`);
  container.appendChild(cardComponent.render());

  cardComponent.onPopup = () => {
    popupComponent.render();
    body.appendChild(popupComponent.element);
  };

  cardComponent.onAddToWatchList = (boolean) => {
    item.isInWatchlist = boolean;
    popupComponent.update(item);
  };

  cardComponent.onMarkAsWatched = (boolean) => {
    item.isWatched = boolean;
    popupComponent.update(item);
  };

  cardComponent.onMarkAsFavorite = (boolean) => {
    item.isFavourite = boolean;
    popupComponent.update(item);
  };

  popupComponent.onClose = () => {
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };

  popupComponent.onSubmit = (obj, comments) => {
    const updatedCard = updateCard(item, obj);
    if (comments) {
      updatedCard.comments = comments;
    }
    cardComponent.update(updatedCard);
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };
};
