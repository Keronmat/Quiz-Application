const api_url =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const loadingDots = document.getElementById("preload");

function showLoader() {
  loadingDots.style.display = "block";
}

function hideloader() {
  loadingDots.style.display = "none";
}

//async function
window.onload = async () => {
  //display loader
  showLoader();
  //store response
  const response = await fetch(api_url);
  //storing data

  const data = await response.json();
  // console.log(data);
  //if(response){
  hideloader();
  // }

  main(data);
};

const main = (data) => {
  //console.log(data);
  const answersEls = document.querySelectorAll(".answer");
  const questionEl = document.getElementById("question");
  const quizCategory = document.getElementById("quiz_category");
  const quiz = document.getElementById("quiz");

  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");

  const a_input = document.getElementById("a");
  const b_input = document.getElementById("b");
  const c_input = document.getElementById("c");
  const d_input = document.getElementById("d");
  const submitBtn = document.getElementById("submit");
  const storedData = [];

  let currentQuiz = 0;
  let score = 0;

  function storeData(apiData) {
    storedData.push(...apiData.results);
  }
  storeData(data);
  loadQuiz(storedData[currentQuiz]);

  // console.log(storedData);
  function loadQuiz(currentQuizData) {
    deselectAnswers();

    //console.log(quizData.results[currentQuiz]);
    // const currentQuizData = quizData[currentQuiz];

    let currentQuestion = currentQuizData.question;
    correct = currentQuizData.correct_answer;

    let currentAnswers = [
      ...currentQuizData.incorrect_answers,
      currentQuizData.correct_answer,
    ].sort(() => 0.5 - Math.random());

    questionEl.innerHTML = currentQuestion;

    //console.log(a_input.value);
    quizCategory.innerHTML = currentQuizData.category;

    a_text.innerHTML = currentAnswers[0];
    a_input.id = currentAnswers[0];
    a_text.htmlFor = currentAnswers[0];

    b_text.innerHTML = currentAnswers[1];
    b_input.id = currentAnswers[1];
    b_text.htmlFor = currentAnswers[1];

    c_text.innerHTML = currentAnswers[2];
    c_input.id = currentAnswers[2];
    c_text.htmlFor = currentAnswers[2];

    d_text.innerHTML = currentAnswers[3];
    d_input.id = currentAnswers[3];
    d_text.htmlFor = currentAnswers[3];
  }

  function getSelected() {
    let answer = undefined;

    answersEls.forEach((radioInput) => {
      if (radioInput.checked) {
        answer = radioInput.id;
      }
    });

    return answer;
  }

  function deselectAnswers() {
    answersEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }

  submitBtn.addEventListener("click", () => {
    //check to see the answer
    const answer = getSelected();

    let correct = data.results[currentQuiz].correct_answer;
    if (answer) {
      if (answer === correct) {
        score++;
      }
      // console.log(answer);
      currentQuiz++;
      if (currentQuiz < data.results.length) {
        loadQuiz(storedData[currentQuiz]);
      } else {
        quiz.innerHTML = ` 
        <h2>You answered ${score}/${data.results.length} questions correctly. </h2> 
        <button onclick="location.reload()">Reload</button>
        `;
      }
    }
  });
};

//getapi(api_url);
// Function to hide the loader
//function hideloader() {
//  document.getElementById("loading").style.display = "none";
//}

/*
  {
    question: "What is your name?",
    a: "Dan",
    b: "John",
    c: "Mike",
    d: "Don",
    correct: "a",
  },
  {
    question: "How old am I?",
    a: "10",
    b: "25",
    c: "29",
    d: "36",
    correct: "c",
  },
  {
    question: "Where do I live?",
    a: "Kingstown",
    b: "Chateaubelair",
    c: "Rose Bank",
    d: "Petit Bordel",
    correct: "d",
  },
];
*/
