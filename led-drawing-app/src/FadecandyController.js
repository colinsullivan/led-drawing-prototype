/**
 *  @file       FadecandyController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import net from "net"
import createOPCStream from "opc"

import {
  FADECANDY_DISCONNECTED,
  FADECANDY_CONNECTED,
  FADECANDY_CONNECTING
} from './actionTypes'

/**
 *  @class        FadecandyController
 *
 *  @classdesc    Connect to fadecandy and dispatch the connection events
 *  to a state store.
 **/ class FadecandyController {
  constructor(store) {
    this.store = store;
    // connecting directly to Fadecandy with this socket
    this.socket = new net.Socket();
    this.socket.setNoDelay();
    this.socket.on("close", this.handleSocketClosed.bind(this));
    this.socket.on("error", this.handleSocketClosed.bind(this));
    this.socket.on("connect", this.handleSocketConnected.bind(this));
    
    // We will stream OPC data to the fadecandy over the socket
    this.opcStream = createOPCStream();
    this.opcStream.pipe(this.socket);

    this.connect();
  }
  handleSocketClosed () {
    //this.store.dispatch({
      //type: FADECANDY_DISCONNECTED
    //});
    this.connect();
  }
  handleSocketConnected () {
    //this.store.dispatch({
      //type: FADECANDY_CONNECTED
    //});
  }
  connect () {
    //this.store.dispatch({
      //type: FADECANDY_CONNECTING
    //});
    this.socket.connect(7890, process.env.FADECANDY_HOST || 'localhost');
  }
  writePixels (pixels) {
    this.opcStream.writePixels(0, pixels.buffer);
  }
}

export default FadecandyController;
