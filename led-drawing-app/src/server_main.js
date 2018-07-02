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

import configureStore from './common/configureStore';

import FadecandyController from './server/FadecandyController';
import MovementDetectorController from './server/MovementDetectorController';

import { WEBSOCKET_PORT, COLS, ROWS } from './common/constants';

const store = configureStore();

const NUM_PIXELS = COLS * ROWS;
const server = new WebSocket.Server({
  port: WEBSOCKET_PORT
});

const fcController = new FadecandyController();

const FPS = 30;
const FRAME_DUR_MS = 1000 / FPS;
const LOOP_DUR_MS = 10000;
const LOOP_NUM_FRAMES = Math.floor(LOOP_DUR_MS / FRAME_DUR_MS);

const movementController = new MovementDetectorController(store);

store.subscribe(function () {
  let state = store.getState();
  console.log("state");
  console.log(state);
});

var loopFrameIndex = 0;
var pixelBuffer = createOPCStrand(NUM_PIXELS);
var pixelTweens = new Array(NUM_PIXELS);
var loopPixelBuffers = new Array(LOOP_NUM_FRAMES);
var i;
for (i = 0; i < loopPixelBuffers.length; i++) {
  loopPixelBuffers[i] = createOPCStrand(NUM_PIXELS);
}

var loopFrameDecayCoefs = new Array(LOOP_NUM_FRAMES);
for (i = 0; i < loopFrameDecayCoefs.length; i++) {
  loopFrameDecayCoefs[i] = 0.0;
}

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

  let unsubscribe = store.subscribe(function () {
    let state = store.getState();

    try {
      ws.send(JSON.stringify(state));
    } catch (err) {
      console.log("Error sending new state over websocket, it probably closed");
    }

  });

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
        loopPixelBuffers[loopFrameIndex].setPixel(
          tweenState.pixelIndex,
          tweenState.r,
          tweenState.g,
          tweenState.b
        );

        // since this loop frame was used, decay starts over
        loopFrameDecayCoefs[loopFrameIndex] = 1.0;
      })
      .start();
    pixelTweens[pixelIndex] = pixelTween;
    //all_off(pixelBuffer);
    //pixelBuffer.setPixel(pixelIndex, 100, 255, 100);
  });

  ws.on('close', function () {
    unsubscribe();
  });


});

console.log("Hello!");

let buf, pixel, coef;
function draw () {
  buf = loopPixelBuffers[loopFrameIndex];
  TWEEN.update();
  coef = Math.max(0.0, loopFrameDecayCoefs[loopFrameIndex] - 0.1);
  loopFrameDecayCoefs[loopFrameIndex] = coef;

  // decay this frame
  for (i = 0; i < buf.length; i++) {
    pixel = buf.getPixel(i);
    buf.setPixel(
      i,
      pixel[0] * coef,
      pixel[1] * coef,
      pixel[2] * coef
    );
  }

  fcController.writePixels(buf);
  loopFrameIndex += 1;
  if (loopFrameIndex >= LOOP_NUM_FRAMES) {
    loopFrameIndex = 0;
  }
}
setInterval(draw, FRAME_DUR_MS);
