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
var USER_NAME = 'Вы';
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
var maxBarHeight = HISTOGRAM_HEIGHT - (PADDING + FONT_GAP) * 2;
var shadowX = CLOUD_X + SHADOW_OFFSET;
var shadowY = CLOUD_Y + SHADOW_OFFSET;
var middleOfCanvas = CLOUD_X + CLOUD_WIDTH / 2;
var titleTextY = CLOUD_Y + PADDING + FONT_GAP;
var playerNameY = CLOUD_Y + CLOUD_HEIGHT - BAR_WIDTH;

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

var getRandomNumberFromTo = function (from, to) {
  return Math.floor(from + Math.random() * (to + 1 - from));
};

var getColor = function () {
  var saturness = getRandomNumberFromTo(0, 100);

  return 'hsl(235, ' + saturness + '%, 50%)';
};

var renderText = function (ctx, lines, textX, textY, color, textAlign) {
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.font = '16px PT Mono';

  if (typeof (lines) === 'object') {
    for (var i = 0; i < lines.length; i += 1) {
      var coordY = textY + (PADDING + FONT_GAP) * i;
      var text = lines[i];

      ctx.fillText(text, textX, coordY);
    }
  } else {
    ctx.fillText(lines, textX, textY);
  }
};

var renderBar = function (ctx, name, time, maxHeight, maxTime, barColor, barX, barY) {
  var barHeight = Math.floor(maxHeight * time / maxTime);
  var playerName = name;
  var timeY = playerNameY - FONT_GAP - PADDING - barHeight - PADDING;

  renderText(ctx, playerName, barX, playerNameY, TEXT_COLOR, 'left');

  ctx.fillStyle = barColor;
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  renderText(ctx, time, barX, timeY, TEXT_COLOR, 'left');
};

var lines2 = ['Ура вы победили!', 'Список результатов:'];

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadowX, shadowY, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, lines2, middleOfCanvas, titleTextY, TEXT_COLOR, 'center');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.floor((maxBarHeight * times[i]) / maxTime);
    var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = playerNameY - FONT_GAP - PADDING - barHeight;
    var playerName = names[i];
    var playerBarColor = playerName === USER_NAME ? USER_BAR_COLOR : getColor();
    var timeValue = Math.floor(times[i]);

    renderBar(ctx, playerName, timeValue, maxBarHeight, maxTime, playerBarColor, barX, barY);
  }
};
