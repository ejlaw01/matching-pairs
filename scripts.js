var chosenWordSet;

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
  var keyWords = Object.getOwnPropertyNames(wordSet);
  for (var i = 0; i < keyWords.length; i++) {
    $('.key-words ul').append("<li>" + keyWords[i] + "</li>")
  }
  console.log(keyWords);

}

$(document).ready(function(){

  load("https://api.myjson.com/bins/14nftt");

});
