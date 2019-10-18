'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var inputCoatColor = setup.querySelector('input[name="coat-color"]');
  var inputEyesColor = setup.querySelector('input[name="eyes-color"]');
  var inputFireballColor = setup.querySelector('input[name="fireball-color"]');

  var resetOffset = function (element) {
    var isStyle = element.hasAttribute('style');

    if (isStyle) {
      element.removeAttribute('style');
    }
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    resetOffset(setup);
    document.removeEventListener('keydown', escPressHandler);
  };

  var changeCoatColor = function () {
    var randomCoatColor = window.setupWizards.getRandomArrayElement(window.setupWizards.WIZARD_COAT_COLORS);
    wizardCoat.style.fill = randomCoatColor;
    inputCoatColor.value = randomCoatColor;
  };

  var changeEyesColor = function () {
    var randomEyesColor = window.setupWizards.getRandomArrayElement(window.setupWizards.WIZARD_EYES_COLORS);
    wizardEyes.style.fill = randomEyesColor;
    inputEyesColor.value = randomEyesColor;
  };

  var changeFireballColor = function () {
    var randomFireballColor = window.setupWizards.getRandomArrayElement(FIREBALL_COLORS);
    fireball.style.background = randomFireballColor;
    inputFireballColor.value = randomFireballColor;
  };

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
    changeCoatColor();
  });

  wizardEyes.addEventListener('click', function () {
    changeEyesColor();
  });

  fireball.addEventListener('click', function () {
    changeFireballColor();
  });

  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var setupCoords = {
        x: setup.offsetLeft - shift.x,
        y: setup.offsetTop - shift.y
      };

      var setupRect = setup.getBoundingClientRect();

      if (setupRect.left < 0) {
        setupCoords.x = setup.offsetWidth / 2;
      }
      if (setupRect.top < 0) {
        setupCoords.y = 0;
      }
      if (setupRect.right > window.innerWidth) {
        setupCoords.x = window.innerWidth - setup.offsetWidth / 2;
      }

      setup.style.left = setupCoords.x + 'px';
      setup.style.top = setupCoords.y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
