const questions = [
  {
    question:
      "Which built-in method calls a function for each element in the array?",
    a: "while()",
    b: "loop()",
    c: "forEach()",
    d: "None of the above",
    correct: "c",
  },
  {
    question:
      "Which built-in method reverses the order of the elements of an array?",
    a: "changeOrder(order)",
    b: "reverse()",
    c: "sort(order)",
    d: "None of the above",
    correct: "b",
  },
];
var wordBlank = document.querySelector(".word-blanks");
var answerEls = document.querySelectorAll(".answer");
var questionEl = document.getElementById("question");
var startButton = document.querySelector(".start");
var timerElement = document.querySelector(".timer");
var correctAnswers = document.querySelector(".correct");
var wrongAnswers = document.querySelector(".wrong");
var timeScore = document.querySelector(".time");
var results = document.querySelector(".results");
var restartBtn = document.querySelector(".restart");
var input = document.querySelector("input");
var inputedName = document.querySelector(".name");

var isWin = false;
var winCounter = 0;
var timer;
var timerCount;
var currentQ = 0;
var storedName;
timerCount = 30;
timerElement.style.display = "none";

function startQuiz() {
  currentQ = 0;
  winCounter = 0;
  timerCount = 30;
  correctAnswers.style.display = "none";
  timeScore.style.display = "none";
  startButton.style.display = "none";
  inputedName.style.display = "None";
  questionEl.style.display = "inline";
  timerElement.style.display = "inline";
  timerElement.innerHTML = 30;
  answerEls.forEach(function (el) {
    el.style.display = "inline";
  });
  loadQuiz();
  startTimer();
}

function loadQuiz() {
  console.log(currentQ);
  if (currentQ < questions.length) {
    questionEl.innerText = questions[currentQ].question;
    answerEls.forEach(function (el) {
      el.style.display = "block";
      el.innerText = questions[currentQ][el.id];
    });
  }
}

function btnClick(e) {
  if (e.target.id === questions[currentQ].correct) {
    alert("That's correct!");
    winCounter++;
  } else {
    alert("That's incorrect...");
    timerCount -= 10;
  }
  currentQ++;
  loadQuiz();
}

answerEls.forEach(function (el) {
  el.addEventListener("click", btnClick);
});

function finished() {
  questionEl.style.display = "none";
  timerElement.style.display = "none";
  answerEls.forEach(function (el) {
    el.style.display = "none";
  });
  input.style.display = "block";
}

function inputValue(e) {
  if (e.key === "Enter") {
    correctAnswers.style.display = "inline";
    timeScore.style.display = "inline";
    inputedName.style.display = "inline";
    startButton.style.display = "inline";
    startButton.innerText = "Restart";

    correctAnswers.textContent = winCounter;
    timeScore.textContent = timerCount;
    inputedName.textContent = input.value;
    localName = input.value;
    input.style.display = "none";

    setScore();
  }
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (
      (timerCount >= 0 && currentQ === questions.length) ||
      timerCount === 0
    ) {
      clearInterval(timer);
      finished();
    }
  }, 1000);
}

startButton.addEventListener("click", startQuiz);

input.addEventListener("keypress", inputValue);
