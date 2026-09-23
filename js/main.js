/**
 * ECOLIFE - Global Script
 * Themes, Navigation, Search Modal, Toast, Scroll Animations, Back-to-Top, Page Loader
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSearch();
  initScrollEffects();
  initBackToTop();
  initPageLoader();
  initFooterForm();
});

/* --- 1. THEME MANAGER --- */
function initTheme() {
  const savedTheme = localStorage.getItem('ecolife-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? "Tungi rejim yoqildi 🌙" : "Kunduzgi rejim yoqildi ☀️", "info", 2000);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ecolife-theme', theme);

  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');

  if (theme === 'dark') {
    sunIcons.forEach(el => el.style.display = 'block');
    moonIcons.forEach(el => el.style.display = 'none');
  } else {
    sunIcons.forEach(el => el.style.display = 'none');
    moonIcons.forEach(el => el.style.display = 'block');
  }
}

/* --- 2. NAVIGATION & MOBILE DRAWER --- */
function initNavigation() {
  const header = document.querySelector('.navbar-header');
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close-btn');

  // Sticky Navbar shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open drawer
  hamburger?.addEventListener('click', () => {
    drawer?.classList.add('open');
    hamburger?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Close drawer
  const closeDrawer = () => {
    drawer?.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  };

  drawerClose?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- 3. SEARCH MODAL --- */
function initSearch() {
  const modal = document.getElementById('search-modal');
  const openBtns = document.querySelectorAll('.search-open-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  if (!modal || !input || !resultsContainer) return;

  const openSearch = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
    renderSearchResults(input.value.trim());
  };

  const closeSearch = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    input.value = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Hotkey Ctrl+K / Cmd+K and Esc
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSearch();
    }
  });

  // Search input typing
  input.addEventListener('input', () => {
    renderSearchResults(input.value.trim());
  });

  function renderSearchResults(query) {
    if (!EcoData || !EcoData.searchIndex) return;

    const q = query.toLowerCase();
    const filtered = q === '' 
      ? EcoData.searchIndex.slice(0, 6)
      : EcoData.searchIndex.filter(item => 
          item.title.toLowerCase().includes(q) || 
          item.snippet.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <li style="text-align: center; padding: 2rem; color: var(--text-muted);">
          🔍 "${query}" bo'yicha hech narsa topilmadi. Boshqa so'z bilan izlab ko'ring.
        </li>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <li class="search-result-item">
        <a href="${item.url}">
          <div class="search-item-info">
            <h4>${item.title}</h4>
            <p>${item.snippet}</p>
          </div>
          <span class="search-item-badge">${item.category}</span>
        </a>
      </li>
    `).join('');
  }
}

/* --- 4. TOAST NOTIFICATIONS --- */
window.showToast = function(message, type = 'success', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '🌿',
    info: 'ℹ️',
    warning: '⚠️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '🌱'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/* --- 5. SCROLL EFFECTS & REVEALS --- */
function initScrollEffects() {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}

/* --- 6. BACK TO TOP --- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 7. PAGE LOADER --- */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 250);
  });
}

/* --- 8. FOOTER NEWSLETTER MOCK --- */
function initFooterForm() {
  const form = document.getElementById('footer-subscribe-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast("Rahmat! Eko-yangiliklarga muvaffaqiyatli obuna bo'ldingiz 📬", "success");
      input.value = '';
    }
  });
}

/* --- 9. CONFETTI GENERATOR (GLOBAL HELPER) --- */
window.triggerConfetti = function() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#10b981', '#34d399', '#84cc16', '#06b6d4', '#f59e0b', '#ec4899', '#3b82f6'];
  const count = 45;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = Math.random() * 8 + 6 + 'px';
    p.style.height = Math.random() * 10 + 6 + 'px';
    p.style.animationDelay = Math.random() * 0.4 + 's';
    p.style.animationDuration = Math.random() * 1.5 + 2 + 's';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(p);
  }

  setTimeout(() => container.remove(), 4000);
};

/* --- 10. NUMBER COUNTER HELPER --- */
window.animateCounter = function(element, target, duration = 2000, suffix = "") {
  let start = 0;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString('uz-UZ') + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString('uz-UZ') + suffix;
    }
  }, stepTime);
};
