const questions = [
    {
        question: "Commonly used data type Do not include:", 
        choices: ["strings", "booleans", "alerts","numbers"],
        correctAnswer: "numbers",
    },
    {
        question:"The condition in an if/else statement is enclosed with:",
        choices: ["quotes", "curly brackets", "paranthesis", "square brackets"],
        correctAnswer: "paranthesis",
    },

];
let currentQuestion = 0;
let score = 0;
let timer = 60;
let timerInterval;

const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector(".choices");
const timerEl = document.querySelector("#timer");
// const scoreEl = document.querySelector();
// const resultEl = document.querySelector();
// const finalScoreEl = document.querySelector();

function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionEl.textContent = questions[currentQuestion].question;
        choicesEl.innerHTML = "";
        questions[currentQuestion].choices.forEach((choice, index) => {
            const choiceButton = document.querySelector("label");
            // choiceButton.textContent = choice;
            choiceButton.addEventListener("click", () => checkAnswer(choice));
            choicesEl.appendChild(choiceButton);
        });
        startTimer();
    } else {
      endQuiz();
    }
}
displayQuestion();
