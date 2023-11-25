(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },

    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(-100%)`;
      }
    },
  };

  const stepElements = document.querySelectorAll('.step');
  const graphicItems = document.querySelectorAll('.graphic-item');
  let currentGraphicItem = graphicItems[0];

  let observerIndex;
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    observerIndex = Number(entries[0].target.dataset.index);
  });

  for (i = 0; i < stepElements.length; i++) {
    intersectionObserver.observe(stepElements[i]);
    stepElements[i].dataset.index = i;
    graphicItems[i].dataset.index = i;
  }

  const activate = (action) => {
    currentGraphicItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  };
  const inactivate = (action) => {
    currentGraphicItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  };

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (i = observerIndex - 1; i < observerIndex + 2; i++) {
      step = stepElements[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (currentGraphicItem) {
          inactivate(currentGraphicItem.dataset.action);
        }
        currentGraphicItem = graphicItems[i];
        activate(currentGraphicItem.dataset.action);
      }
    }

    window.addEventListener('load', () => {
      setTimeout(() => scrollTo(0, 0), 100);
    });
  });
  activate();
})();
