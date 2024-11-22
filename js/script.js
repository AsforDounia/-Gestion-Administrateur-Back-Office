// document.getElementById("switch").addEventListener("change", theme);

// function theme(){
//     const label = document.querySelector('label[for="switch"]');
//     const body = document.getElementById('body');
//     const header = document.getElementById('header');
//     const svgdiv = document.getElementById("svgdiv");
//     const logoSrc = document.getElementById('logo');
//     if (checkbox.checked) {
//         body.classList.add('bg-[#141004]');

//         header.classList.remove('bg-[#143095]');
//         header.classList.add('bg-[#5f4e0c]');

//         label.classList.remove('bg-[#D49286]');
//         label.classList.add('bg-yellow-400');

//         svgdiv.classList.remove('text-[#D49286]');
//         svgdiv.classList.add('text-yellow-400');
//         logoSrc.src = "images/logoYellow-re.png";

//     } else {
//         body.classList.remove('bg-[#141004]');

//         header.classList.remove('bg-[#5f4e0c]');
//         header.classList.add('bg-[#143095]');

//         label.classList.remove('bg-yellow-400');
//         label.classList.add('bg-[#D49286]');
//         svgdiv.classList.remove('text-yellow-400');
//         svgdiv.classList.add('text-[#D49286]');
//         logoSrc.src = "images/logoIns-re.png";

//     }
// }

// ================================================
// ================================================
// ================================================

// function timer() {
//             let timeLeft = 20;
//             const countdown = document.getElementById("countdown");
//         const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
//         const seconds = String(timeLeft % 60).padStart(2, '0');
//         countdown.value = `${minutes}:${seconds}`;

//         timeLeft--;

//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             countdown.value = "00:00";
//         }
//     }
// const timer = setInterval(timer, 1000);
// =============================================
// =============================================
// =============================================

// const users = [
//     {
//         email : "admin@gmail.com",
//         password : "admin123",
//         status : "admin",

//     },
// ]



// Fonction pour initialiser les questions
function initializeQuestions() {
  const savedQuestions = localStorage.getItem('quizQuestions');
  if (!savedQuestions) {
      localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
  } else {
      quizQuestions = JSON.parse(savedQuestions);
  }
}

