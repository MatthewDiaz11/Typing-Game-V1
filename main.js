window.addEventListener("load", init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

function init() {
    seconds.innerHTML = currentLevel;
    initHighScore();
    showWord();
    wordInput.addEventListener("input", startMatch);

    setInterval(countdown, 1000);
    setInterval(checkStatus, 50);
};

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord();
        wordInput.value = '';
        score++;
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
        updateHighScore();
    }
}

function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true
    } else {
        message.innerHTML = "";
        return false;
    }
}

function showWord() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then((response) => response.json())
        .then(data => currentWord.innerHTML = data[0]);
};

function countdown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
    seconds.innerHTML = time;
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}

function updateHighScore() {
    const highscore = localStorage.getItem('highscore');

    if (!highscore || score > highscore) {
        localStorage.setItem('highscore', score);
        highscoreDisplay.innerHTML = score;
    }
}

function initHighScore() {
    const highscore = localStorage.getItem('highscore');

    if (highscore) {
        highscoreDisplay.innerHTML = highscore;
    } else {
        highscoreDisplay.innerHTML = 0;
    }
}

function setLevel(level) {

    switch (level) {
        case 'easy':
            currentLevel = levels.easy;
            break;
        case 'medium':
            currentLevel = levels.medium;
            break;
        case 'hard':
            currentLevel = levels.hard;
            break;
        default:
            console.log('Invalid level provided.');
            break;
    }

    seconds.innerHTML = currentLevel;
}

const levelsDropdown = document.getElementById('levels');

levelsDropdown.addEventListener('change', function (event) {
    const selectedOption = event.target.value;
    setLevel(selectedOption);
    time = currentLevel;
});

const optionElements = document.querySelectorAll('.level-option');

optionElements.forEach(option => {
    option.addEventListener('mouseenter', function (event) {
        console.log('Hovering over:', event.target.value);
    });
});