import createMovie from './create-movie';

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(createMovie());
  }
  return arr;
};