// function addUser(name, password) {
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   const user = {
//     name: name,
//     password: password,
//     status: "user",
//     levels: {
//       A1: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//       A2: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//       B1: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//       B2: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//       C1: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//       C2: {
//         categories: {
//           grammaire: { validation: false, attempts: 0, time: 0 },
//           vocabulaire: { validation: false, attempts: 0, time: 0 },
//           comprehension: { validation: false, attempts: 0, time: 0 },
//         },
//       },
//     },
//   };
//   users.push(user);
//   localStorage.setItem("users", JSON.stringify(users));
// }



function satrtQuizzLevel(level,categorie){

  const counters = {};
  const key = `cont_${level}_${categorie}`; 
  const sto = localStorage.getItem(key) || 0;

  const users = JSON.parse(localStorage.getItem("users"));
  const userActuel = JSON.parse(localStorage.getItem("userActuel"));
  const userIndex = users.findIndex((user) => user.email === userActuel.email);
  
  userActuel.levels[level].categories[categorie].attempts = sto;

  localStorage.setItem("userActuel", JSON.stringify(userActuel));
  users[userIndex] = userActuel;
  localStorage.setItem("users", JSON.stringify(users));

  counters[key] = sto;
  counters[key]++;


  localStorage.setItem(key, counters[key]);
  
  // console.log(localStorage.getItem(key));
  // const game = `${counters[key]}`;

  localStorage.setItem("levelActual",level);
  localStorage.setItem("categorieActual",categorie);
  localStorage.setItem("scoreActual",0);
  const userSection = document.getElementById("userSection");
  userSection.classList.add("hidden");

  let shuffledQuestions;

  const selectedLevel = quizQuestions.find(quiz => quiz.level === level);
  const selectedCategorie = selectedLevel.categories[categorie];

  
  const quizContainer = document.getElementById("quiz");
  quizContainer.classList.remove("hidden");
  quizContainer.innerHTML = "";

  questionsObjet = selectedCategorie;
  shuffledQuestions = shuffle(questionsObjet) ;
  shuffledQuestions.forEach((q, index) => {

      const questionOptions = document.createElement("div");
      questionOptions.classList.add("Questions" , "flex", "absolute", "top-1/3", "w-full");

      const questionElement = document.createElement("div");
      questionElement.classList.add("px-16", "w-full");

      const titleContainer =  document.createElement("div");
      titleContainer.classList.add("h-32");
      titleContainer.innerHTML = `<h1 class="text-[#D49286] text-5xl font-bold"></h1>`
      questionElement.appendChild(titleContainer);

      const questionContainer = document.createElement("div");
      
      questionContainer.innerHTML = `
      <div class="flex justify-between items-center h-16 ">
          <h2 class="text-[#D49286] text-xl" >Question ${index+1} of ${selectedCategorie.length}</h2>
          <input type="time" class="bg-transparent countdown">
      </div>
      <p class="text-2xl font-bold">
          Choisissez la bonne réponse : <br> 
          "${q.question}"
      </p>
      `;
      questionElement.appendChild(questionContainer);

      const optionsElement = document.createElement("div");
      optionsElement.classList.add("text-center", "w-full", "mt-3" ,"relative");
      optionsElement.innerHTML = `
          <button id='option0${index}' onclick="chooseOption('option0${index}','${index}','${q.options[0]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>A.<span class='OptionValue'>${q.options[0]}</span></nav></button>
          <button id='option1${index}' onclick="chooseOption('option1${index}','${index}','${q.options[1]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>B.<span class='OptionValue'>${q.options[1]}</span></nav></button>
          <button id='option2${index}' onclick="chooseOption('option2${index}','${index}','${q.options[2]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>C.<span class='OptionValue'>${q.options[2]}</span></nav></button>
          <button id='option3${index}' onclick="chooseOption('option3${index}','${index}','${q.options[3]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>D.<span class='OptionValue'>${q.options[3]}</span></nav></button>
          <button id="submitAnswer${index}" onclick="ButtonNextQuestion('${index}')" class="Submit border-2 border-[#D49286] h-12 w-3/5 rounded-3xl mb-5 text-white font-semibold text-lg bg-[#D49286] absolute left-[5rem] -bottom-20" >Submit Answer</button>
          <button id="nextQuestion${index}" onclick="displayQuestion()" class="border-2 border-[#D49286] h-12 w-3/5 rounded-3xl mb-5 text-white font-semibold text-lg bg-[#D49286] absolute left-[5rem] -bottom-20 hidden" >Next Question</button>
      `;

      questionOptions.appendChild(questionElement);
      questionOptions.appendChild(optionsElement);
      quizContainer.appendChild(questionOptions);
      
  });
  displayQuestion();

}

function shuffle(arr) {
  const num = 5;
  for (var i = arr.length - 1; i >= 0; i--) {
    for (var j = 0; j < num; j++) {
      const rand = Math.floor(Math.random() * arr.length);
      var temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
  }
  return arr;
}

let userscore = 0;

// function startQuiz() {
//   for (let i = 0; i < questionsObjet.length; i++) {
//     localStorage.removeItem(`question${i}`);
//   }
//   userscore = 0;
//   const userSection = document.getElementById("userSection");
//   userSection.classList.add("hidden");
//   const scoreSection = document.getElementById("scoreSection");
//   scoreSection.classList.add("hidden");

//   const shuffledQuestions = shuffle(questionsObjet);
//   const quizContainer = document.getElementById("quiz");

//   localStorage.setItem(`score`, userscore);

//   quizContainer.innerHTML = "";

//   shuffledQuestions.forEach((q, index) => {
//     const questionOptions = document.createElement("div");
//     questionOptions.classList.add(
//       "Questions",
//       "flex",
//       "absolute",
//       "top-1/3",
//       "w-full"
//     );

//     const questionElement = document.createElement("div");
//     questionElement.classList.add("px-16", "w-full");

//     const titleContainer = document.createElement("div");
//     titleContainer.classList.add("h-32");
//     titleContainer.innerHTML = `<h1 class="text-[#D49286] text-5xl font-bold">${q.title}</h1>`;
//     questionElement.appendChild(titleContainer);

//     const questionContainer = document.createElement("div");

//     questionContainer.innerHTML = `
//         <div class="flex justify-between items-center h-16 ">
//             <h2 class="text-[#D49286] text-xl" >Question ${index + 1} of ${
//       questionsObjet.length
//     }</h2>
//             <input type="time" class="bg-transparent countdown">
//         </div>
//         <p class="text-2xl font-bold">
//             Choisissez la bonne réponse : <br> 
//             "${q.question}"
//         </p>
//         `;
//     questionElement.appendChild(questionContainer);

//     const optionsElement = document.createElement("div");
//     optionsElement.classList.add("text-center", "w-full", "mt-3", "relative");
//     optionsElement.innerHTML = `
//             <button id='option0${index}' onclick="chooseOption('option0${index}','${index}','${q.options[0]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>A.<span class='OptionValue'>${q.options[0]}</span></nav></button>
//             <button id='option1${index}' onclick="chooseOption('option1${index}','${index}','${q.options[1]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>B.<span class='OptionValue'>${q.options[1]}</span></nav></button>
//             <button id='option2${index}' onclick="chooseOption('option2${index}','${index}','${q.options[2]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>C.<span class='OptionValue'>${q.options[2]}</span></nav></button>
//             <button id='option3${index}' onclick="chooseOption('option3${index}','${index}','${q.options[3]}')" class="flex justify-between items-center answer-button border-2 border-[#D49286] h-12 w-4/5 rounded-lg text-left font-bold text-base px-5 mb-5" ><nav>D.<span class='OptionValue'>${q.options[3]}</span></nav></button>
//             <button id="submitAnswer${index}" onclick="ButtonNextQuestion('${index}')" class="Submit border-2 border-[#D49286] h-12 w-3/5 rounded-3xl mb-5 text-white font-semibold text-lg bg-[#D49286] absolute left-[5rem] -bottom-20" >Submit Answer</button>
//             <button id="nextQuestion${index}" onclick="displayQuestion()" class="border-2 border-[#D49286] h-12 w-3/5 rounded-3xl mb-5 text-white font-semibold text-lg bg-[#D49286] absolute left-[5rem] -bottom-20 hidden" >Next Question</button>
//         `;

//     questionOptions.appendChild(questionElement);
//     questionOptions.appendChild(optionsElement);
//     quizContainer.appendChild(questionOptions);
//   });
//   // displayQuestion();
// }

function ButtonNextQuestion(i) {
  const buttons = document.getElementsByClassName("answer-button");
  for (let j = 0; j < buttons.length; j++) {
    buttons[j].disabled = true;
    buttons[j].classList.add("cursor-not-allowed");
  }
  const qChoose = localStorage.getItem(`question${i}`);
  // console.log(qChoose); //text

  const qOption = localStorage.getItem(`option${i}_Id`);
  // console.log(qOption); //id

  const submitAnswer = document.getElementById(`submitAnswer${i}`);
  const nextQuestion = document.getElementById(`nextQuestion${i}`);
  
  submitAnswer.classList.add("hidden");
  nextQuestion.classList.remove("hidden");
  
  const qAnswer = questionsObjet[i].answer;
  const questionContent = questionsObjet[i].question;
  

  
  localStorage.setItem(`Corret_Answer${i}`, qAnswer);
  localStorage.setItem(`Question_Content${i}`, questionContent);
  
  // const id = document.getElementById(qOption);
  
  if (qChoose === qAnswer) {
    userscore += 1;
    localStorage.setItem('scoreActual', userscore);
    
  }
  
  const userActuelfind = JSON.parse(localStorage.getItem("userActuel"));
  // console.log(userActuelfind);
  
  const allUsers = JSON.parse(localStorage.getItem("users"));
  const userIndex = allUsers.findIndex((user) => user.email === userActuelfind.email);
  const userActuel = allUsers[userIndex];
  // console.log(userActuel);
  
  const levelActual = localStorage.getItem("levelActual");
  const categorieActual = localStorage.getItem("categorieActual");

  const key = `cont_${levelActual}_${categorieActual}`;
  const sto = localStorage.getItem(key);
  const levelCont = `cont_${levelActual}_${categorieActual}_${sto}`;

  const scoreActual = localStorage.getItem('scoreActual');
  userActuel.games = userActuel.games || {};
  userActuel.games[levelActual] = userActuel.games[levelActual] || {};
  userActuel.games[levelActual][categorieActual] = userActuel.games[levelActual][categorieActual] || {};
  userActuel.games[levelActual][categorieActual][levelCont] = userActuel.games[levelActual][categorieActual][levelCont] || { questions: [] };

  userActuel.games[levelActual][categorieActual][levelCont].questions.push({
    question: questionContent,
    option: qChoose,
    answer: qAnswer,
  });
  userActuel.games[levelActual][categorieActual][levelCont].Score = scoreActual;

    localStorage.setItem("userActuel", JSON.stringify(userActuel));

    allUsers[userIndex] = userActuel;
    localStorage.setItem("users", JSON.stringify(allUsers));
}

let c = 0;
// function displayQuestion() {
//   const submitAnswer = document.getElementsByClassName("Submit");
//   for (let j = 0; j < submitAnswer.length; j++) {
//     submitAnswer[j].disabled = true;
//     submitAnswer[j].classList.add("cursor-not-allowed");
//   }
//   const buttons = document.getElementsByClassName("answer-button");
//   for (let j = 0; j < buttons.length; j++) {
//     buttons[j].disabled = false;
//     buttons[j].classList.remove("cursor-not-allowed");
//   }

//   const question = document.getElementsByClassName("Questions");

//   if (c < questionsObjet.length) {
//     Array.from(question).forEach((question) => {
//       question.classList.add("hidden");
//     });
//     question[c].classList.remove("hidden");

//     c++;
//   } else {
//     console.log("c++");
//     c = 0;
//     const userSection = document.getElementById("userSection");
//     userSection.classList.remove("hidden");
      
//   const quizContainer = document.getElementById("quiz");
//   quizContainer.classList.add("hidden");
//     // Array.from(question).forEach((question) => {
//     //   question.classList.add("hidden");
//     // });

//     // const scoreSection = document.getElementById("scoreSection");
//     // scoreSection.classList.remove("hidden");
//     // const scoreTitle = document.getElementById("scoreResult");

//     // const score = localStorage.getItem("score");
//     // scoreTitle.innerHTML = `${score}`;
//     // seeResult();
//   }
  
// }

function chooseOption(optionId, index, optionValue) {
  localStorage.setItem(`question${index}`, optionValue);
  localStorage.setItem(`option${index}_Id`, optionId);

  const submitAnswer = document.getElementsByClassName("Submit");
  for (let j = 0; j < submitAnswer.length; j++) {
    submitAnswer[j].disabled = false;
    submitAnswer[j].classList.remove("cursor-not-allowed");
  }
  const allButtonOptions = document.getElementsByClassName("answer-button");
  for (let i = 0; i < allButtonOptions.length; i++) {
    allButtonOptions[i].classList.remove("border-blue-500");
    allButtonOptions[i].classList.add("border-[#D49286]");
  }

  const chooseStyle = document.getElementById(optionId);
  chooseStyle.classList.remove("border-[#D49286]");
  chooseStyle.classList.add("border-blue-500");
}

function seeResult() {
  const userSection = document.getElementById("userSection");
  userSection.classList.add("hidden");

  const scoreSection = document.getElementById("scoreSection");
  scoreSection.classList.remove("hidden");

  const scoreTitle = document.getElementById("scoreResult");

  const score = localStorage.getItem("score");
  scoreTitle.innerHTML = `${score}`;

  const level = document.getElementById("level");
  if (score <= 2) {
    level.innerHTML = "A1";
  } else if (score > 2 && score <= 5) {
    level.innerHTML = "A2";
  } else if (score >= 6 && score < 8) {
    level.innerHTML = "B1";
  } else if (score === 8) {
    level.innerHTML = "B2";
  } else if (score === 9) {
    level.innerHTML = "C1";
  } else {
    level.innerHTML = "C2";
  }
}

function userName() {
  const adminUsername = "admin@gmail.com";
  const adminPassword = "admin123";
  const userName = document.getElementById("userName");
  const password = document.getElementById("password").value;
  if (userName.value !== "") {
    const homeSection = document.getElementById("homeSection");
    homeSection.classList.add("hidden");
    const userSection = document.getElementById("userSection");
    userSection.classList.remove("hidden");
    const oldData = localStorage.getItem("userName");
    const oldscore = document.getElementById("oldscore");

    if (userName.value === adminUsername && password === adminPassword) {
      window.location.href = "admin.html";
    } else if (oldData === userName.value) {
      oldscore.classList.remove("hidden");
      const spanName = document.getElementById("theUserName");
      spanName.innerHTML = userName.value;
    } else {
      oldscore.classList.add("hidden");
    }

    localStorage.setItem("userName", userName.value);
  } else {
    alert("Enter your Name");
  }
}

function ResultRapport() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let pdfContent = "";

  for (let i = 0; i < questionsObjet.length; i++) {
    const userAnswer = localStorage.getItem(`question${i}`);
    const content = localStorage.getItem(`Question_Content${i}`);
    const correctAnswer = localStorage.getItem(`Corret_Answer${i}`);
    pdfContent += `${
      i + 1
    }. ${content}\nVotre réponse : ${userAnswer}\nRéponse correcte : ${correctAnswer}\n\n`;
  }

  pdf.text(pdfContent, 10, 10);
  pdf.save("Rapport_Quiz.pdf");
}

function ResultRapport() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let pdfContent = "";

  for (let i = 0; i < questionsObjet.length; i++) {
    const userAnswer = localStorage.getItem(`question${i}`);
    const content = localStorage.getItem(`Question_Content${i}`);
    const correctAnswer = localStorage.getItem(`Corret_Answer${i}`);
    pdfContent += `${
      i + 1
    }. ${content}\nVotre réponse : ${userAnswer}\nRéponse correcte : ${correctAnswer}\n\n`;
  }

  pdf.text(pdfContent, 10, 10);
  pdf.save("Rapport_Quiz.pdf");
}

