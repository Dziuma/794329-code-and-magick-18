'use strict';

(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Мария',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb (0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = ['black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var NUMBER_OF_WIZARDS = 4;
  var fragment = document.createDocumentFragment();
  var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
  var wizardsList = document.querySelector('.setup-similar-list');

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
    var wizardParameters = {};
    wizardParameters.name = generateWizardFullName();
    wizardParameters.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
    wizardParameters.eyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);

    return wizardParameters;
  };

  var generateWizards = function (amount) {
    var wizards = [];

    for (var i = 0; i < amount; i += 1) {
      wizards[i] = generateWizardParameters();
    }

    return wizards;
  };

  var createWizard = function (wizardParameters, template) {
    var wizard = template.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardParameters.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardParameters.coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = wizardParameters.eyesColor;

    return wizard;
  };

  var renderWizards = function () {
    var wizards = generateWizards(NUMBER_OF_WIZARDS);

    for (var i = 0; i < wizards.length; i += 1) {
      var wizardElement = createWizard(wizards[i], wizardTemplate);
      fragment.appendChild(wizardElement);
    }

    wizardsList.appendChild(fragment);
  };

  window.setupWizards = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    getRandomArrayElement: getRandomArrayElement = function (array) {
      var randomIndex = getRandomArrayIndex(array);
      var randomElement = array[randomIndex];

      return randomElement;
    }
  };

  renderWizards();

  showElement('.setup-similar');
})();
