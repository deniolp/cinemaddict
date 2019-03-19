import utils from './utils';

const defaultGenres = [
  `Comedy`,
  `History`,
  `Drama`,
  `Horror`,
  `Series`,
  `Western`,
  `Action`,
  `Adventure`,
];

export default () => {
  const genresCopy = [...defaultGenres];
  const genres = new Set();
  for (let i = 0; i < 3; i++) {
    genres.add(genresCopy.splice(utils.getRandomNumber(0, genresCopy.length - 1), 1)[0]);
  }
  return genres;
};
