'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var numberOfWizards = 4;
var fragment = document.createDocumentFragment();
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');

var showElement = function (element) {
  var hiddenElement = document.querySelector(element);
  hiddenElement.classList.remove('hidden');
};

var getRandomArrayElement = function (array) {
  var getRandomArrayIndex = function () {
    var randomIndex = Math.floor(Math.random() * array.length);

    return randomIndex;
  }

  var randomIndex = getRandomArrayIndex();
  var randomElement = array[randomIndex];

  return randomElement;
};

var generateWizardFullName = function () {
  var fullName = getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);

  return fullName;
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

var makeWizardElement = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  for (var i = 0; i < wizards.length; i += 1) {
    var wizardElement = makeWizardElement(wizards[i], similarWizardTemplate);
    fragment.appendChild(wizardElement);
  }

  wizardsList.appendChild(fragment);
};

showElement('.setup');

var wizards = generateWizards(numberOfWizards);

renderWizards();

showElement('.setup-similar');
