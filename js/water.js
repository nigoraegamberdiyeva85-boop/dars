/**
 * ECOLIFE - Water Page Interactive Calculator & Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initWaterCalculator();
});

function initWaterCalculator() {
  const form = document.getElementById('water-calc-form');
  if (!form) return;

  const showersInput = document.getElementById('water-showers');
  const durationInput = document.getElementById('water-duration');
  const familyInput = document.getElementById('water-family');
  const tapCheck = document.getElementById('water-tap-habit');

  const durationValDisplay = document.getElementById('water-duration-val');
  const showersValDisplay = document.getElementById('water-showers-val');
  const familyValDisplay = document.getElementById('water-family-val');

  const weeklyResult = document.getElementById('res-water-weekly');
  const monthlyResult = document.getElementById('res-water-monthly');
  const yearlySavings = document.getElementById('res-water-savings');
  const bathtubEquiv = document.getElementById('res-water-bathtubs');
  const waterTankFill = document.getElementById('water-tank-fill');

  function calculateWater() {
    const showersPerWeek = parseInt(showersInput.value) || 5;
    const durationMins = parseInt(durationInput.value) || 10;
    const familyMembers = parseInt(familyInput.value) || 3;
    const leavesTapOpen = tapCheck ? tapCheck.checked : true;

    if (showersValDisplay) showersValDisplay.textContent = `${showersPerWeek} marta`;
    if (durationValDisplay) durationValDisplay.textContent = `${durationMins} daqiqa`;
    if (familyValDisplay) familyValDisplay.textContent = `${familyMembers} kishi`;

    // Calculation formulas:
    // Standard shower uses approx 12 liters/minute
    const showerLitersPerPersonWeekly = showersPerWeek * durationMins * 12;
    const totalShowerWeekly = showerLitersPerPersonWeekly * familyMembers;

    // Tap habit: teeth brushing twice a day. Open tap: 12 L/day. Closed: 1.5 L/day.
    const tapLitersWeekly = (leavesTapOpen ? 12 : 1.5) * 7 * familyMembers;

    const totalWeekly = Math.round(totalShowerWeekly + tapLitersWeekly);
    const totalMonthly = Math.round(totalWeekly * 4.3);
    const totalYearly = Math.round(totalWeekly * 52);

    // Potential savings if shower reduced to 5 mins and tap closed:
    const optimalShowerWeekly = showersPerWeek * 5 * 12 * familyMembers;
    const optimalTapWeekly = 1.5 * 7 * familyMembers;
    const optimalYearly = Math.round((optimalShowerWeekly + optimalTapWeekly) * 52);
    const possibleSavings = Math.max(0, totalYearly - optimalYearly);

    // Update displays
    if (weeklyResult) weeklyResult.textContent = totalWeekly.toLocaleString('uz-UZ') + " litr";
    if (monthlyResult) monthlyResult.textContent = totalMonthly.toLocaleString('uz-UZ') + " litr";
    if (yearlySavings) yearlySavings.textContent = possibleSavings.toLocaleString('uz-UZ') + " litr";
    
    // 1 standard bathtub = approx 150 liters
    const bathtubs = Math.round(totalMonthly / 150);
    if (bathtubEquiv) bathtubEquiv.textContent = `${bathtubs} ta to'liq vanna`;

    // Tank visual level (scaled 0 to 100%, max reference 40,000 L/month)
    if (waterTankFill) {
      const percentage = Math.min(100, Math.max(15, (totalMonthly / 35000) * 100));
      waterTankFill.style.height = `${percentage}%`;
    }
  }

  showersInput?.addEventListener('input', calculateWater);
  durationInput?.addEventListener('input', calculateWater);
  familyInput?.addEventListener('input', calculateWater);
  tapCheck?.addEventListener('change', calculateWater);

  calculateWater();
}
