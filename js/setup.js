'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var showElement = function (element) {
  var hiddenElement = document.querySelector(element);
  hiddenElement.classList.remove('hidden');
};

var getRandomArrayElement = function (array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];

  return randomElement;
};

var createWizard = function () {
  var wizard = {};
  wizard.name = getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);
  wizard.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizard.eyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);

  return wizard;
};

var createWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i += 1) {
    wizards[i] = createWizard();
  }

  return wizards;
};

var makeWizardElement = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i += 1) {
    fragment.appendChild(makeWizardElement(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

showElement('.setup');

var wizards = createWizards(4);

renderWizards();

showElement('.setup-similar');
