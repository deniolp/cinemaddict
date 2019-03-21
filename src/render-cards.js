import {Card} from './card';
import {Popup} from './popup';
import {addToWatchList} from './main';

export default (item, container, flag = true) => {
  const cardComponent = new Card(item, flag);
  const popupComponent = new Popup(item);
  const body = document.querySelector(`body`);
  container.appendChild(cardComponent.render());

  cardComponent.onPopup = () => {
    popupComponent.render();
    body.appendChild(popupComponent.element);
  };

  cardComponent.onAddToWatchList = () => {
    addToWatchList(item);
  };

  popupComponent.onClose = () => {
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };

  popupComponent.onSubmit = (obj, comments = ``) => {
    item._isInWatchlist = obj.isInWatchlist;
    item._isWatched = obj.isWatched;
    item._isFavourite = obj.isFavourite;
    item._score = obj.score;
    item._comments = comments;

    cardComponent.update(item);
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };
};
