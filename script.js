const choices = ['rock', 'paper', 'scissors'];

const choiceIcons = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
};

const state = {
  playerScore: 0,
  aiScore: 0,
  ties: 0,
};

let isPlaying = false;

function getAIChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(player, ai) {
  if (player === ai) return 'tie';
  if (
    (player === 'rock' && ai === 'scissors') ||
    (player === 'paper' && ai === 'rock') ||
    (player === 'scissors' && ai === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function updateScores() {
  document.getElementById('player-score').textContent = state.playerScore;
  document.getElementById('ai-score').textContent = state.aiScore;
  document.getElementById('tie-score').textContent = state.ties;
}

function revealChoices(playerChoice, aiChoice, result) {
  const playerIcon = document.getElementById('player-choice-icon');
  const aiIcon = document.getElementById('ai-choice-icon');
  const resultEl = document.getElementById('result');
  const playerBox = document.getElementById('player-choice-box');
  const aiBox = document.getElementById('ai-choice-box');

  playerBox.classList.remove('bouncing');
  aiBox.classList.remove('bouncing');

  playerIcon.textContent = choiceIcons[playerChoice];
  aiIcon.textContent = choiceIcons[aiChoice];

  resultEl.className = 'result';

  if (result === 'win') {
    state.playerScore++;
    resultEl.textContent = 'You Win! 🎉';
    resultEl.classList.add('win');
    playerBox.style.borderColor = '#4ade80';
    aiBox.style.borderColor = 'transparent';
  } else if (result === 'lose') {
    state.aiScore++;
    resultEl.textContent = 'AI Wins! 😤';
    resultEl.classList.add('lose');
    aiBox.style.borderColor = '#f87171';
    playerBox.style.borderColor = 'transparent';
  } else {
    state.ties++;
    resultEl.textContent = "It's a Tie! 🤝";
    resultEl.classList.add('tie');
    playerBox.style.borderColor = '#facc15';
    aiBox.style.borderColor = '#facc15';
  }

  updateScores();

  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = false);
  document.getElementById('reset-btn').disabled = false;
  isPlaying = false;
}

function playRound(playerChoice) {
  if (isPlaying) return;
  isPlaying = true;

  const aiChoice = getAIChoice();
  const playerIcon = document.getElementById('player-choice-icon');
  const aiIcon = document.getElementById('ai-choice-icon');
  const resultEl = document.getElementById('result');
  const playerBox = document.getElementById('player-choice-box');
  const aiBox = document.getElementById('ai-choice-box');

  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
  document.getElementById('reset-btn').disabled = true;

  playerIcon.textContent = '🤜';
  aiIcon.textContent = '🤛';
  playerBox.style.borderColor = 'transparent';
  aiBox.style.borderColor = 'transparent';
  resultEl.className = 'result';
  resultEl.textContent = '';

  playerBox.classList.add('bouncing');
  aiBox.classList.add('bouncing');

  const phrases = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];

  phrases.forEach((phrase, i) => {
    setTimeout(() => {
      resultEl.textContent = phrase;
      if (i === phrases.length - 1) {
        revealChoices(playerChoice, aiChoice, getWinner(playerChoice, aiChoice));
      }
    }, i * 1000);
  });
}

function resetScores() {
  if (isPlaying) return;
  state.playerScore = 0;
  state.aiScore = 0;
  state.ties = 0;

  document.getElementById('player-score').textContent = '0';
  document.getElementById('ai-score').textContent = '0';
  document.getElementById('tie-score').textContent = '0';

  document.getElementById('player-choice-icon').textContent = '🤜';
  document.getElementById('ai-choice-icon').textContent = '🤛';
  document.getElementById('result').textContent = 'Choose your move!';
  document.getElementById('result').className = 'result';
  document.getElementById('player-choice-box').style.borderColor = 'transparent';
  document.getElementById('ai-choice-box').style.borderColor = 'transparent';
  document.getElementById('player-choice-box').classList.remove('bouncing');
  document.getElementById('ai-choice-box').classList.remove('bouncing');
}

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => playRound(btn.dataset.choice));
});

document.getElementById('reset-btn').addEventListener('click', resetScores);
