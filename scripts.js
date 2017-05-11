var chosenWordSet;
var orderedValueWords = [];
var correctAnswers = 0;

function load() {
  var actual_JSON;
  loadJSON("https://api.myjson.com/bins/14nftt", function(response) {
      actual_JSON = JSON.parse(response);
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
  console.log("Word Set: " + wordSetNumber);
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
      + "<h5>"
      + keyWords[i]
      + "</h5>"
      + "</li>"
    );
    $('.droppable-area ul').append(
      "<li>"
      + "<div class='value-input-field' id='word-" + i + "-field' type='text' name='word-input-" + i + "'></div>"
      + "</li>"
    );
    $('.value-words ul').append(
      "<li class='draggable' id='option-" + i + "'>"
      + "<h5>"
      + shuffledValueWords[i]
      + "</h5>"
      + "</li>"
    );

    $('.droppable-area #word-' + i + '-field').data('answer', orderedValueWords[i]).droppable( {
      accept: '.value-words li',
      hoverClass: 'hovered',
      drop: handleDropEvent
    } );

    $('.value-words #option-' + i).data('selection', shuffledValueWords[i]).draggable( {
      containment: '.matching-area',
      cursor: 'move',
      revert: true,
    } );
  }
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
  ui.draggable.position( { of: $(this), my: 'center center', at: 'center center' } );

  if (answer === selection) {
    console.log("Correct!");
    $(this).addClass( 'correct' );
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

  load();

  $('#check').click(function(event) {
    event.preventDefault();
    $('.value-input-field').each(function() {
      if ( $(this).hasClass( 'correct' ) === true ) {
        $(this).css('background', '#7DCE82');
      } else {
        $(this).css('background', '#C97064');
      }
    });
  });

  $('#reset').click(function(event) {
    event.preventDefault();
    chosenWordSet = [];
    orderedValueWords = [];
    correctAnswers = 0;
    $("ul").empty();
    load();
  });

});
