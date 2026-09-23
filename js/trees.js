/**
 * ECOLIFE - Trees Page Interactive Scripts
 * Virtual Tree Planting Engine, Growth Animation, Counter & Forest Visualizer
 */

document.addEventListener('DOMContentLoaded', () => {
  initVirtualTree();
});

function initVirtualTree() {
  const plantBtn = document.getElementById('plant-tree-btn');
  const treeCounterEl = document.getElementById('user-tree-count');
  const treeStageGraphic = document.getElementById('tree-growth-stage');
  const treeStageLabel = document.getElementById('tree-stage-label');
  const forestGrid = document.getElementById('virtual-forest-grid');
  const resetBtn = document.getElementById('reset-trees-btn');

  // Load saved count
  let plantedCount = parseInt(localStorage.getItem('ecolife-planted-trees')) || 0;
  updateCounterDisplay();
  renderForest();

  let isPlanting = false;

  plantBtn?.addEventListener('click', () => {
    if (isPlanting) return;
    isPlanting = true;
    plantBtn.disabled = true;

    // Stage 1: Urug' (Seed)
    treeStageGraphic.innerHTML = `
      <div class="tree-seed-anim">
        <span style="font-size: 3.5rem;">🌰</span>
        <div class="soil-bed"></div>
      </div>
    `;
    treeStageLabel.textContent = "1-bosqich: Urug' tuproqqa qadalmoqda...";
    playTreeTone(300, 0.1);

    // Stage 2: Kichik nihol (Sprout) after 600ms
    setTimeout(() => {
      treeStageGraphic.innerHTML = `
        <div class="tree-sprout-anim tree-grow-anim">
          <span style="font-size: 4.5rem;">🌱</span>
          <div class="soil-bed"></div>
        </div>
      `;
      treeStageLabel.textContent = "2-bosqich: Mayin nihol unib chiqdi!";
      playTreeTone(440, 0.12);
    }, 700);

    // Stage 3: Yosh ko'chat (Sapling) after 1400ms
    setTimeout(() => {
      treeStageGraphic.innerHTML = `
        <div class="tree-sapling-anim tree-grow-anim">
          <span style="font-size: 6rem;">🌿</span>
          <div class="soil-bed"></div>
        </div>
      `;
      treeStageLabel.textContent = "3-bosqich: Ildizlari baquvvat yosh ko'chat!";
      playTreeTone(580, 0.15);
    }, 1500);

    // Stage 4: Ulkan yashil daraxt (Full Tree) after 2300ms
    setTimeout(() => {
      treeStageGraphic.innerHTML = `
        <div class="tree-full-anim tree-grow-anim tree-sway">
          <span style="font-size: 8rem;">🌳</span>
          <div class="soil-bed"></div>
        </div>
      `;
      treeStageLabel.textContent = "4-bosqich: Tabriklaymiz! Yangi yam-yashil daraxt ulg'aydi!";
      playTreeTone(880, 0.35);

      plantedCount++;
      localStorage.setItem('ecolife-planted-trees', plantedCount);
      updateCounterDisplay();
      renderForest();

      window.triggerConfetti();
      showToast(`Tabriklaymiz! Siz yangi virtual daraxt ekdingiz 🌱 (Jami: ${plantedCount})`, "success");

      plantBtn.disabled = false;
      isPlanting = false;
    }, 2400);
  });

  resetBtn?.addEventListener('click', () => {
    if (confirm("Rostdan ham virtual o'rmon hisoblagichini nollashtirmoqchimisiz?")) {
      plantedCount = 0;
      localStorage.setItem('ecolife-planted-trees', 0);
      updateCounterDisplay();
      renderForest();
      showToast("O'rmon hisoblagichi qayta tiklandi.", "info");
    }
  });

  function updateCounterDisplay() {
    if (treeCounterEl) {
      treeCounterEl.textContent = plantedCount;
    }
  }

  function renderForest() {
    if (!forestGrid) return;
    if (plantedCount === 0) {
      forestGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          🌲 Siz hali hech qanday daraxt ekmadingiz. Yuqoridagi tugmani bosing va o'z virtual o'rmoningizni yarating!
        </div>
      `;
      return;
    }

    const treeTypes = ['🌳', '🌲', '🌴', '🌿', '🍏'];
    let html = '';
    const maxRender = Math.min(plantedCount, 36);

    for (let i = 0; i < maxRender; i++) {
      const type = treeTypes[i % treeTypes.length];
      html += `
        <div class="forest-tree-item" title="Daraxt #${i + 1}">
          <span class="forest-tree-emoji">${type}</span>
        </div>
      `;
    }

    if (plantedCount > 36) {
      html += `
        <div class="forest-more-badge">
          +${plantedCount - 36} ta
        </div>
      `;
    }

    forestGrid.innerHTML = html;
  }
}

function playTreeTone(freq, duration) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