// let timerInterval;
// function startTimer(i) {
//     let timeLeft = 5;
//     const countdown = document.getElementsByClassName("countdown");

//     function updateTimer() {
//         const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
//         const seconds = String(timeLeft % 60).padStart(2, '0');
//         for(let i = 0 ; i < countdown.length ; i++){
//             countdown[i].value = `${minutes}:${seconds}`;
//         }

//         timeLeft--;

//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             for(let i = 0 ; i < countdown.length ; i++){
//                 countdown[i].value = "00:00";
//             }
//             ButtonNextQuestion(i,true);
//         }
//     }
//     clearInterval(timerInterval);
//     updateTimer();
//     const timerInterval = setInterval(updateTimer, 1000);
// }

//------timer

// let timerInterval;

// function startTimer(i) {
//   let timeLeft = 20; // Set the time for each question
//   const countdown = document.getElementsByClassName("countdown");

//   function updateTimer() {
//     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//     const seconds = String(timeLeft % 60).padStart(2, "0");
//     for (let i = 0; i < countdown.length; i++) {
//       countdown[i].value = `${minutes}:${seconds}`;
//     }

//     timeLeft--;

//     if (timeLeft < 0) {
//       clearInterval(timerInterval);
//       for (let i = 0; i < countdown.length; i++) {
//         countdown[i].value = "00:00";
//       }
//       ButtonNextQuestion(i, true); // Call the function to handle time up
//     }
//   }

