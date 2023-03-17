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
var answerEls = document.querySelectorAll(".answer");
var questionEl = document.getElementById("question");
var quizHeader = document.querySelector(".quiz-header");
var startButton = document.querySelector(".start");
var timerElement = document.querySelector(".timer");
var results = document.querySelector(".results");
var input = document.querySelector("input");
var enter = document.querySelector(".enter-prompt");

var isWin = false;
var timer;
var timerCount;
var currentQ = 0;
var storedName;
timerCount = 10;
timerElement.style.display = "none";
enter.style.display = "none";
results.style.display = "none";

function startQuiz() {
  currentQ = 0;
  timerCount = 10;
  results.style.display = "none";
  startButton.style.display = "none";
  quizHeader.style.display = "inline";
  timerElement.style.display = "inline";

  timerElement.innerHTML = "Timer: " + 10;

  loadQuiz();
  startTimer();
}

function loadQuiz() {
  questionEl.style.textAlign = "start";
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
  } else {
    alert("That's incorrect...");
    timerCount -= 2;
  }
  currentQ++;
  loadQuiz();
}

answerEls.forEach(function (el) {
  el.addEventListener("click", btnClick);
});

function finished() {
  quizHeader.style.display = "none";
  timerElement.style.display = "none";
  input.value = "";
  input.style.display = "block";
  enter.style.display = "block";
}

function inputValue(e) {
  if (e.key === "Enter") {
    results.style.display = "flex";
    startButton.style.display = "inline";
    startButton.innerText = "Restart";
    input.style.display = "none";
    enter.style.display = "none";
    var winObj = {
      time: timerCount,
      initial: input.value,
    };
    setWins(winObj);
    getWins();
  }
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    if (
      (timerCount >= 0 && currentQ === questions.length) ||
      timerCount === 0
    ) {
      clearInterval(timer);
      finished();
    }
  }, 1000);
}

function setWins(winObj) {
  localStorage.setItem("winObj", JSON.stringify(winObj));
}

function getWins() {
  var lastScore = JSON.parse(localStorage.getItem("winObj"));
  if (lastScore !== null) {
    document.querySelector(".time").textContent = "Time: " + lastScore.time;
    document.querySelector(".name").textContent =
      "Initials: " + lastScore.initial;
  }
}

startButton.addEventListener("click", startQuiz);
input.addEventListener("keypress", inputValue);
