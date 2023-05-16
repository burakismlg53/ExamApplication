var point = 0;
var answer = ["Nil Nehri", "Mars", "Kangchenjunga", "Riboz", "Kükürt", "Jüpiter", "Grip", "Büyük Okyanus", "Mısır", "Mona Lisa",]; // doğru cevap dizisi
var pointArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
localStorage.setItem("answerData", JSON.stringify(answer));

function control(qn, ans) {
  answer = JSON.parse(localStorage.getItem("answerData"));
  var par_id = document.getElementById("qp" + qn);
  if (answer[qn - 1] == ans) {
    par_id.style.backgroundColor = "green";
    if (pointArr[qn - 1] == 0) {
      point += 10;
    }
    pointArr[qn - 1] = 1;
    document.getElementById("point").innerHTML = "Puan: " + point;
  }
  else {
    par_id.style.backgroundColor = "red";
    if (pointArr[qn - 1] == 1) {
      point -= 10;
    }
    pointArr[qn - 1] = 0;
  }
  document.getElementById("point").innerHTML = "Puan: " + point;
}

var questions = [
  {
    question: "1. Dünyanın en uzun nehri hangisidir?",
    options: ["Nil Nehri", "Amazon Nehri","Yangtze Nehri","Mississippi Nehri"],
    soru: 1
  },
  {
    question: "2. Güneş sistemindeki en büyük gezegen hangisidir?",
    options: ["Jüpiter", "Mars", "Venüs", "Uranüs"],
    soru: 2
  },
  {
    question: "3. Dünya'nın en yüksek dağı hangisidir?",
    options: ["Everest", "K2", "Kangchenjunga", "Lhotse"],
    soru: 3
  },
  {
    question: "4. Aşağıdakilerden hangisi DNA'nın yapısındaki bazlardan biri değildir?",
    options: ["Adenin", "Sitozin", "Guanin", "Riboz"],
    soru: 4
  },
  {
    question: "5. Aşağıdaki elementlerden hangisi sıvı hâlde bulunur?",
    options: ["Oksijen", "Kükürt", "Hidrojen", "Alüminyum"],
    soru: 5
  },
  {
    question: "6. Güneş sistemindeki en büyük gezegen hangisidir?",
    options: ["Mars", "Jüpiter", "Venüs", "Uranüs"],
    soru: 6
  },
  {
    question: "7. Aşağıdaki hastalıklardan hangisi virüsler tarafından oluşturulur?",
    options: ["Grip", "Diyabet", "Astım", "Şeker hastalığı"],
    soru: 7
  },
  {
    question: "8. Aşağıdaki denizlerden hangisi en derindir?",
    options: ["Kızıldeniz", "Akdeniz", "Hint Okyanusu", "Büyük Okyanus"],
    soru: 8
  },
  {
    question: "9. Aşağıdaki ülkelerden hangisi Güney Amerika'da yer almaz?",
    options: ["Arjantin", "Brezilya", "Kolombiya", "Mısır"],
    soru: 9
  },
  {
    question: "10. Leonardo da Vinci'nin meşhur tablosu hangisidir?",
    options: ["Mona Lisa", "Son Akşam Yemeği", "Vitruvius Adamı", " İsa'nın Dirilişi"],
    soru: 10
  },
];
localStorage.setItem("questionsData", JSON.stringify(questions));

var currentQuestionIndex = 0;

function displayQuestion() {
  questions = JSON.parse(localStorage.getItem("questionsData")); // localStorage'tan soru verilerini çağır
  var currentQuestion = questions[currentQuestionIndex];
            var questionTextElement = document.getElementById("questiontext");
            var optionsListElement = document.getElementById("optionsList");
            questionTextElement.textContent = currentQuestion.question;
            optionsListElement.innerHTML = "";
            currentQuestion.options.forEach(function(option) {
              var optionElement = document.createElement("div");
              var inputElement = document.createElement("input");
              var labelElement = document.createElement("label");  
              inputElement.type = "radio";
              inputElement.name = "answer";
              inputElement.value = option; 
              labelElement.textContent = " " + option;
              labelElement.insertBefore(inputElement, labelElement.firstChild);   
              optionElement.appendChild(labelElement); 
              optionsListElement.appendChild(optionElement);
              var controlelement = currentQuestion.soru;
              inputElement.addEventListener("click", function() {
                control(controlelement, option);
    });
  });
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}
displayQuestion();
var soruno = 10;
function addNewQuestion() {

  questions = JSON.parse(localStorage.getItem("questionsData"));
  soruno++;
  var sorunumarasi = prompt("Soru numarasını girin:");
  var question = prompt("Soru metnini girin:");
  var options = prompt("Seçenekleri virgülle ayırarak girin:");
  options = options.split(",");
  var useranswer = prompt("Doğru cevabı girin:");
  addQuestion(question, options, sorunumarasi, useranswer);
}

function addQuestion(question, options, sorunumarasi, useranswer) {
  
  questions = JSON.parse(localStorage.getItem("questionsData"));
  answer = JSON.parse(localStorage.getItem("answerData"));
    var newQuestion = {
      question: soruno + ". " + question,
      options: options,
      soru: sorunumarasi
    };
    answer.push(useranswer);
    var y = document.getElementById("qp");
    var x = document.createElement("p");
    x.id = "qp" + sorunumarasi;
    x.innerText = sorunumarasi;
    y.appendChild(x);

    questions.push(newQuestion);
    pointArr.push(0);
    // Local storage'a kaydetme

    localStorage.setItem("questionsData", JSON.stringify(questions));
    localStorage.setItem("answerData", JSON.stringify(answer));
  }
displayQuestion();

function updateQuestion(question, options, sorunumarasi, useranswer) {
  questions = JSON.parse(localStorage.getItem("questionsData"));
  answer = JSON.parse(localStorage.getItem("answerData"));
  var sorunumarasi = prompt("Güncellemek istediğiniz sorunun numarasını girin:");
  var question = prompt("Güncellenmiş soru metnini girin:");
  var options = prompt("Güncellenmiş seçenekleri virgülle ayırarak girin:");
  options = options.split(",");
  var useranswer = prompt("Güncellenmiş doğru cevabı girin:");
  if (questions[sorunumarasi - 1].soru == sorunumarasi) {
    answer[sorunumarasi - 1] = useranswer;
    questions[sorunumarasi - 1].question = question;
    questions[sorunumarasi - 1].options = options;
    questions[sorunumarasi - 1].soru = sorunumarasi;

    // Local storage'da güncelleme
    localStorage.setItem("questionsData", JSON.stringify(questions));
    localStorage.setItem("answerData", JSON.stringify(answer));
  }
}
displayQuestion();





displayQuestion();

var time_id = document.getElementById("time");
var seconds = 300;
t_int = setInterval(timer, 1000);
function timer() {
  if (seconds <= 0) {
    time_id.innerHTML = "Süre: --:-- ";
  }
  else {
    var m = Math.floor(seconds / 60);
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    var s = seconds % 60;
    time_id.innerHTML = "Süre: " + m + ":" + s;
    seconds--;
  }
}
