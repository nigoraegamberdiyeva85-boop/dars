/**
 * ECOLIFE - Recycling Page Interactive Scripts
 * Category Details Modal & Interactive Waste Sorting Mini-Game
 */

document.addEventListener('DOMContentLoaded', () => {
  initRecyclingModal();
  initSortingGame();
});

/* --- 1. RECYCLING CATEGORY DETAILS MODAL --- */
function initRecyclingModal() {
  const modal = document.getElementById('recycling-modal');
  const modalTitle = document.getElementById('rec-modal-title');
  const modalIcon = document.getElementById('rec-modal-icon');
  const modalDesc = document.getElementById('rec-modal-desc');
  const modalWhy = document.getElementById('rec-modal-why');
  const modalHow = document.getElementById('rec-modal-how');
  const closeBtn = document.getElementById('rec-modal-close');

  const cards = document.querySelectorAll('.recycling-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.getAttribute('data-category');
      const catData = EcoData.recyclingCategories.find(c => c.id === catId);

      if (catData && modal) {
        modalTitle.textContent = catData.title;
        modalIcon.textContent = catData.icon;
        modalDesc.textContent = catData.description;
        modalWhy.textContent = catData.whyMatters;
        modalHow.textContent = catData.howToDispose;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* --- 2. INTERACTIVE WASTE SORTING MINI-GAME --- */
let gameState = {
  score: 0,
  streak: 0,
  currentIndex: 0,
  shuffledItems: [],
  isProcessing: false
};

function initSortingGame() {
  const startBtn = document.getElementById('game-start-btn');
  const restartBtn = document.getElementById('game-restart-btn');
  const gameArea = document.getElementById('sorting-game-area');
  const binBtns = document.querySelectorAll('.bin-target-btn');

  if (!gameArea) return;

  const resetGame = () => {
    gameState.score = 0;
    gameState.streak = 0;
    gameState.currentIndex = 0;
    gameState.shuffledItems = [...EcoData.sortingGameItems].sort(() => Math.random() - 0.5);
    gameState.isProcessing = false;

    updateScoreDisplay();
    renderCurrentItem();

    document.getElementById('game-results-panel')?.classList.add('hidden');
    document.getElementById('game-active-panel')?.classList.remove('hidden');
  };

  startBtn?.addEventListener('click', resetGame);
  restartBtn?.addEventListener('click', resetGame);

  // Handle Bin Clicks
  binBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameState.isProcessing) return;

      const chosenCategory = btn.getAttribute('data-bin');
      const currentItem = gameState.shuffledItems[gameState.currentIndex];

      if (!currentItem) return;

      gameState.isProcessing = true;

      const feedbackEl = document.getElementById('game-feedback-msg');
      const itemCard = document.getElementById('current-sort-card');

      if (chosenCategory === currentItem.category) {
        // Correct answer!
        gameState.score += 10;
        gameState.streak += 1;
        playGameSound(660, 0.15, 'sine');
        
        itemCard?.classList.add('sort-correct');
        if (feedbackEl) {
          feedbackEl.innerHTML = `<span style="color: #10b981;">✓ To'g'ri! ${currentItem.name} — ${currentItem.categoryName} qutisiga mos keladi!</span>`;
        }
      } else {
        // Incorrect answer
        gameState.streak = 0;
        playGameSound(220, 0.2, 'sawtooth');
        itemCard?.classList.add('sort-wrong');
        if (feedbackEl) {
          feedbackEl.innerHTML = `<span style="color: #ef4444;">✗ Noto'g'ri! ${currentItem.name} — ${currentItem.categoryName} qutisiga tashlanishi kerak edi.</span>`;
        }
      }

      updateScoreDisplay();

      setTimeout(() => {
        itemCard?.classList.remove('sort-correct', 'sort-wrong');
        gameState.currentIndex++;

        if (gameState.currentIndex >= gameState.shuffledItems.length) {
          finishGame();
        } else {
          renderCurrentItem();
          if (feedbackEl) feedbackEl.innerHTML = 'Keyingi chiqindini mos qutiga yo\'naltiring:';
        }
        gameState.isProcessing = false;
      }, 1200);
    });
  });

  resetGame();
}

function renderCurrentItem() {
  const currentItem = gameState.shuffledItems[gameState.currentIndex];
  const itemIcon = document.getElementById('current-item-icon');
  const itemName = document.getElementById('current-item-name');
  const progressText = document.getElementById('game-progress-text');

  if (currentItem) {
    if (itemIcon) itemIcon.textContent = currentItem.icon;
    if (itemName) itemName.textContent = currentItem.name;
    if (progressText) {
      progressText.textContent = `${gameState.currentIndex + 1} / ${gameState.shuffledItems.length}`;
    }
  }
}

function updateScoreDisplay() {
  const scoreEl = document.getElementById('game-score-val');
  const streakEl = document.getElementById('game-streak-val');

  if (scoreEl) scoreEl.textContent = gameState.score;
  if (streakEl) streakEl.textContent = gameState.streak;
}

function finishGame() {
  const activePanel = document.getElementById('game-active-panel');
  const resultsPanel = document.getElementById('game-results-panel');
  const finalScoreEl = document.getElementById('game-final-score');
  const badgeEl = document.getElementById('game-result-badge');

  activePanel?.classList.add('hidden');
  resultsPanel?.classList.remove('hidden');

  if (finalScoreEl) finalScoreEl.textContent = gameState.score;

  if (gameState.score >= 100) {
    if (badgeEl) badgeEl.textContent = "🏆 Master Ekolog! Barcha chiqindilarni a'lo darajada saraladingiz!";
    window.triggerConfetti();
  } else if (gameState.score >= 70) {
    if (badgeEl) badgeEl.textContent = "🌿 Eko-Amaliyotchi! Yaxshi natija, ozgina mashq bilan mukammal bo'lasiz.";
  } else {
    if (badgeEl) badgeEl.textContent = "🌱 Eko-O'rganuvchi! Har bir xato — o'rganish uchun yangi imkoniyat.";
  }
}

// Simple Web Audio Tone Generator for UI feedback
function playGameSound(freq, duration, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
