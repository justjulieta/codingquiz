let timerElement = document.getElementById('countdown');
let quizElement = document.getElementById('quiz');
let quizElementDisplaySetting = quizElement.style.display;
let quizQuestionElement = document.getElementById('quiz-questions');
let finalResults = document.getElementsByClassName("final");
let intro = document.getElementById('intro');
let submitBtn = document.getElementById('submit-question');
let startBtn = document.getElementById('start-btn');
let answers = document.getElementsByName("answer");
let displayQuestionResults = document.getElementById("question-results");
let questionResults = document.createElement('div');
let finalScore = document.getElementById('final-score');
let userName = document.getElementById('user-name');
let submitScoreBtn = document.getElementById('submit-score');
let highScorePage = document.getElementById('high-scores')
let highScoreNav = document.getElementById('nav-item');
let highScoresList = document.getElementById('high-scores-list');
let addHighScore = document.createElement('li');

let timeLeft = 60;
let totalCorrectAnswers = 0;
let questionNumber = 0; 
let shuffledQuestionsArray = [];

let currentQuestion = {};
let currentQuestionAnswer;

function countdown() {
    var timeInterval = setInterval(function () {
        if (finalResults[0].style.display == 'block') {
            timeLeft = 0;
            clearInterval(timeInterval);
            timerElement.textContent = "";
        } else if (timeLeft >= 1) {
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            timerElement.textContent = "Time's Up!";
            quizQuestionElement.style.display = 'none';
            finalResults[0].style.display = 'block';
            quizResults();
        }
    }, 1000)
}

const quizQuestions = [
  {
      question: "What year did Javascript first appear?",
      option1: "1992",
      option2: "2000",
      option3: "1998",
      option4: "1996",
      answer: "option4"
  },
  {
      question: "Who trademarked 'JavaScript'?",
      option1: "Microsoft",
      option2: "Apple",
      option3: "Oracle Corporation",
      option4: "Alphabe Inc.",
      answer: "option3"
  },
  {
      question: "How do you create a function in Javascript?",
      option1: "function myFunction()",
      option2: "function = myFunction()",
      option3: "function.myfunction()",
      option4: "function:myfunction()",
      answer: "option1"
  },
  {
      question: "Who developed React??",
      option1: "Meta",
      option2: "Google",
      option3: "Your Mom",
      option4: "Twitter",
      answer: "option1"
  },
  {
      question: "Which HTML element do we put the JavaScript inside?",
      option1: "<scripting>",
      option2: "<js>",
      option3: "<javascript>",
      option4: "<script>",
      answer: "option4"
  }
]

function shuffleQuestions() {
    while (shuffledQuestionsArray.length <= 9) {
        let random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestionsArray.includes(random)) {
            shuffledQuestionsArray.push(random)
            let questionIndex = questions.indexOf(random)
            if (questionIndex > -1) {
                questions.splice(questionIndex,1)
            }
        }
    }
}

function nextQuestion() {
    if (questionResults) {
        questionResults.textContent = '';
    }

    shuffleQuestions();
    let currentQuestion = shuffledQuestionsArray[questionNumber];
    document.getElementById("question-title").textContent = currentQuestion.question;
    document.getElementById("option1").textContent = currentQuestion.option1;
    document.getElementById("option2").textContent = currentQuestion.option2;
    document.getElementById("option3").textContent = currentQuestion.option3;
    document.getElementById("option4").textContent = currentQuestion.option4;
    document.getElementById("option5").textContent = currentQuestion.option5;
    currentQuestionAnswer = currentQuestion.answer;

    let options = document.querySelector('input[name="answer"]:checked')

    if (options) {
        options.checked = false;
    }


    questionNumber++;
}

function navigateAfterSubmission() {
    if(questionNumber < 10){
        nextQuestion(questionNumber);
    } else {
        quizQuestionElement.style.display = 'none';
        finalResults[0].style.display = 'block';
        quizResults();
    }
}

function submitQuestion () {
    let answerChoices = document.getElementsByName("answer"); 
    let selectedAnswer;
    displayQuestionResults.appendChild(questionResults);

    for (let i = 0; i < answerChoices.length; i++) {
        if (answerChoices[i].checked) {
            selectedAnswer = answerChoices[i].value;
            if (selectedAnswer == currentQuestionAnswer) {
                questionResults.style.color = "green"
                questionResults.textContent = "Correct!"
                totalCorrectAnswers++;
                setTimeout(navigateAfterSubmission, 1000);
            } else {
                questionResults.style.color = "red"
                questionResults.textContent = "Wrong! -10 seconds from the clock."
                timeLeft = timeLeft - 10;
                setTimeout(navigateAfterSubmission, 1000);
            }
        }
    }
}

function quizResults() {
    let score = `${totalCorrectAnswers}/10`
    finalScore.textContent += score;
}

function submitScore() {
    let highScoreEntry = {
        userName: userName.value,
        totalCorrectAnswers: totalCorrectAnswers,
    }

    localStorage.setItem('highScoreEntry', JSON.stringify(highScoreEntry));
    navigateToHighScores();
}

function navigateToHighScores() {
    intro.style.display = 'none'
    quizQuestionElement.style.display = 'none';
    finalResults[0].style.display = 'none';
    quizElement.style.display = 'block'
    highScorePage.style.display = 'block';

    let retrieveScore = localStorage.getItem('highScoreEntry');
    let parsedScore = JSON.parse(retrieveScore);

    console.log(parsedScore.userName)
    highScoresList.appendChild(addHighScore);
    addHighScore.textContent = parsedScore.userName + ' - ' + parsedScore.totalCorrectAnswers + ' pts'

}

function startQuiz() {
    if (quizElementDisplaySetting == 'block') {
        quizElement.style.display = 'none';
    }
    else {
        quizElement.style.display = 'block';
        intro.style.display = 'none'
    }

    countdown();
    nextQuestion(questionNumber);
}

startBtn.addEventListener("click", startQuiz)
submitBtn.addEventListener("click", submitQuestion)
submitScoreBtn.addEventListener("click", submitScore)
highScoreNav.addEventListener("click", navigateToHighScores)