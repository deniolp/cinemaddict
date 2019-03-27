export default {
  countDuration: (duration) => {
    const hour = Math.floor(duration / 60);
    const min = duration - hour * 60;
    const arr = [hour, min];
    return arr;
  },
};
