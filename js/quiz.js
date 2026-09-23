/**
 * ECOLIFE - Eco Quiz Interactive Engine
 * 10 Questions, Progress Tracking, Instant Explanations & Animated Circular Score
 */

document.addEventListener('DOMContentLoaded', () => {
  initEcoQuiz();
});

function initEcoQuiz() {
  const quizContainer = document.getElementById('quiz-engine-wrapper');
  if (!quizContainer) return;

  let currentQuestionIndex = 0;
  let userScore = 0;
  let hasAnswered = false;
  let questions = [];

  const progressBar = document.getElementById('quiz-progress-bar');
  const progressText = document.getElementById('quiz-progress-text');
  const questionText = document.getElementById('quiz-question-title');
  const optionsContainer = document.getElementById('quiz-options-list');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const explanationText = document.getElementById('quiz-explanation-text');
  const nextBtn = document.getElementById('quiz-next-btn');

  const activeView = document.getElementById('quiz-active-view');
  const resultsView = document.getElementById('quiz-results-view');
  const restartBtn = document.getElementById('quiz-restart-btn');

  const scoreCircleVal = document.getElementById('circle-score-val');
  const circleProgress = document.getElementById('circle-progress-svg');
  const resultTitle = document.getElementById('quiz-result-title');
  const resultMessage = document.getElementById('quiz-result-msg');
  const finalScoreFraction = document.getElementById('quiz-fraction-score');

  function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    hasAnswered = false;
    // Clone and shuffle questions
    questions = [...EcoData.quizQuestions].sort(() => Math.random() - 0.5);

    activeView?.classList.remove('hidden');
    resultsView?.classList.add('hidden');

    loadQuestion();
  }

  function loadQuestion() {
    hasAnswered = false;
    const q = questions[currentQuestionIndex];

    if (progressText) progressText.textContent = `Savol ${currentQuestionIndex + 1} / ${questions.length}`;
    if (progressBar) {
      const pct = ((currentQuestionIndex) / questions.length) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (questionText) questionText.textContent = q.question;
    if (explanationBox) explanationBox.classList.add('hidden');
    if (nextBtn) {
      nextBtn.classList.add('hidden');
      nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Natijalarni ko'rish ➔" : "Keyingi savol ➔";
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button class="quiz-option-btn" data-index="${idx}">
          <span class="quiz-opt-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="quiz-opt-text">${opt}</span>
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleOptionClick(btn));
      });
    }
  }

  function handleOptionClick(btn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const chosenIdx = parseInt(btn.getAttribute('data-index'));
    const q = questions[currentQuestionIndex];
    const allOptionBtns = optionsContainer.querySelectorAll('.quiz-option-btn');

    // Disable all options
    allOptionBtns.forEach(b => b.disabled = true);

    if (chosenIdx === q.correct) {
      userScore++;
      btn.classList.add('correct');
      playTone(720, 0.15);
    } else {
      btn.classList.add('wrong');
      allOptionBtns[q.correct]?.classList.add('correct');
      playTone(260, 0.2);
    }

    // Show explanation
    if (explanationBox && explanationText) {
      explanationText.innerHTML = `<strong>Tushuntirish:</strong> ${q.explanation}`;
      explanationBox.classList.remove('hidden');
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.focus();
    }
  }

  nextBtn?.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  restartBtn?.addEventListener('click', startQuiz);

  function showResults() {
    activeView?.classList.add('hidden');
    resultsView?.classList.remove('hidden');

    const total = questions.length;
    const percentage = Math.round((userScore / total) * 100);

    if (finalScoreFraction) finalScoreFraction.textContent = `${userScore} / ${total} ta to'g'ri javob`;
    if (scoreCircleVal) scoreCircleVal.textContent = `${percentage}%`;

    // SVG Circular progress animation
    // Circle circumference with r=54 is 2 * PI * 54 = 339.29
    if (circleProgress) {
      const circumference = 339.29;
      const offset = circumference - (percentage / 100) * circumference;
      circleProgress.style.strokeDashoffset = offset;
    }

    if (percentage >= 90) {
      resultTitle.textContent = "🏆 Sayyora Qahramoni!";
      resultMessage.textContent = "Siz ekologiya va atrof-muhitni asrash bo'yicha haqiqiy mutaxassissiz! Bilimlaringiz bilan atrofdagilarga ham o'rnak bo'ling.";
      window.triggerConfetti();
    } else if (percentage >= 70) {
      resultTitle.textContent = "🌿 Tabiat Himoyachisi!";
      resultMessage.textContent = "Ajoyib natija! Siz kundalik hayotda tabiatga g'amxo'rlik qilishning eng muhim qoidalarini yaxshi bilasiz.";
      window.triggerConfetti();
    } else if (percentage >= 50) {
      resultTitle.textContent = "🌱 Izlanuvchan Eko-Do'st!";
      resultMessage.textContent = "Yaxshi boshlanish! EcoLife maqolalarini o'qib, o'z bilimingizni yanada mukammallashtirishingiz mumkin.";
    } else {
      resultTitle.textContent = "📚 Eko-O'rganuvchi!";
      resultMessage.textContent = "Ekologik madaniyat har bir o'rganilgan fakt bilan boshlanadi. Viktorinani qaytadan topshirib, bilimlarni mustahkamlang!";
    }
  }

  function playTone(freq, dur) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch(e) {}
  }

  startQuiz();
}