//   clearInterval(timerInterval);
//   updateTimer();
//   timerInterval = setInterval(updateTimer, 1000);
// }

function displayQuestion() {

  const submitAnswer = document.getElementsByClassName("Submit");
  for (let j = 0; j < submitAnswer.length; j++) {
    submitAnswer[j].disabled = true;
    submitAnswer[j].classList.add("cursor-not-allowed");
  }
  const buttons = document.getElementsByClassName("answer-button");
  for (let j = 0; j < buttons.length; j++) {
    buttons[j].disabled = false;
    buttons[j].classList.remove("cursor-not-allowed");
  }

  const question = document.getElementsByClassName("Questions");

  if (c < questionsObjet.length) {
    Array.from(question).forEach((question) => {
      question.classList.add("hidden");
    });
    question[c].classList.remove("hidden");
    // startTimer(c); // Start the timer for the current question
    c++;
  } else {
    c = 0;
    const userSection = document.getElementById("userSection");
    userSection.classList.remove("hidden");
      
    const quizContainer = document.getElementById("quiz");
    quizContainer.classList.add("hidden");
    window.location.href = 'userActuel.html'; 

    // c = 0;
    // Array.from(question).forEach((question) => {
    //   question.classList.add("hidden");
    // });

    // const scoreSection = document.getElementById("scoreSection");
    // scoreSection.classList.remove("hidden");
    // const scoreTitle = document.getElementById("scoreResult");

    // const score = localStorage.getItem("score");
    // scoreTitle.innerHTML = `${score}`;
    // seeResult();
  }
}

