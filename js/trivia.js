// JavaScript for Trivia Game

// global variables
var triviaKey = [
  {
    question: "Which one of these is not a JavaScript data type?",
    options: [
      { letter: "A", text: "Boolean" },
      { letter: "B", text: "String" },
      { letter: "C", text: "Loop" },
      { letter: "D", text: "Undefined" },
    ],
    answer: "C",
  },
  {
    question: "The following is a symbol for a comment in Javascript, ‘//’",
    options: [
      { letter: "A", text: "True" },
      { letter: "B", text: "False" },
    ],
    answer: "A",
  },
  {
    question: "What will this line of text perform in Javascript, ‘console.log()’?",
    options: [
      { letter: "A", text: "Input keyed information into database" },
      { letter: "B", text: "Display keyed information to user" },
      { letter: "C", text: "Retrieve requested information and display" },
      { letter: "D", text: "Creates and logs keyed variables" },
    ],
    answer: "C",
  },
  {
    question: "JavaScript is case-sensitive?",
    options: [
      { letter: "A", text: "True" },
      { letter: "B", text: "False" },
    ],
    answer: "A",
  },
  {
    question: "Which symbols/characters create an array?",
    options: [
      { letter: "A", text: "[ ]" },
      { letter: "B", text: "&&" },
      { letter: "C", text: "{}" },
      { letter: "D", text: "/* */" },
    ],
    answer: "A",
  },
  {
    question: "What is a local variable?",
    options: [
      { letter: "A", text: "a variable that is only visible within a function where it’s defined" },
      { letter: "B", text: "a variable in a function that stores other variables" },
      { letter: "C", text: "a variable that is visible anywhere in the program" },
      { letter: "D", text: "a variable that is declared with no value" },
    ],
    answer: "A",
  },
  {
    question: "Which term is used to convert one data type to another?",
    options: [
      { letter: "A", text: "Action" },
      { letter: "B", text: "Parse" },
      { letter: "C", text: "Hash" },
      { letter: "D", text: "Value" },
    ],
    answer: "B",
  },
  {
    question: "JavaScript has two types of functions, named or literal",
    options: [
      { letter: "A", text: "True" },
      { letter: "B", text: "False" },
    ],
    answer: "B",
  },
  {
    question: "JavaScript is a scripting language and an object-oriented programming language?",
    options: [
      { letter: "A", text: "True" },
      { letter: "B", text: "False" },
    ],
    answer: "A",
  },
  {
    question: "Which company developed JavaScript?",
    options: [
      { letter: "A", text: "Net Solutions" },
      { letter: "B", text: "Netscape" },
      { letter: "C", text: "Internet Explorer" },
      { letter: "D", text: "ARAPANET" },
    ],
    answer: "B",
  },
];

var userAnswers = [
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
  { selected: "x", result: "incorrect" },
];

// View Model
function TriviaViewModel() {
  var self = this;
  // initial values
  self.currentView = ko.observable("home");
  self.questionNumber = ko.observable(0);
  self.userKey = ko.observableArray(userAnswers);
  self.numberCorrect = ko.observable(0);

  // computed
  self.currentQuestion = ko.computed(function () {
    return triviaKey[self.questionNumber()];
  });
  self.currentOptions = ko.computed(function () {
    return triviaKey[self.questionNumber()].options;
  });
  self.percentCorrect = ko.computed(function () {
    let percent = self.numberCorrect() * 10;
    return percent + "%";
  });
  self.ranking = ko.computed(function () {
    return self.numberCorrect() <= 5
      ? "BEGINNER"
      : self.numberCorrect() > 5 && self.numberCorrect() < 8
      ? "NOVICE"
      : "EXPERT";
  });

  // methods
  changeView = function (view) {
    self.currentView(view);
  };

  questionUp = function () {
    let current = self.questionNumber();
    if (current === 9) {
      getResults();
      self.currentView('results');
      return;
    }
    self.questionNumber(current + 1);
  };

  questionDown = function () {
    let current = self.questionNumber();
    if (current === 0) {
      self.currentView('home');
      return;
    }
    self.questionNumber(current - 1);
  };

  recordAnswer = function (answer) {
    let temp = self.userKey();
    let result = answer === self.currentQuestion().answer
      ? "correct"
      : "incorrect";
    temp[self.questionNumber()] = { selected: answer, result: result };
    self.userKey(temp);
  };

  getResults = function () {
    let correct = 0;
    let answers = self.userKey()
    answers.forEach(a => {
      if (a.result === "correct") {
        correct++;
      }
    });
    self.numberCorrect(correct);
  };
};

ko.applyBindings(new TriviaViewModel());
