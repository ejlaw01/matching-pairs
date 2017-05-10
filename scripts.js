var chosenWordSet;
var orderedValueWords = [];
var correctAnswers = 0;

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
    //debugger;
    $('.key-words ul').append(
      "<li>"
      + "<label>"
      + keyWords[i]
      + "</label>"
      + "<input id='word-" + i + "-field' class='value-input-field' type='text' name='word-input-" + i + "'>"
      + "</li>"
    );
    $('.value-words ul').append(
      "<li id='option-" + i + "'>"
      + shuffledValueWords[i] +
      "</li>"
    );

    $('.key-words #word-' + i + '-field').data('answer', orderedValueWords[i]).droppable( {
      accept: '.value-words li',
      hoverClass: 'hovered',
      drop: handleDropEvent
    } );

    $('.value-words #option-' + i).data('selection', shuffledValueWords[i]).draggable( {
      containment: '.matching-area',
      cursor: 'move',
      revert: true,
      snap: '.key-words input',
      snapMode: 'inner'
    } );
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

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  var answer = $(this).data('answer');
  var selection = ui.draggable.data('selection');

  ui.draggable.draggable( 'option', 'revert', false );

  if (answer === selection) {
    console.log("Correct!");
    ui.draggable.draggable( 'disable' );
    correctAnswers++;
  } else {
    console.log("Nope!");
  }

  if (correctAnswers >= orderedValueWords.length) {
    alert("All correct!");
  }

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
