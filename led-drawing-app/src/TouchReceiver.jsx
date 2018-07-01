/**
 *  @file       TouchReceiver.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react';

import { ROWS, COLS } from './common/constants';

class TouchReceiver extends React.Component {
  constructor(props) {
    super(props);

    this.touchIsDown = false;

    this.colsPerPixel = 0;
    this.rowsPerPixel = 0;

    this.onTouchStart = (e) => {
      this.handleTouchStart(e);
    };
    this.onTouchMove = (e) => {
      this.handleTouchMove(e);
    };
    this.onTouchEnd = (e) => {
      this.handleTouchEnd(e);
    };
  }

  componentDidMount () {
    document.addEventListener('touchend', this.onTouchEnd);

    this.colsPerPixel = COLS / this.props.width;
    this.rowsPerPixel = ROWS / this.props.height;
  }

  componentWillUnmount () {
    document.removeEventListener('touchend', this.onTouchEnd);
  }

  handleTouchEnd (e) {
    e.preventDefault();
    e.stopPropagation();
    this.touchIsDown = false;
    this.props.handleTouchingLEDEnded();
  }

  handleTouchStart (e) {
    e.preventDefault();
    e.stopPropagation();
    this.touchIsDown = true;
  }

  handleTouchMove (e) {
    e.preventDefault();
    e.stopPropagation();

    let firstTouch = e.touches[0];

    // coordinates within our container
    let x = firstTouch.clientX;
    let y = firstTouch.clientY;

    // led coordinates
    let i, j;
    i = Math.round(x * this.colsPerPixel);
    j = Math.round(y * this.rowsPerPixel);

    // bounds
    i = Math.max(
      0,
      Math.min(COLS - 1, i)
    );
    j = Math.max(
      0,
      Math.min(ROWS - 1, j)
    );

    this.props.handleTouchingLED(i, j);
  }

  render () {
    let containerStyle = {
      position: 'absolute',
      zIndex: 100,
      height: this.props.height,
      width: this.props.width
    };

    return (
      <div
        style={containerStyle}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
      ></div>
    );
  }
}

export default TouchReceiver;
