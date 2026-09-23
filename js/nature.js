/**
 * ECOLIFE - Nature Page Interactive Scripts
 * Animated Stat Counters & Ambient Nature Sound Generator (Web Audio API)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNatureCounters();
  initNatureAudio();
  initNatureTabs();
});

/* --- 1. NATURE STAT COUNTERS --- */
function initNatureCounters() {
  const counterElements = document.querySelectorAll('.nature-counter');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        window.animateCounter(el, target, 2200, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* --- 2. AMBIENT NATURE SOUND GENERATOR (Web Audio API) --- */
let audioCtx = null;
let noiseNode = null;
let filterNode = null;
let gainNode = null;
let isPlaying = false;

function initNatureAudio() {
  const toggleBtn = document.getElementById('nature-audio-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientSound();
      toggleBtn.classList.add('playing');
      toggleBtn.innerHTML = `
        <span class="audio-wave-anim">
          <span></span><span></span><span></span>
        </span>
        Ovozni to'xtatish
      `;
      showToast("🌿 O'rmon mayin shabadasining ovozi yoqildi", "info");
    } else {
      stopAmbientSound();
      toggleBtn.classList.remove('playing');
      toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        Tabiat ovozini tinglash
      `;
    }
  });
}

function startAmbientSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Generate pink/brown soothing wind noise
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99 * b0 + white * 0.05;
    b1 = 0.95 * b1 + white * 0.1;
    b2 = 0.85 * b2 + white * 0.25;
    output[i] = (b0 + b1 + b2) * 0.2;
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;

  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(380, audioCtx.currentTime);

  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.5);

  noiseNode.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noiseNode.start();
  isPlaying = true;
}

function stopAmbientSound() {
  if (gainNode && audioCtx) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    setTimeout(() => {
      try {
        noiseNode?.stop();
        noiseNode?.disconnect();
      } catch (e) {}
      isPlaying = false;
    }, 800);
  } else {
    isPlaying = false;
  }
}

/* --- 3. NATURE ECOSYSTEM TABS --- */
function initNatureTabs() {
  const tabBtns = document.querySelectorAll('.nature-tab-btn');
  const tabPanels = document.querySelectorAll('.nature-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}
