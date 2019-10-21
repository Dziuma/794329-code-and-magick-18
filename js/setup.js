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
  var dialogHandler = setup.querySelector('.upload');
  var startCoords = {
    x: null,
    y: null
  };
  var dragged = false;

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

  var moveTo = function (moveEvt, draggable) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var draggableCoords = {
      x: draggable.offsetLeft - shift.x,
      y: draggable.offsetTop - shift.y
    };

    var draggableRect = draggable.getBoundingClientRect();

    if (draggableRect.left < 0) {
      draggableCoords.x = draggable.offsetWidth / 2;
    }
    if (draggableRect.top < 0) {
      draggableCoords.y = 0;
    }
    if (draggableRect.right > window.innerWidth) {
      draggableCoords.x = window.innerWidth - draggable.offsetWidth / 2;
    }

    draggable.style.left = draggableCoords.x + 'px';
    draggable.style.top = draggableCoords.y + 'px';
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    dragged = true;
    moveTo(moveEvt, setup);
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

    dragged = false;
  };

  dialogHandler.addEventListener('mousedown', onMouseDown);
})();
