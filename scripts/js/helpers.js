function camelCaseToHyphen(camelCaseString) {
  return camelCaseString.replace(
    /[A-Z]$/g,
    (match) => `-${match.toLowerCase()}`
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function animate(element, animation) {
  return new Promise((resolve) => {
    const onAnimationEnd = () => {
      element.removeEventListener(element, onAnimationEnd);
      resolve();
    };

    element.addEventListener("animationend", onAnimationEnd);
    element.style.animation = getCSSVar("--" + animation);
  });
}

function getCSSVar(variable) {
  return window
    .getComputedStyle(document.querySelector(":root"))
    .getPropertyValue(variable);
}

export { camelCaseToHyphen, sleep, animate };
