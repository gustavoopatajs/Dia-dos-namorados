// ══════════════════════════════════════
//  ESTRELAS
// ══════════════════════════════════════
const starsEl = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${1.5+Math.random()*3}s;animation-delay:${Math.random()*4}s`;
  starsEl.appendChild(s);
}

// ══════════════════════════════════════
//  PÉTALAS CAINDO
// ══════════════════════════════════════
const petalsEl = document.getElementById('petals');
const petalSymbols = ['🌹','🌸','❤️','🌺','💕'];
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  p.style.cssText = `left:${Math.random()*100}%;--fd:${5+Math.random()*8}s;--delay:${Math.random()*10}s;font-size:${12+Math.random()*14}px`;
  petalsEl.appendChild(p);
}

// ══════════════════════════════════════
//  GALERIA DE FOTOS — 6 fotos fixas
// ══════════════════════════════════════
const TOTAL_SLOTS = 6;
const grid      = document.getElementById('photosGrid');
const fileInput = document.getElementById('fileInput');

// Todas as 6 fotos são fixas
const images = [...FIXED_PHOTOS];

function renderSlots() {
  grid.innerHTML = '';
  for (let i = 0; i < TOTAL_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    if (images[i]) {
      const img = document.createElement('img');
      img.src = images[i];
      slot.appendChild(img);
    }
    grid.appendChild(slot);
  }
}

renderSlots();

// ══════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════
const quizData = [
  {
    q: "Qual foi o primeiro presente que o Gustavo deu para a Samira?",
    opts: ["Um buquê de rosas", "Uma carta escrita à mão", "Um jantar surpresa", "Um ursinho de pelúcia"],
    correct: 0,
    feedback: "Um buquê de flores, para a flor mais linda da minha vida! 💌"
  },
  {
    q: "Qual é a música que os dois consideram 'a música deles'?",
    opts: ["Perfect – Ed Sheeran", "Aliança – Tribalistas", "Dias de Luta, Dias de Glória – Charlie Brown Jr.", "Evidências – Chitãozinho e Xororó"],
    correct: 2,
    feedback: "Essa música toca fundo no coração dos dois! 🎶"
  },
  {
    q: "Onde foi o primeiro encontro de Samira e Gustavo?",
    opts: ["No shopping", "Na praia ao pôr do sol", "Num café aconchegante", "Em um restaurante japonês"],
    correct: 3,
    feedback: "Tudo começou num japonês, enchendo o bucho! 🍣"
  },
  {
    q: "O que o Gustavo faz que a Samira acha mais fofo?",
    opts: ["Mandar bom dia todos dia", "Se declarar do nada e demonstrar todo o amor dele por vc", "Cuidar dela igual a uma princesa", "Canta desafinado para ela"],
    correct: 1,
    feedback: "As declarações mostram o amor dele por você! 🥰"
  },
  {
    q: "Qual é o sonho dos dois juntos?",
    opts: ["Morar na Europa", "Ter um cachorrinho", "Viajar pelo Brasil inteiro", "Construir uma casinha própria"],
    correct: 3,
    feedback: "O lar de vocês, como sempre sonharam! 🏠"
  },
  {
    q: "Como o Gustavo demonstra amor para a Samira no dia a dia?",
    opts: ["Com palavras carinhosas", "Com gestos pequenos e atenção", "Com presentes surpresa", "Com tudo isso junto!"],
    correct: 3,
    feedback: "Amor de verdade é completo assim! 💕"
  }
];

let cur = 0, score = 0, answered = false;

const progressEl = document.getElementById('quizProgress');
const questionEl = document.getElementById('quizQuestion');
const optionsEl  = document.getElementById('quizOptions');
const feedbackEl = document.getElementById('quizFeedback');
const nextBtn    = document.getElementById('quizNext');
const quizBody   = document.getElementById('quizBody');
const quizResult = document.getElementById('quizResult');

function buildProgress() {
  progressEl.innerHTML = '';
  quizData.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'q-dot' + (i < cur ? ' done' : i === cur ? ' active' : '');
    progressEl.appendChild(d);
  });
}

function loadQuestion() {
  answered = false;
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  buildProgress();
  const item = quizData[cur];
  questionEl.textContent = item.q;
  optionsEl.innerHTML = '';
  item.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-opt';
    btn.textContent = opt;
    btn.onclick = () => answer(i, btn);
    optionsEl.appendChild(btn);
  });
}

function answer(idx, btn) {
  if (answered) return;
  answered = true;
  const item = quizData[cur];
  const allBtns = optionsEl.querySelectorAll('.q-opt');
  allBtns.forEach(b => b.disabled = true);
  if (idx === item.correct) {
    btn.classList.add('correct');
    score++;
    feedbackEl.textContent = '✓ ' + item.feedback;
  } else {
    btn.classList.add('wrong');
    allBtns[item.correct].classList.add('correct');
    feedbackEl.textContent = '✗ Quase! ' + item.feedback;
  }
  nextBtn.style.display = 'inline-block';
  nextBtn.textContent = cur < quizData.length - 1 ? 'próxima →' : 'ver resultado 💕';
}

nextBtn.onclick = () => {
  cur++;
  if (cur < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBody.style.display = 'none';
  quizResult.style.display = 'flex';
  buildProgress();
  const pct = score / quizData.length;
  let emoji, msg;
  if (pct === 1)       { emoji = '🏆'; msg = 'Perfeito! Você conhece o Gustavo de cor e salteado. Esse amor é para sempre! 💍'; }
  else if (pct >= 0.7) { emoji = '💖'; msg = 'Quase tudo certo! Vocês dois têm uma história linda e você está atenta a cada detalhe. 🌹'; }
  else if (pct >= 0.4) { emoji = '💞'; msg = 'Ainda temos muito a descobrir um sobre o outro... e essa é a melhor parte! 🥰'; }
  else                 { emoji = '💌'; msg = 'O amor de vocês é maior do que qualquer quiz! Continue escrevendo essa história. 🌷'; }
  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultScore').textContent = score + ' de ' + quizData.length + ' acertos';
  document.getElementById('resultMsg').textContent   = msg;
}

document.getElementById('quizRestart').onclick = () => {
  cur = 0; score = 0;
  quizBody.style.display  = 'block';
  quizResult.style.display = 'none';
  loadQuestion();
};

loadQuestion();
