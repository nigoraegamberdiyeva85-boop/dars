/**
 * ECOLIFE - Animals Page Interactive Scripts
 * Search, Category Filtering & Animal Details Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnimalsCatalog();
});

function initAnimalsCatalog() {
  const container = document.getElementById('animals-grid');
  const searchInput = document.getElementById('animal-search-input');
  const filterBtns = document.querySelectorAll('.animal-filter-btn');

  const modal = document.getElementById('animal-modal');
  const modalName = document.getElementById('animal-modal-name');
  const modalLatin = document.getElementById('animal-modal-latin');
  const modalIcon = document.getElementById('animal-modal-icon');
  const modalStatus = document.getElementById('animal-modal-status');
  const modalHabitat = document.getElementById('animal-modal-habitat');
  const modalDesc = document.getElementById('animal-modal-desc');
  const modalFact = document.getElementById('animal-modal-fact');
  const modalTip = document.getElementById('animal-modal-tip');
  const modalClose = document.getElementById('animal-modal-close');

  if (!container) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderAnimals() {
    if (!EcoData || !EcoData.animals) return;

    const filtered = EcoData.animals.filter(item => {
      const matchesCategory = 
        currentCategory === 'all' || 
        (currentCategory === 'endangered' ? item.status.includes('Xavf') || item.status.includes('Kritik') : item.category === currentCategory);

      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery) ||
        item.scientificName.toLowerCase().includes(searchQuery) ||
        item.habitat.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🐾</div>
          <h3>Hech qanday jonivor topilmadi</h3>
          <p>Izlash so'zini o'zgartirib ko'ring yoki boshqa toifani tanlang.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(animal => `
      <div class="animal-card glass-card reveal revealed" data-id="${animal.id}">
        <div class="animal-card-header">
          <div class="animal-icon-wrapper">${animal.icon}</div>
          <span class="animal-status-tag ${animal.statusClass}">${animal.status}</span>
        </div>
        <div class="animal-card-body">
          <h3 class="animal-title">${animal.name}</h3>
          <p class="animal-latin">${animal.scientificName}</p>
          <p class="animal-snippet">${animal.description.substring(0, 100)}...</p>
          
          <div class="animal-meta-box">
            <div class="meta-item">
              <span class="meta-label">🌍 Yashash joyi:</span>
              <span class="meta-val">${animal.habitat}</span>
            </div>
          </div>
        </div>
        <div class="animal-card-footer">
          <button class="btn btn-secondary btn-sm open-animal-btn" data-id="${animal.id}">
            Batafsil ma'lumot ➔
          </button>
        </div>
      </div>
    `).join('');

    // Attach click events
    container.querySelectorAll('.animal-card, .open-animal-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id') || el.closest('.animal-card')?.getAttribute('data-id');
        openAnimalModal(id);
      });
    });
  }

  function openAnimalModal(id) {
    const animal = EcoData.animals.find(a => a.id === id);
    if (!animal || !modal) return;

    if (modalName) modalName.textContent = animal.name;
    if (modalLatin) modalLatin.textContent = animal.scientificName;
    if (modalIcon) modalIcon.textContent = animal.icon;
    if (modalStatus) {
      modalStatus.textContent = animal.status;
      modalStatus.className = `badge-pill ${animal.statusClass}`;
    }
    if (modalHabitat) modalHabitat.textContent = animal.habitat;
    if (modalDesc) modalDesc.textContent = animal.description;
    if (modalFact) modalFact.textContent = animal.fact;
    if (modalTip) modalTip.textContent = animal.conservationTip;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderAnimals();
    });
  });

  // Search Input
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderAnimals();
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    setTimeout(() => {
      openAnimalModal(hash);
    }, 400);
  }

  renderAnimals();
}