// darck mode

// document.getElementById("switch").addEventListener("change", function() {
//     const body = document.getElementById("body");
//     if (this.checked) {
//         body.classList.remove("light-mode");
//         body.classList.add("dark-mode");
//     } else {
//         body.classList.remove("dark-mode");
//         body.classList.add("light-mode");
//     }
// });

// filtrage par level et categorie: fouad

// document.getElementById("level-filter").addEventListener("change", filterContent);
// document.getElementById("category-filter").addEventListener("change", filterContent);

function filterContent() {
  const selectedLevel = document.getElementById("level-filter").value;
  const selectedCategory = document.getElementById("category-filter").value;
  const levels = document.querySelectorAll(" .level");

  levels.forEach((level) => {
    const levelMatch =
      selectedLevel === "all" ||
      level.getAttribute("data-level") === selectedLevel;

    if (
      levelMatch &&
      (selectedCategory === "all" ||
        level.querySelector(`button[data-category="${selectedCategory}"]`))
    ) {
      level.style.display = "block";

      level.querySelectorAll("button").forEach((button) => {
        if (
          selectedCategory === "all" ||
          button.getAttribute("data-category") === selectedCategory
        ) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      });
    } else {
      level.style.display = "none";
    }
  });
}




// script.js

function logout() {
    localStorage.removeItem('user'); 
    window.location.href = 'login.html'; 
}

