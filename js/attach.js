var selectField = document.getElementById('passphrase_select');
var passwordField = document.getElementById('passphrase');
var button = document.querySelector('.btn-generate');

// Initially run it upon load
passwordField.setAttribute('value', generatePassword(4));
calculateAndSetCrackTime();

// Listen for a button click
button.addEventListener('click', function() {
  var numberOfWords = selectField.options[selectField.selectedIndex].value;
  passwordField.value = generatePassword(numberOfWords);
  setStyleFromWordNumber(passwordField, numberOfWords);
  calculateAndSetCrackTime();
});

// Listen for password value change
passwordField.addEventListener('input', function (evt) {
  calculateAndSetCrackTime();
});
