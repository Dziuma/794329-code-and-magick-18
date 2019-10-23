'use strict';

(function () {
  var dialogHandler = window.setup.querySelector('.upload');
  var shift = {
    x: null,
    y: null
  };
  var dragged = false;
  var setup = window.setup;

  var moveTo = function (moveEvt, draggable) {
    var draggableRect = draggable.getBoundingClientRect();

    var draggableCoords = {
      x: moveEvt.clientX + draggableRect.width / 2 - shift.x,
      y: moveEvt.clientY - shift.y
    };

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

    var draggableRect = setup.getBoundingClientRect();

    shift = {
      x: downEvt.clientX - draggableRect.left,
      y: downEvt.clientY - draggableRect.top
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    dragged = true;
    moveTo(moveEvt, setup);
  };

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

    dragged = false;
  };

  dialogHandler.addEventListener('mousedown', onMouseDown);
})();