function userActualLogout(){
  localStorage.removeItem('userActuel');
  window.location.href = 'index.html'; 

}






function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function validatePassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}



function addAdmin(){
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    const admin = {
      email: "admin@gmail.com",
      password: "Admin1234!",
      status: "admin",
      levels :{}
    };
    users.push(admin);
    localStorage.setItem("users", JSON.stringify(users));
  }

}
function loginFunction(){
  const users = JSON.parse(localStorage.getItem("users")) ;
  const email = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  
  
  const userActuel = users.find((user) => user.email === email && user.password === password );
  const userActuelEmail = users.find((user) => user.email === email );
  
  if (userActuel) {
    if (userActuel.status === "admin") {
      window.location.href = 'admin.html'; 
    }
    else {

      localStorage.setItem("userActuel", JSON.stringify(userActuel));
      window.location.href = "userActuel.html";
    }
    
  }
  else {
    if(userActuelEmail){
      alert("Mot de passe incorrect");
    }
    else{
      
      const createAccount = confirm(
        "This email doesn't exist. Would you like to create a new account with this email and password?"
      );
      
      if (createAccount) {
        addUser(email, password);
      } else {
        alert("Please fill out the form again.");
      }
    }

      
    }
}

function addUser(){
  const users = JSON.parse(localStorage.getItem("users"));
  const email = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  if (!validateEmail(email)) {
    alert("L'email n'est pas valide.");
    return false;
  }
  
  if (!validatePassword(password)) {
    alert("Le mot de passe n'est pas valide.");
    return false;
  }
  
  const user = {
    email: email,
    password: password,
    status: "user",
    levels: {
      A1: {
        categories: {
          grammaire: { validation: false, attempts: 0, time: 0 },
          vocabulaire: { validation: false, attempts: 0, time: 0 },
          comprehension: { validation: false, attempts: 0, time: 0 },
        },
      },
      A2: {
        categories: {
          grammaire: { validation: false, attempts: 0, time: 0 },
          vocabulaire: { validation: false, attempts: 0, time: 0 },
          comprehension: { validation: false, attempts: 0, time: 0 },
        },
      },
      B1: {
        categories: {
          grammaire: { validation: false, attempts: 0, time: 0 },
          vocabulaire: { validation: false, attempts: 0, time: 0 },
          comprehension: { validation: false, attempts: 0, time: 0 },
        },
      },
      B2: {
        categories: {
          grammaire: { validation: false, attempts: 0, time: 0 },
          vocabulaire: { validation: false, attempts: 0, time: 0 },
          comprehension: { validation: false, attempts: 0, time: 0 },
        },
      },
      C1: {
      categories: {
        grammaire: { validation: false, attempts: 0, time: 0 },
        vocabulaire: { validation: false, attempts: 0, time: 0 },
        comprehension: { validation: false, attempts: 0, time: 0 },
      },
    },
    C2: {
      categories: {
        grammaire: { validation: false, attempts: 0, time: 0 },
        vocabulaire: { validation: false, attempts: 0, time: 0 },
        comprehension: { validation: false, attempts: 0, time: 0 },
      },
    },
    },
    games: {
    },
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  const userActuelfind = users.find((user) => user.email === email && user.password === password );

  localStorage.setItem("userActuel", JSON.stringify(userActuelfind));
  window.location.href = "userActuel.html";
}

document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('-Gestion-Administrateur-Back-Office/')) {
    addAdmin();
  }
  if (window.location.pathname.endsWith('userActuel.html')) {
    addScore();
    
  }
});

