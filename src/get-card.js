import utils from './utils';
import moment from 'moment';

export default () => ({
  title: [
    `The Dark Knight`,
    `Inception`,
    `Lost in Translation`,
    `Schindler's List`,
    `Fight Club`,
    `La vita è bella`,
    `Interstellar`,
    `Back to the Future`,
    `The Departed`,
    `Catch Me If You Can`,
    `Shutter Island`,
    `American History X`,
    `The Silence of the Lambs`,
    `Cast Away`,
    `Das Leben der Anderen`,
  ][utils.getRandomNumber(0, 14)],
  poster: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`
  ][utils.getRandomNumber(0, 5)],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `).map((item) => item + `.`).splice(utils.getRandomNumber(0, 10), 3).join(` `),
  rating: (Math.random() * 10).toFixed(1),
  releaseDate: moment(`${utils.getRandomNumber(1, 12)}-${utils.getRandomNumber(1, 28)}-${utils.getRandomNumber(1987, 2018)}`, `MM-DD-YYYY`).format(`DD MMMM YYYY`),
  duration: utils.getRandomNumber(65, 211),
  genre: [
    `Comedy`,
    `History`,
    `Drama`,
    `Horror`,
    `Series`,
    `Western`
  ][utils.getRandomNumber(0, 5)],
  isInWatchlist: false,
  isWatched: false,
  isFavourite: false,
  comments: [
    {
      author: `Tim Macoveev`,
      time: `3 days ago`,
      comment: `So long-long story, boring!`,
      emoji: `😴`,
    },
    {
      author: `Denis Popov`,
      time: `1 days ago`,
      comment: `Pretty good!`,
      emoji: `😀`,
    },
  ],
  score: 5,
});
