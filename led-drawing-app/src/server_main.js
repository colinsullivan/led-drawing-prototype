/**
 *  @file       server_main.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import WebSocket from 'ws';
import createOPCStrand from 'opc/strand';
import TWEEN from '@tweenjs/tween.js';

import FadecandyController from './server/FadecandyController';

import { WEBSOCKET_PORT, COLS, ROWS } from './common/constants';

const NUM_PIXELS = COLS * ROWS;
const server = new WebSocket.Server({
  port: WEBSOCKET_PORT
});

const fcController = new FadecandyController();

var pixelBuffer = createOPCStrand(NUM_PIXELS);

var pixelTweens = new Array(NUM_PIXELS);

function ledAddressToPixelBufferIndex (addr) {
  let col = addr[0], row = addr[1];

  return (
    row * COLS
    + col
  );
}

function all_off (pixelBuffer) {
  var i;
  for (i = 0; i < pixelBuffer.length; i++) {
    pixelBuffer.setPixel(i, 0, 0, 0);
  }
}

const pixelStartState = {
  r: 100,
  g: 255,
  b: 100
};
const pixelEndState = {
  r: 0,
  g: 0,
  b: 0
};

server.on('connection', function (ws) {
  console.log("connection!");
  ws.on('message', function (msg) {
    let data = JSON.parse(msg);
    let pixelIndex = ledAddressToPixelBufferIndex(data.activeLED);
    let pixelTween = pixelTweens[pixelIndex];
    if (pixelTween) {
      pixelTween.stop();
    }
    pixelTween = new TWEEN.Tween(Object.assign({pixelIndex}, pixelStartState))
      .to(Object.assign({pixelIndex}, pixelEndState), 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function (tweenState) {
        pixelBuffer.setPixel(
          tweenState.pixelIndex,
          tweenState.r,
          tweenState.g,
          tweenState.b
        );
      })
      .start();
    pixelTweens[pixelIndex] = pixelTween;
    //all_off(pixelBuffer);
    //pixelBuffer.setPixel(pixelIndex, 100, 255, 100);
  });
});

console.log("Hello!");

function draw () {
  TWEEN.update();
  fcController.writePixels(pixelBuffer);
}
setInterval(draw, 30);
