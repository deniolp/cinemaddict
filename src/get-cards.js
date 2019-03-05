import getCard from './get-card';

export default (amount) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(getCard());
  }
  return arr;
};
