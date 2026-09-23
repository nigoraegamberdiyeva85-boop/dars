/**
 * ECOLIFE - Eco Footprint Calculator
 * Assessment across 5 categories, educational estimate label, carbon score & actionable advice
 */

document.addEventListener('DOMContentLoaded', () => {
  initFootprintCalculator();
});

function initFootprintCalculator() {
  const form = document.getElementById('footprint-calc-form');
  if (!form) return;

  const resultContainer = document.getElementById('footprint-results');
  const scoreValEl = document.getElementById('footprint-score-val');
  const scoreProgressBar = document.getElementById('footprint-progress-bar');
  const carbonTonsEl = document.getElementById('footprint-carbon-tons');
  const ratingBadgeEl = document.getElementById('footprint-rating-badge');
  const adviceListEl = document.getElementById('footprint-advice-list');
  const recalculateBtn = document.getElementById('footprint-recalc-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Gather values
    const transport = form.elements['transport'].value;
    const energy = form.elements['energy'].value;
    const water = form.elements['water'].value;
    const plastic = form.elements['plastic'].value;
    const recycling = form.elements['recycling'].value;

    // 2. Score points (0 to 20 per category, total max 100)
    let score = 0;
    const advice = [];

    // Transport
    if (transport === 'car_alone') {
      score += 4;
      advice.push("🚗 Haftada kamida 2 kun jamoat transporti yoki velosipeddan foydalanib, avtomobil chiqindilarini kamaytiring.");
    } else if (transport === 'car_pool') {
      score += 10;
      advice.push("🚌 Hamrohli safarlar yaxshi, lekin piyoda yurish salomatlik va havo tozaligi uchun yanada foydali.");
    } else if (transport === 'public') {
      score += 16;
    } else { // bike or walk
      score += 20;
    }

    // Energy
    if (energy === 'high') {
      score += 4;
      advice.push("💡 Barcha xonalarga LED lampalar o'rnating va konditsioner/isitgichni me'yorida (22-24°C) saqlang.");
    } else if (energy === 'medium') {
      score += 12;
      advice.push("🔌 Kutish rejimida qolgan televizor va quvvatlagichlarni tarmoqdan uzishni odat qiling.");
    } else {
      score += 20;
    }

    // Water
    if (water === 'high') {
      score += 5;
      advice.push("🚰 Dush qabul qilish vaqtini 5 daqiqagacha qisqartiring va tish tozalaganda kranni yopib qo'ying.");
    } else if (water === 'medium') {
      score += 12;
    } else {
      score += 20;
    }

    // Plastic
    if (plastic === 'high') {
      score += 4;
      advice.push("🥤 O'zingiz bilan doimiy mato xarid sumkasi (shopper) va ko'p martalik suv idishini olib yuring.");
    } else if (plastic === 'medium') {
      score += 12;
    } else {
      score += 20;
    }

    // Recycling
    if (recycling === 'none') {
      score += 3;
      advice.push("♻️ Oshxonada hech bo'lmaganda qog'oz va plastik butilkalarni alohida ajratishni bugunoq boshlang.");
    } else if (recycling === 'sometimes') {
      score += 12;
      advice.push("🔋 Ishlatilgan batareyalarni oddiy axlatga tashlamay, maxsus yig'ish punktlariga topshiring.");
    } else {
      score += 20;
    }

    // Carbon estimate in tons/year (Approximate inversely proportional to score)
    // Low score (20) = ~5.8 tons, High score (100) = ~1.2 tons
    const carbonTons = Math.max(1.1, (6.5 - (score / 100) * 5.2)).toFixed(1);

    // Render results
    if (scoreValEl) scoreValEl.textContent = `${score} / 100`;
    if (scoreProgressBar) scoreProgressBar.style.width = `${score}%`;
    if (carbonTonsEl) carbonTonsEl.textContent = `${carbonTons} tonna CO₂ / yil`;

    if (score >= 80) {
      ratingBadgeEl.textContent = "Ajoyib Yashil Natija! 🌿";
      ratingBadgeEl.className = "badge-pill badge-success";
      window.triggerConfetti();
    } else if (score >= 50) {
      ratingBadgeEl.textContent = "O'rtacha Ekologik Ko'rsatkich ⚖️";
      ratingBadgeEl.className = "badge-pill badge-warning";
    } else {
      ratingBadgeEl.textContent = "Katta Eko-Iz — O'zgartirish Kerak! ⚠️";
      ratingBadgeEl.className = "badge-pill badge-danger";
    }

    if (adviceListEl) {
      if (advice.length === 0) {
        adviceListEl.innerHTML = `<li>🌟 Siz allaqachon havas qilarli darajada barqaror eko-odatlarga egasiz! Shu ruhda davom eting!</li>`;
      } else {
        adviceListEl.innerHTML = advice.map(item => `<li>${item}</li>`).join('');
      }
    }

    form.classList.add('hidden');
    resultContainer?.classList.remove('hidden');
    resultContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  recalculateBtn?.addEventListener('click', () => {
    resultContainer?.classList.add('hidden');
    form.classList.remove('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
