import React, { Component } from 'react';
import moment from 'moment';

import LEDSquaresRenderer from './LEDSquaresRenderer.jsx';
import TouchReceiver from './TouchReceiver.jsx';
import CallToActionModal from './CallToActionModal.jsx';
import { WEBSOCKET_PORT, CONNECTION_STATUS } from './common/constants';
import { WEBSOCKET_HOST } from './browser/constants';

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
      activeLED: [0, 0],
      motionSensor: 0,
      modalIsActive: false,
      wsConnectionStatus: CONNECTION_STATUS.CONNECTING,
      lastTouchMoment: moment()
    };

    this.websocket = null;
  }
  openWebsocket () {
    this.websocket = new WebSocket(
      `ws://${WEBSOCKET_HOST}:${WEBSOCKET_PORT}`
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
    this.setState({
      wsConnectionStatus: CONNECTION_STATUS.CONNECTING
    });
    setTimeout(() => {
      this.openWebsocket();
    }, 1000);
  }

  handleWebSocketOpened () {
    this.setState({
      wsConnectionStatus: CONNECTION_STATUS.CONNECTED
    });
  }

  handleWebSocketMessage (e) {
    let newState = JSON.parse(e.data);
    let nowMoment = moment();
    if (
      this.state.isTouching === false
      && newState.motionSensor === 1
      && nowMoment.diff(this.state.lastTouchMoment, 'seconds') >= 10
    ) {
      newState.modalIsActive = true;
    } else {
      newState.modalIsActive = false;
    }
    this.setState(newState);
  }

  handleTouchingLED(i, j) {
    this.setState({
      isTouching: true,
      lastTouchMoment: moment(),
      modalIsActive: false,
      activeLED: [i, j]
    });

    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(this.state));
    }
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
        <CallToActionModal active={this.state.modalIsActive} />
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
