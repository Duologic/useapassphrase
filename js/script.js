'use strict';

// If gettext is not available, show untranslated string.
if(typeof gettext == 'undefined'){
  window.gettext = function(str){
    return str
  }
}

function generatePassword(numberOfWords) {
  // Cryptographically generated random numbers
  numberOfWords = parseInt(numberOfWords);
  var array = new Uint32Array(numberOfWords);
  var crypto = window.crypto || window.msCrypto;
  crypto.getRandomValues(array);

  // Empty array to be filled with wordlist
  var generatedPasswordArray = [];


  // Grab a random word, push it to the password array
  for (var i = 0; i < array.length; i++) {
      var index = (array[i] % 5852);
      generatedPasswordArray.push(wordlist[index]);
  }

  return generatedPasswordArray.join(' ');
}

function setStyleFromWordNumber(passwordField, numberOfWords) {
  var baseSize = '40';
  var newSize = baseSize * (4/numberOfWords);
  passwordField.setAttribute('style', 'font-size: ' + newSize + 'px;');
}

function convertSecondsToReadable(seconds) {
  var timeString = '';
  var crackabilityColor = 'green';

  // Enumerate all the numbers
  var numMilliseconds = seconds * 1000;
  var numSeconds     = Math.floor(seconds);
  var numMinutes     = Math.floor(numSeconds / 60);
  var numHours       = Math.floor(numSeconds / (60 * 60));
  var numDays        = Math.floor(numSeconds / (60 * 60 * 24));
  var numYears       = Math.floor(numSeconds / (60 * 60 * 24 * 365));
  var numCenturies   = Math.floor(numSeconds / (60 * 60 * 24 * 365 * 100));

  if (numMilliseconds < 1000) {
    timeString = numMilliseconds + ' ' + gettext('milliseconds');
  } else if (numSeconds < 60) {
    timeString = numSeconds + ' ' + gettext('seconds');
  } else if (numMinutes < 60) {
    timeString = numMinutes + ' ' + gettext('minutes');
  } else if (numHours < 24) {
    timeString = numHours + ' ' + gettext('hours');
  } else if (numDays < 365) {
    timeString = numDays + ' ' + gettext('days');
  } else if (numYears < 100) {
    timeString = numYears + ' ' + gettext('years');
  } else {
    timeString = numCenturies + ' ' + gettext('centuries');
  }

  return timeString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateAndSetCrackTime() {
  var timeToCrack = zxcvbn(passwordField.value);
  var readableCrackTime = convertSecondsToReadable(timeToCrack.crack_time);
  document.querySelector('.crack-time').innerHTML = readableCrackTime;
}