function addScore(){
  const userActuelfind = JSON.parse(localStorage.getItem("userActuel"));
  const allUsers = JSON.parse(localStorage.getItem("users"));
  const userIndex = allUsers.findIndex((user) => user.email === userActuelfind.email);
  const userActuel = allUsers[userIndex];
  
  const levelActual = localStorage.getItem("levelActual");
  const categorieActual = localStorage.getItem("categorieActual");

  const key = `cont_${levelActual}_${categorieActual}`;
  const sto = localStorage.getItem(key);
  const levelCont = `cont_${levelActual}_${categorieActual}_${sto}`;
  
  userActuel.games = userActuel.games || {};
  userActuel.games[levelActual] = userActuel.games[levelActual] || {};
  userActuel.games[levelActual][categorieActual] = userActuel.games[levelActual][categorieActual] || {};
  userActuel.games[levelActual][categorieActual][levelCont] = userActuel.games[levelActual][categorieActual][levelCont] || [];

  const scoreActual = localStorage.getItem("scoreActual");
  userActuel.games[levelActual][categorieActual][levelCont].Score = scoreActual;
    localStorage.setItem("userActuel", JSON.stringify(userActuel));
    allUsers[userIndex] = userActuel;
    localStorage.setItem("users", JSON.stringify(allUsers));
    unlockLevels();
}

