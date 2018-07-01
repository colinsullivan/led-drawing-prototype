import React, { Component } from 'react';


import LEDSquaresRenderer from './LEDSquaresRenderer.jsx';
import TouchReceiver from './TouchReceiver.jsx';
import { WEBSOCKET_PORT } from './common/constants';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const touchAreaHeight = 512;
const touchAreaWidth = 1024;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isTouching: false,
      activeLED: [0, 0]
    };

    this.websocket = null;
  }
  openWebsocket () {
    this.websocket = new WebSocket(
      `ws://${window.location.hostname}:${WEBSOCKET_PORT}`
    );

    this.websocket.onopen = () => {
      this.handleWebSocketOpened();
    };

    this.websocket.onmessage = (msg) => {
      this.handleWebSocketMessage(msg);
    };

    this.websocket.onclose = () => {
      this.handleWebSocketClosed();
    };
  }
  componentDidMount () {
    this.openWebsocket();
  }

  handleWebSocketClosed () {
    console.log("websocket closed...");
    setTimeout(() => {
      console.log("Reconnecting...");
      this.openWebsocket();
    }, 1000);
  }

  handleWebSocketOpened () {
    console.log("ws opened");
  }
  handleWebSocketMessage (msg) {
    console.log("msg");
    console.log(msg);
  }
  handleTouchingLED(i, j) {
    this.setState({
      isTouching: true,
      activeLED: [i, j]
    });
    //console.log(`${i},${j}`);
    this.websocket.send(JSON.stringify(this.state));
  }
  handleTouchingLEDEnded() {
    this.setState({
      isTouching: false
    });
  }
  render() {
    return (
      <div style={containerStyle}>
        <TouchReceiver
          height={touchAreaHeight}
          width={touchAreaWidth}
          handleTouchingLED={(i, j) => this.handleTouchingLED(i, j)}
          handleTouchingLEDEnded={() => this.handleTouchingLEDEnded()}
        />
        <LEDSquaresRenderer
          height={touchAreaHeight}
          width={touchAreaWidth}
          isTouching={this.state.isTouching}
          activeLED={this.state.activeLED}
        />
      </div>
    );
  }
}

export default App;
