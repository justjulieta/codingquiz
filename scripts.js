  const quizQuestions = [
    {
        number: 1,
        question: "What year did Javascript first appear?",
        answer1: "1992",
        answer2: "2000",
        answer3: "1998",
        answer4: "1996",
        correct: "answer4"
    }
    {
        number: 2,
        question: "Who trademarked 'JavaScript'?",
        answer1: "Microsoft",
        answer2: "Apple",
        answer3: "Oracle Corporation",
        answer4: "Alphabe Inc.",
        correct: "answer3"
    } {
        number: 3,
        question: "How do you create a function in Javascript?",
        answer1: "function myFunction()",
        answer2: "function = myFunction()",
        answer3: "function.myfunction()",
        answer4: "function:myfunction()",
        correct: "answer1"
    } {
        number: 4,
        question: "What is the correct JavaScript syntax to wite 'Hello World'?",
        answer1: "("Hello World")",
        answer2: "document.write("Hello World")",
        answer3: "document write("Hello World")",
        answer4: "write.document(Hellow World)",
        correct: "answer2"
    }
    {
        number: 5,
        question: "Which HTML element do we put the JavaScript inside?",
        answer1: "<scripting>",
        answer2: "<js>",
        answer3: "<javascript>",
        answer4: "<script>",
        correct: "answer4"
    }
]

let startScore = 0
let timerElement = document.getElementById("time-left")
var timeLeftContainer = document.getElementById("time-left-container")
var startButton = document.getElementById("start-button")
var questionBox = document.getElementsByClassName("question")
var answerButton = document.getElementsByClassName("answer-button")
var answerFinal = document.getElementById("answer-final")
var submitScoreButton = document.getElementById("submit-score-button")
var submitScoreContainer = document.getElementById("submit-score-container")
var submitInitialsContainer = document.getElementsById("submit-initials-container")

button.addEventListener("click", gameStart);
submitScoreButton.addEventListener("click", saveScore);

function gameStart() {
  questionContainer.classList.remove("gamehide");
  startBox.classList.add("gamehide");
  startTimer();
  questNum = 0;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[questNum]);

}

function startTimer() {
  var downloadTimer = setInterval(function timerCountDown() {
    if (timeLeft <= 0 || timerRun == "Stop Timer") {
      clearInterval(downloadTimer);
      endGame();
      document.getElementById("countdown").textContent = "Time:" + timeLeft;
    } else {
      document.getElementById("countdown").textContent = "Time:" + timeLeft;
      console.log(timerRun);
    }
    timeLeft -= 1;
  }, 1000);

  timerRun = "Active";
}


function showQuestion(question) {
  quizEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timeLeft = timeLeft - 10;
    console.log(timeLeft);
    wrong.classList.remove("gamehide");
    correct.classList.add("gamehide");

  }
  if (selectedButton.dataset.correct) {
    correct.classList.remove("gamehide");
    wrong.classList.add("gamehide");
    console.log("Correct!");
  }

  if (questNum == questions.length - 1) {
    endGame();

  } else {
    clearQuestion();
    questNum++;
    showQuestion(questions[questNum]);
    console.log(score);

  }
}

function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function endGame() {
  timerRun = "Stop Timer";
  console.log(timerRun);
  quizContainer.classList.add("gamehide");
  quizEnd.classList.remove("gamehide");
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  Scores = timeLeft;
  document.getElementById("yourScore").textContent = "Your final score is:" + " " + yourScores;
}

function saveScore() {
  const userScore = {
    score: Scores,
    initials: userInitials.value

  };
}
