export default {
  getRandomNumber: (first = 0, second = 15) => {
    const min = Math.floor(first);
    const max = Math.ceil(second);
    return Math.round(Math.random() * (max - min) + min);
  },
  countDuration: (duration) => {
    const hour = Math.floor(duration / 60);
    const min = duration - hour * 60;
    const arr = [hour, min];
    return arr;
  },
};