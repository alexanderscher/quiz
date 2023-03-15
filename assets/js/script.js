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

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");

let currentQuiz = 0;
loadQuiz();

function loadQuiz() {
  if (currentQuiz < questions.length) {
    questionEl.innerText = questions[currentQuiz].question;
    answerEls.forEach((el) => (el.innerText = questions[currentQuiz][el.id]));
  }
}

function btnClick(e) {
  if (e.target.id === questions[currentQuiz].correct) {
    alert("That's correct!");
  } else alert("That's incorrect...");
  currentQuiz++;
  loadQuiz();
}

answerEls.forEach(
  (el) => el.addEventListener("click", btnClick)
  // el.addEventListener("click", (e) =>
  //   e.target.id === questions[currentQuiz].correct
  //     ? alert("That's correct!");
  //     : alert("That's incorrect...")
  // )
);
