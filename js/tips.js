/**
 * ECOLIFE - Eco Tips Page Scripts
 * 20 Practical Habits, Filter Tabs, Checkable Habit Tracker & Daily Eco Challenge
 */

document.addEventListener('DOMContentLoaded', () => {
  initEcoTips();
  initDailyChallenge();
});

function initEcoTips() {
  const tipsContainer = document.getElementById('tips-grid');
  const filterBtns = document.querySelectorAll('.tip-filter-btn');
  const completedCountEl = document.getElementById('completed-tips-count');

  if (!tipsContainer) return;

  let currentCategory = 'all';
  let completedTips = JSON.parse(localStorage.getItem('ecolife-completed-tips')) || [];

  function updateCompletedCounter() {
    if (completedCountEl) {
      completedCountEl.textContent = `${completedTips.length} / ${EcoData.tips.length}`;
    }
  }

  function renderTips() {
    if (!EcoData || !EcoData.tips) return;

    const filtered = EcoData.tips.filter(tip => {
      if (currentCategory === 'all') return true;
      return tip.category.toLowerCase() === currentCategory.toLowerCase();
    });

    tipsContainer.innerHTML = filtered.map(tip => {
      const isDone = completedTips.includes(tip.id);
      return `
        <div class="tip-card glass-card reveal revealed ${isDone ? 'tip-completed' : ''}" data-id="${tip.id}">
          <div class="tip-card-top">
            <span class="tip-icon">${tip.icon}</span>
            <span class="badge-pill tip-cat-badge">${tip.category}</span>
          </div>
          <h3 class="tip-title">${tip.id}. ${tip.title}</h3>
          <p class="tip-desc">${tip.desc}</p>
          <div class="tip-card-action">
            <button class="btn btn-sm ${isDone ? 'btn-primary' : 'btn-secondary'} tip-toggle-btn" data-id="${tip.id}">
              ${isDone ? '✓ Bajarganman' : 'Bajardim deb belgilash'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners
    tipsContainer.querySelectorAll('.tip-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        if (completedTips.includes(id)) {
          completedTips = completedTips.filter(t => t !== id);
          showToast("Odat belgilanishi bekor qilindi.", "info", 2000);
        } else {
          completedTips.push(id);
          window.triggerConfetti();
          showToast("Yashil odat saqlandi! Tabiatga hissangiz uchun rahmat 🌿", "success");
        }
        localStorage.setItem('ecolife-completed-tips', JSON.stringify(completedTips));
        updateCompletedCounter();
        renderTips();
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      renderTips();
    });
  });

  updateCompletedCounter();
  renderTips();
}

/* --- DAILY ECO CHALLENGE WIDGET --- */
function initDailyChallenge() {
  const challengeTextEl = document.getElementById('daily-challenge-text');
  const doneBtn = document.getElementById('challenge-done-btn');
  const streakEl = document.getElementById('challenge-streak-count');

  if (!challengeTextEl || !doneBtn) return;

  // Streak counter
  let streak = parseInt(localStorage.getItem('ecolife-challenge-streak')) || 0;
  if (streakEl) streakEl.textContent = streak;

  // Pick random challenge or rotate by date
  const challenges = EcoData.challenges;
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const todaysChallenge = challenges[dayOfYear % challenges.length] || challenges[0];

  challengeTextEl.textContent = `“${todaysChallenge}”`;

  // Check if completed today
  const todayKey = new Date().toISOString().slice(0, 10);
  const lastCompletedDate = localStorage.getItem('ecolife-last-challenge-date');

  if (lastCompletedDate === todayKey) {
    doneBtn.classList.remove('btn-primary');
    doneBtn.classList.add('btn-secondary');
    doneBtn.textContent = 'Bugungi topshiriq bajarilgan ✓';
    doneBtn.disabled = true;
  }

  doneBtn.addEventListener('click', () => {
    streak++;
    localStorage.setItem('ecolife-challenge-streak', streak);
    localStorage.setItem('ecolife-last-challenge-date', todayKey);

    if (streakEl) streakEl.textContent = streak;

    doneBtn.classList.remove('btn-primary');
    doneBtn.classList.add('btn-secondary');
    doneBtn.textContent = 'Bugungi topshiriq bajarilgan ✓';
    doneBtn.disabled = true;

    window.triggerConfetti();
    showToast("Ajoyib! Bugungi eko-topshiriqni bajardingiz! 🎉 Ketma-ket kunlar: " + streak, "success");
  });
}
