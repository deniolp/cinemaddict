export default {
  getRandomNumber: (first = 0, second = 15) => {
    const min = Math.floor(first.toFixed());
    const max = Math.ceil(second.toFixed());
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  countDuration: (duration) => {
    const hour = Math.floor(duration / 60);
    const min = duration - hour * 60;
    const arr = [hour, min];
    return arr;
  },
};
