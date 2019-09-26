'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var fragment = document.createDocumentFragment();
var wizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var inputCoatColor = setup.querySelector('input[name="coat-color"]');
var inputEyesColor = setup.querySelector('input[name="eyes-color"]');
var inputFireballColor = setup.querySelector('input[name="fireball-color"]');

var showElement = function (element) {
  var hiddenElement = document.querySelector(element);
  hiddenElement.classList.remove('hidden');
};

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayElement = function (array) {
  var randomIndex = getRandomArrayIndex(array);
  var randomElement = array[randomIndex];

  return randomElement;
};

var generateWizardFullName = function () {
  var wizardName = getRandomArrayElement(WIZARD_NAMES);
  var wizardSurname = getRandomArrayElement(WIZARD_SURNAMES);

  return wizardName + ' ' + wizardSurname;
};

var generateWizardParameters = function () {
  var wizard = {};
  wizard.name = generateWizardFullName();
  wizard.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizard.eyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);

  return wizard;
};

var generateWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i += 1) {
    wizards[i] = generateWizardParameters();
  }

  return wizards;
};

var createWizard = function (wizard, template) {
  var wizardTamplate = template.cloneNode(true);

  wizardTamplate.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardTamplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardTamplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardTamplate;
};

var renderWizards = function () {
  var wizards = generateWizards(NUMBER_OF_WIZARDS);

  for (var i = 0; i < wizards.length; i += 1) {
    var wizardElement = createWizard(wizards[i], wizardTemplate);
    fragment.appendChild(wizardElement);
  }

  wizardsList.appendChild(fragment);
};

var setupCloseEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', setupCloseEscPressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', setupCloseEscPressHandler);
};

renderWizards();

showElement('.setup-similar');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  var randomCoatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  inputCoatColor.value = randomCoatColor;
});

wizardEyes.addEventListener('click', function () {
  var randomEyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  inputEyesColor.value = randomEyesColor;
});

fireball.addEventListener('click', function () {
  var randomFireballColor = getRandomArrayElement(FIREBALL_COLORS);
  fireball.style.background = randomFireballColor;
  inputFireballColor.value = randomFireballColor;
});
