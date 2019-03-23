import {Movie} from './movie';
import {Popup} from './popup';
import {updateMovie} from './main';

export default (item, container, flag = true) => {
  const movieComponent = new Movie(item, flag);
  const popupComponent = new Popup(item);
  const body = document.querySelector(`body`);
  container.appendChild(movieComponent.render());

  movieComponent.onPopup = () => {
    popupComponent.render();
    body.appendChild(popupComponent.element);
  };

  movieComponent.onAddToWatchList = (boolean) => {
    item.isInWatchlist = boolean;
    popupComponent.update(item);
  };

  movieComponent.onMarkAsWatched = (boolean) => {
    item.isWatched = boolean;
    popupComponent.update(item);
  };

  movieComponent.onMarkAsFavorite = (boolean) => {
    item.isFavourite = boolean;
    popupComponent.update(item);
  };

  popupComponent.onClose = () => {
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };

  popupComponent.onSubmit = (obj, comments) => {
    const updatedMovie = updateMovie(item, obj);
    if (comments) {
      updatedMovie.comments = comments;
    }
    movieComponent.update(updatedMovie);
    body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };
};
