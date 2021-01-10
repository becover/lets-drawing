export default function debounce(func, delay) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;
    timerId && clearTimeout(timerId);
    timerId = setTimeout(
      () => typeof func === 'function' && func.apply(context, args),
      delay,
    );
  };
}
