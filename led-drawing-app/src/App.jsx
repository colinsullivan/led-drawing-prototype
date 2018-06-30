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
  render() {
    return (
      <div style={containerStyle}>
        <TouchReceiver
          height={touchAreaHeight}
          width={touchAreaWidth}
        />
        <PixelsRenderer
          height={touchAreaHeight}
          width={touchAreaWidth}
        />
      </div>
    );
  }
}

export default App;
