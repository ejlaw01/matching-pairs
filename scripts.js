var chosenWordSet;
var orderedValueWords = [];

function load(file) {
  var actual_JSON;
  loadJSON(file, function(response) {
      actual_JSON = JSON.parse(response);
      console.log(actual_JSON);
      chooseWordSet(actual_JSON);
      displayWordSet(chosenWordSet);
  });
}

function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function chooseWordSet(data) {
  var wordSetNumber = Math.floor((Math.random() * data.length) + 1);
  console.log(wordSetNumber);
  var wordSetObject = data.splice(wordSetNumber - 1, 1);
  chosenWordSet = wordSetObject[0];
}

function displayWordSet(wordSet) {
  var value;
  var keyWords = Object.getOwnPropertyNames(wordSet);
  var shuffledValueWords = [];

  for (value in wordSet) {
    orderedValueWords.push(wordSet[value]);
    shuffledValueWords.push(wordSet[value]);
  }

  shuffleArray(shuffledValueWords);

  for (var i = 0; i < keyWords.length; i++) {
    $('.key-words ul').append(
      "<li>"
      + "<label>"
      + keyWords[i]
      + "</label>"
      + "<input class='value-input-field' type='text' name='word-" + i + "-input'>"
      + "</li>"
    );
    $('.value-words ul').append(
      "<li>"
      + shuffledValueWords[i] +
      "</li>"
    );
  }
  console.log(keyWords + " : " + orderedValueWords + " : " + shuffledValueWords);

}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

$(document).ready(function(){

  load("https://api.myjson.com/bins/14nftt");

  $('form').submit(function(event) {
    event.preventDefault();
    var answers = [];

    $('.value-input-field').each(function() {
      answers.push($(this).val());
    });

    console.log(answers);
    console.log(orderedValueWords);


    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === orderedValueWords[i]) {
        console.log(i + ": Correct!");
      } else {
        console.log(i + ": Incorrect");
      }
    }

  });

});
