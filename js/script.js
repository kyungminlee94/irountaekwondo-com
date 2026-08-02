// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

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

// Popup banner (홈 화면 공지 배너)
const popupOverlay = document.getElementById('popupOverlay');

if (popupOverlay) {
  const hideUntil = localStorage.getItem('hidePopupUntil');
  if (hideUntil && new Date() < new Date(hideUntil)) {
    popupOverlay.style.display = 'none';
  } else {
    document.getElementById('popupClose').addEventListener('click', () => {
      popupOverlay.style.display = 'none';
    });
    document.getElementById('popupHideToday').addEventListener('click', () => {
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      localStorage.setItem('hidePopupUntil', midnight.toISOString());
      popupOverlay.style.display = 'none';
    });
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) popupOverlay.style.display = 'none';
    });
  }
}
