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

function updateDisplay(playerChoice, aiChoice, result) {
  const playerIcon = document.getElementById('player-choice-icon');
  const aiIcon = document.getElementById('ai-choice-icon');
  const resultEl = document.getElementById('result');
  const playerBox = document.getElementById('player-choice-box');
  const aiBox = document.getElementById('ai-choice-box');
  const playerScoreEl = document.getElementById('player-score');
  const aiScoreEl = document.getElementById('ai-score');
  const tieScoreEl = document.getElementById('tie-score');

  playerIcon.textContent = choiceIcons[playerChoice];
  aiIcon.textContent = choiceIcons[aiChoice];

  playerBox.style.borderColor = 'transparent';
  aiBox.style.borderColor = 'transparent';
  resultEl.className = 'result';

  if (result === 'win') {
    state.playerScore++;
    resultEl.textContent = 'You Win! 🎉';
    resultEl.classList.add('win');
    playerBox.style.borderColor = '#4ade80';
  } else if (result === 'lose') {
    state.aiScore++;
    resultEl.textContent = 'AI Wins! 😤';
    resultEl.classList.add('lose');
    aiBox.style.borderColor = '#f87171';
  } else {
    state.ties++;
    resultEl.textContent = "It's a Tie! 🤝";
    resultEl.classList.add('tie');
  }

  playerScoreEl.textContent = state.playerScore;
  aiScoreEl.textContent = state.aiScore;
  tieScoreEl.textContent = state.ties;
}

function playRound(playerChoice) {
  const aiChoice = getAIChoice();
  const result = getWinner(playerChoice, aiChoice);
  updateDisplay(playerChoice, aiChoice, result);
}

function resetScores() {
  state.playerScore = 0;
  state.aiScore = 0;
  state.ties = 0;

  document.getElementById('player-score').textContent = '0';
  document.getElementById('ai-score').textContent = '0';
  document.getElementById('tie-score').textContent = '0';

  document.getElementById('player-choice-icon').textContent = '🤚';
  document.getElementById('ai-choice-icon').textContent = '🤖';
  document.getElementById('result').textContent = 'Choose your move!';
  document.getElementById('result').className = 'result';
  document.getElementById('player-choice-box').style.borderColor = 'transparent';
  document.getElementById('ai-choice-box').style.borderColor = 'transparent';
}

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => playRound(btn.dataset.choice));
});

document.getElementById('reset-btn').addEventListener('click', resetScores);
