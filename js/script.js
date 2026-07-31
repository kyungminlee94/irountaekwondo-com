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

// Review pagination (후기) - 20 per page, newest-first order comes from markup order
const reviewList = document.querySelector('.review-list');

if (reviewList) {
  const perPage = 20;
  const cards = Array.from(reviewList.children);
  const totalPages = Math.ceil(cards.length / perPage);

  if (totalPages > 1) {
    const pagination = document.createElement('div');
    pagination.className = 'review-pagination';
    reviewList.insertAdjacentElement('afterend', pagination);

    function showPage(page) {
      cards.forEach((card, i) => {
        card.style.display = (i >= (page - 1) * perPage && i < page * perPage) ? '' : 'none';
      });
      pagination.querySelectorAll('button').forEach((btn, i) => {
        btn.classList.toggle('active', i === page - 1);
      });
      reviewList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement('button');
      btn.textContent = p;
      btn.addEventListener('click', () => showPage(p));
      pagination.appendChild(btn);
    }

    showPage(1);
  }
}
