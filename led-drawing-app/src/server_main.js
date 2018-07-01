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

import { WEBSOCKET_PORT } from './constants';

const server = new WebSocket.Server({
  port: WEBSOCKET_PORT
});

server.on('connection', function (ws) {
  console.log("connection!");
  ws.on('message', function (msg) {
    console.log("msg");
    console.log(msg);
  });
});

console.log("Hello!");

function draw () {
  
}
setInterval(draw, 30);
