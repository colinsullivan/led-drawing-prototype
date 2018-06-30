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

import { ROWS, COLS } from './constants';

class TouchReceiver extends React.Component {
  constructor(props) {
    super(props);

    this.touchIsDown = false;

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
    document.addEventListener('ontouchend', this.onTouchEnd);
  }

  componentWillUnmount () {
    document.removeEventListener('ontouchend', this.onTouchEnd);
  }

  handleTouchEnd (e) {
    e.preventDefault();
    e.stopPropagation();
    this.touchIsDown = false;
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

    console.log("firstTouch");
    console.log(firstTouch);
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
