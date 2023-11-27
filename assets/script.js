// global Variables
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;
const start = document.querySelector("#start");
const quizIntro = document.querySelector(".quiz-start");
var questionsEl = document.querySelector(".all-question");
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#results");
let questionCount = 0;
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];
const ansBtn = document.querySelectorAll(".answer-btn");
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clear-scores");
let viewScrBtn = document.querySelector(".view-scores");
let hideScoresBtn = document.querySelector("#back");
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");

// question and answer arrays
const questions = [
    { 
        question: "Commonly used data types DO NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"], 
        correctAnswer: "2" 
    },
    { 
        question: "Arrays in JavaScript can be used to store ____.", 
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all the above"], 
        correctAnswer: "3" 
    },
    { 
        question: "The condition in an if / else statement is enclosed within ____. ", 
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"], 
        correctAnswer: "1" 
    },
    { 
        question: "String values must be enclosed within _____ when being assigned to values.", 
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"], 
        correctAnswer: "2" 
    },
    { 
        question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"], 
        correctAnswer: "3" 
    }
];

// timer function 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// start quiz function
function startQuiz() {
    quizIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;
    setTime();
    setQuestion(questionCount);
}

// show question function
function setQuestion(id) {
    if (id < questions.length) {
        const currentQuestion = questions[id];
        questionEl.textContent = currentQuestion.question;
        [ans1Btn, ans2Btn, ans3Btn, ans4Btn].forEach((btn, index) => btn.textContent = currentQuestion.answers[index]);
    }
}

// check answer function 
function checkAnswer(event) {
    event.preventDefault();
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

// compute score function
function addScore(event) {
    event.preventDefault();
    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => (a.score < b.score) ? 1 : -1);

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;

        scoreListEl.innerHTML = "";
        for (let i = 0; i < scoreList.length; i++) {
            let li = document.createElement("li");
            li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
            scoreListEl.append(li);
        }

        
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}

window.onload = function() {
    ansBtn.forEach(item => item.addEventListener('click', checkAnswer));

    start.addEventListener("click", startQuiz);

    submitScrBtn.addEventListener("click", addScore);

    hideScoresBtn.addEventListener("click", function () {
        highscoresEl.style.display = "none";
        quizIntro.style.display = "block";
        secondsLeft = 75;
        time.textContent = `Time:${secondsLeft}s`;
    });

    clearScrBtn.addEventListener("click", clearScores);

    viewScrBtn.addEventListener("click", function () {
        highscoresEl.style.display = (highscoresEl.style.display === "none") ? "block" : "none";
    });
};