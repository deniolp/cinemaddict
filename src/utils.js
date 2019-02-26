export default {
  getRandomNumber: (first = 0, second = 15) => {
    const min = Math.floor(first);
    const max = Math.ceil(second);
    return Math.round(Math.random() * (max - min) + min);
  },
};