function unlockLevels(){
  const userActuel = JSON.parse(localStorage.getItem("userActuel"));
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const categories = ['grammaire', 'vocabulaire', 'comprehension'];

  if (userActuel.games) {
    for (const level of levels) {
      if (userActuel.games[level]) {
        
        for (const category of categories) {
          if (userActuel.games[level][category]) {
            const categorieData = userActuel.games[level][category];
            for (const levelCont in categorieData) {
              const data = categorieData[levelCont];


              const users = JSON.parse(localStorage.getItem("users"));
              const userIndex = users.findIndex((user) => user.email === userActuel.email);


              if (data && data.Score == 10) {


                userActuel.levels[level].categories[category].validation = true ;
                localStorage.setItem("userActuel", JSON.stringify(userActuel));

                users[userIndex] = userActuel;
                localStorage.setItem("users", JSON.stringify(users));

                const currentIndex = categories.indexOf(category);
                const nextCategory = categories[currentIndex + 1];
                const key = `${level}_${nextCategory}`;
                const unlockedTheNextCat = document.getElementById(key);
                if(category === "comprehension"){
                  const currentIndex = levels.indexOf(level);
                  const nextLevel = levels[currentIndex + 1];
                  const unlockedTheNextlev = document.getElementById(nextLevel);
                  unlockedTheNextlev.classList.remove("opacity-50");
                  unlockedTheNextlev.classList.remove("cursor-not-allowed");

                  const firstCat = document.getElementById(`${nextLevel}_grammaire`);
                  firstCat.classList.remove("opacity-50");
                  firstCat.classList.remove("pointer-events-none");
                  firstCat.classList.add("cursor-pointer");
                  const svg = firstCat.querySelector("svg");
                  svg.remove();
                  firstCat.innerHTML =  `
                  <svg width="150" height="150" viewBox="0 0 201 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M106.021 84.7033H108.021V82.7033V47.4092C108.021 22.5722 128.231 2.35034 153.079 2.35034C177.928 2.35034 198.138 22.5722 198.138 47.4092V82.7033C198.138 85.293 197.11 87.7767 195.278 89.608C193.447 91.4392 190.963 92.468 188.374 92.468C185.784 92.468 183.3 91.4392 181.469 89.608C179.638 87.7767 178.609 85.293 178.609 82.7033V47.4092C178.609 33.3157 167.16 21.8798 153.079 21.8798C138.999 21.8798 127.55 33.3157 127.55 47.4092V70.9386V72.9386H129.55H141.315C153.187 72.9386 162.844 82.585 162.844 94.468V176.821C162.844 188.704 153.187 198.35 141.315 198.35H23.6677C11.7952 198.35 2.13831 188.704 2.13831 176.821V94.468C2.13831 82.585 11.7952 72.9386 23.6677 72.9386H56.9618V82.7033V84.7033H58.9618H106.021ZM70.2625 165.509C73.5057 168.752 77.9046 170.574 82.4912 170.574C87.0779 170.574 91.4768 168.752 94.72 165.509C97.9633 162.265 99.7854 157.866 99.7854 153.28C99.7854 148.693 97.9633 144.294 94.72 141.051C91.4768 137.808 87.0779 135.986 82.4912 135.986C77.9046 135.986 73.5057 137.808 70.2625 141.051C67.0192 144.294 65.1971 148.693 65.1971 153.28C65.1971 157.866 67.0192 162.265 70.2625 165.509Z" fill="black" fill-opacity="0.25" stroke="#849EFF" stroke-width="4"/>
                  </svg>
                  ${firstCat.innerHTML} 
              `;


                }else{
                  unlockedTheNextCat.classList.remove("pointer-events-none");
                  unlockedTheNextCat.classList.remove("opacity-50");
                  unlockedTheNextCat.classList.add("cursor-pointer");
                  const svg = unlockedTheNextCat.querySelector("svg");
                  svg.remove();
                  unlockedTheNextCat.innerHTML =  `
                  <svg width="150" height="150" viewBox="0 0 201 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M106.021 84.7033H108.021V82.7033V47.4092C108.021 22.5722 128.231 2.35034 153.079 2.35034C177.928 2.35034 198.138 22.5722 198.138 47.4092V82.7033C198.138 85.293 197.11 87.7767 195.278 89.608C193.447 91.4392 190.963 92.468 188.374 92.468C185.784 92.468 183.3 91.4392 181.469 89.608C179.638 87.7767 178.609 85.293 178.609 82.7033V47.4092C178.609 33.3157 167.16 21.8798 153.079 21.8798C138.999 21.8798 127.55 33.3157 127.55 47.4092V70.9386V72.9386H129.55H141.315C153.187 72.9386 162.844 82.585 162.844 94.468V176.821C162.844 188.704 153.187 198.35 141.315 198.35H23.6677C11.7952 198.35 2.13831 188.704 2.13831 176.821V94.468C2.13831 82.585 11.7952 72.9386 23.6677 72.9386H56.9618V82.7033V84.7033H58.9618H106.021ZM70.2625 165.509C73.5057 168.752 77.9046 170.574 82.4912 170.574C87.0779 170.574 91.4768 168.752 94.72 165.509C97.9633 162.265 99.7854 157.866 99.7854 153.28C99.7854 148.693 97.9633 144.294 94.72 141.051C91.4768 137.808 87.0779 135.986 82.4912 135.986C77.9046 135.986 73.5057 137.808 70.2625 141.051C67.0192 144.294 65.1971 148.693 65.1971 153.28C65.1971 157.866 67.0192 162.265 70.2625 165.509Z" fill="black" fill-opacity="0.25" stroke="#849EFF" stroke-width="4"/>
                  </svg>
                  ${unlockedTheNextCat.innerHTML} 
              `;
                }

            


              }

            }
          }
        }
      }
    }
  }
}
