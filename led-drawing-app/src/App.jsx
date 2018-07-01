import React, { Component } from 'react';

import PixelsRenderer from './PixelsRenderer.jsx';
import TouchReceiver from './TouchReceiver.jsx';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const touchAreaHeight = 640;
const touchAreaWidth = 1024;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isTouching: false,
      activeLED: [0, 0]
    };
  }
  handleTouchingLED(i, j) {
    this.setState({
      isTouching: true,
      activeLED: [i, j]
    });
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
        <PixelsRenderer
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
