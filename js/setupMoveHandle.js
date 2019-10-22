'use strict';

(function () {
  var dialogHandler = window.setup.querySelector('.upload');
  var pointerPosition = {
    x: null,
    y: null
  };
  var dragged = false;

  var moveTo = function (moveEvt, draggable) {
    var shift = {
      x: pointerPosition.x - moveEvt.clientX,
      y: pointerPosition.y - moveEvt.clientY
    };

    pointerPosition = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var draggableCoords = {
      x: draggable.offsetLeft - shift.x,
      y: draggable.offsetTop - shift.y
    };

    console.log('OffsetLeft = ' + draggable.offsetLeft);
    // console.log(draggable.offsetTop);

    var draggableRect = draggable.getBoundingClientRect();

    console.log('RectLeft = ' + draggableRect.left);
    // console.log(draggableRect.top);
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

    pointerPosition = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    dragged = true;
    moveTo(moveEvt, window.setup);
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
