/**
 * ECOLIFE - Energy Page Interactive Calculator & SVG Breakdown Chart
 */

document.addEventListener('DOMContentLoaded', () => {
  initEnergyCalculator();
});

function initEnergyCalculator() {
  const bulbHoursInput = document.getElementById('energy-bulb-hours');
  const bulbTypeSelect = document.getElementById('energy-bulb-type');
  const acHoursInput = document.getElementById('energy-ac-hours');
  const standbyInput = document.getElementById('energy-standby-devices');
  const roomsInput = document.getElementById('energy-rooms');

  const bulbHoursDisplay = document.getElementById('energy-bulb-hours-val');
  const acHoursDisplay = document.getElementById('energy-ac-hours-val');
  const standbyDisplay = document.getElementById('energy-standby-val');
  const roomsDisplay = document.getElementById('energy-rooms-val');

  const monthlyKwhEl = document.getElementById('res-energy-kwh');
  const monthlyCostEl = document.getElementById('res-energy-cost');
  const monthlyCo2El = document.getElementById('res-energy-co2');
  const potentialSavingsEl = document.getElementById('res-energy-savings');

  // SVG Chart Bars
  const barLighting = document.getElementById('chart-bar-lighting');
  const barClimate = document.getElementById('chart-bar-climate');
  const barStandby = document.getElementById('chart-bar-standby');
  const pctLighting = document.getElementById('chart-pct-lighting');
  const pctClimate = document.getElementById('chart-pct-climate');
  const pctStandby = document.getElementById('chart-pct-standby');

  function calculateEnergy() {
    const bulbHours = parseFloat(bulbHoursInput.value) || 5;
    const bulbType = bulbTypeSelect ? bulbTypeSelect.value : 'incandescent';
    const acHours = parseFloat(acHoursInput.value) || 3;
    const standbyCount = parseInt(standbyInput.value) || 4;
    const rooms = parseInt(roomsInput.value) || 3;

    if (bulbHoursDisplay) bulbHoursDisplay.textContent = `${bulbHours} soat/kun`;
    if (acHoursDisplay) acHoursDisplay.textContent = `${acHours} soat/kun`;
    if (standbyDisplay) standbyDisplay.textContent = `${standbyCount} ta qurilma`;
    if (roomsDisplay) roomsDisplay.textContent = `${rooms} xona`;

    // 1. Lighting kWh/month
    // Average 2 bulbs per room. Incandescent: 60W (0.06 kW). LED: 9W (0.009 kW).
    const wattsPerBulb = bulbType === 'led' ? 0.009 : 0.06;
    const totalBulbs = rooms * 2;
    const lightingMonthlyKwh = Math.round(totalBulbs * wattsPerBulb * bulbHours * 30);

    // 2. Climate (AC/Heater) kWh/month
    // Standard AC consumes approx 1.2 kW per hour
    const climateMonthlyKwh = Math.round(acHours * 1.2 * 30);

    // 3. Standby phantom draw kWh/month
    // Average 6W per plugged-in idle device 24/7
    const standbyMonthlyKwh = Math.round(standbyCount * 0.006 * 24 * 30);

    // 4. Base electronics & fridge: approx 80 kWh/month
    const baseMonthlyKwh = 80;

    const totalMonthlyKwh = lightingMonthlyKwh + climateMonthlyKwh + standbyMonthlyKwh + baseMonthlyKwh;

    // Tariff: approx 600 UZS / kWh average
    const totalCostUzs = totalMonthlyKwh * 650;

    // Grid carbon intensity: approx 0.52 kg CO2 per kWh
    const totalCo2Kg = Math.round(totalMonthlyKwh * 0.52);

    // Potential savings (LED transition + turning off standby + 1h less AC)
    const optimizedLighting = Math.round(totalBulbs * 0.009 * Math.max(1, bulbHours - 1) * 30);
    const optimizedClimate = Math.round(Math.max(0, acHours - 1) * 1.2 * 30);
    const optimizedStandby = 2; // nearly zero
    const optimizedTotal = optimizedLighting + optimizedClimate + optimizedStandby + baseMonthlyKwh;
    const savedKwh = Math.max(0, totalMonthlyKwh - optimizedTotal);
    const savedCostUzs = savedKwh * 650;

    // Display numbers
    if (monthlyKwhEl) monthlyKwhEl.textContent = `${totalMonthlyKwh} kVt·soat`;
    if (monthlyCostEl) monthlyCostEl.textContent = `${totalCostUzs.toLocaleString('uz-UZ')} so'm`;
    if (monthlyCo2El) monthlyCo2El.textContent = `${totalCo2Kg} kg CO₂`;
    if (potentialSavingsEl) potentialSavingsEl.textContent = `${savedCostUzs.toLocaleString('uz-UZ')} so'm (${savedKwh} kVt·soat)`;

    // Update animated chart percentages
    const lightPct = Math.round((lightingMonthlyKwh / totalMonthlyKwh) * 100) || 10;
    const climatePct = Math.round((climateMonthlyKwh / totalMonthlyKwh) * 100) || 50;
    const standbyPct = Math.round((standbyMonthlyKwh / totalMonthlyKwh) * 100) || 10;

    if (barLighting) barLighting.style.width = `${lightPct}%`;
    if (barClimate) barClimate.style.width = `${climatePct}%`;
    if (barStandby) barStandby.style.width = `${standbyPct}%`;

    if (pctLighting) pctLighting.textContent = `${lightPct}%`;
    if (pctClimate) pctClimate.textContent = `${climatePct}%`;
    if (pctStandby) pctStandby.textContent = `${standbyPct}%`;
  }

  bulbHoursInput?.addEventListener('input', calculateEnergy);
  bulbTypeSelect?.addEventListener('change', calculateEnergy);
  acHoursInput?.addEventListener('input', calculateEnergy);
  standbyInput?.addEventListener('input', calculateEnergy);
  roomsInput?.addEventListener('input', calculateEnergy);

  calculateEnergy();
}
