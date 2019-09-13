export default (fn, ms = 0) => {
  let timeoutId;
  return function debounce(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
