// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Showcase carousel (수업사례) - shows items in groups, sliding left, looping seamlessly
const showcaseViewport = document.querySelector('.showcase-viewport');
const showcaseTrack = document.querySelector('.showcase-track');

if (showcaseViewport && showcaseTrack) {
  const totalItems = showcaseTrack.children.length;
  const uniqueItems = totalItems / 2; // second half duplicates the first for a seamless loop
  let index = 0;
  let timer = null;

  function resetPosition() {
    index = 0;
    showcaseTrack.style.transition = 'none';
    showcaseTrack.style.transform = 'translateX(0)';
    showcaseTrack.offsetHeight; // force reflow so the next slide animates
  }

  function slideNext() {
    const itemWidth = showcaseTrack.children[0].getBoundingClientRect().width;
    index++;
    showcaseTrack.style.transition = 'transform 0.6s ease';
    showcaseTrack.style.transform = `translateX(-${index * itemWidth}px)`;

    if (index === uniqueItems) {
      showcaseTrack.addEventListener('transitionend', resetPosition, { once: true });
    }
  }

  function start() {
    timer = setInterval(slideNext, 2000);
  }
  function stop() {
    clearInterval(timer);
  }

  start();
  showcaseViewport.addEventListener('mouseenter', stop);
  showcaseViewport.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => {
    stop();
    resetPosition();
    start();
  });
}
