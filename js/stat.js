'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_OFFSET = 10;
var PADDING = 10;
var FONT_GAP = 15;
var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var TIME_VALUE_COLOR = 'rgba(0, 0, 0, 1)';
var maxBarHeight = HISTOGRAM_HEIGHT - (PADDING + FONT_GAP) * 2;
var shadowX = CLOUD_X + SHADOW_OFFSET;
var shadowY = CLOUD_Y + SHADOW_OFFSET;
var middleOfCanvas = CLOUD_X + CLOUD_WIDTH / 2;
var firstTextY = CLOUD_Y + PADDING + FONT_GAP;
var secondTextY = CLOUD_Y + (PADDING + FONT_GAP) * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadowX, shadowY, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', middleOfCanvas, firstTextY);
  ctx.fillText('Список результатов:', middleOfCanvas, secondTextY);

  ctx.textAlign = 'left';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var playerNameY = CLOUD_Y + CLOUD_HEIGHT - BAR_WIDTH;
    var barHeight = Math.floor((maxBarHeight * times[i]) / maxTime);
    var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = playerNameY - FONT_GAP - PADDING - barHeight;
    var timeValue = Math.floor(times[i]);
    var playerName = names[i];
    var playerBarColor = 'hsl(235, 100%,' + Math.floor((1 - times[i] / maxTime) * 100) + '%)';

    ctx.fillText(playerName, barX, playerNameY);

    if (i === 0) {
      ctx.fillStyle = USER_BAR_COLOR;
    } else {
      ctx.fillStyle = playerBarColor;
    }

    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = TIME_VALUE_COLOR;
    ctx.fillText(timeValue, barX, barY - PADDING);
  }
};
