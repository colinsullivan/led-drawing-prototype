/**
 *  @file       LEDSquaresRenderer.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
import React from 'react';

import { ROWS, COLS } from './constants';

const activeLEDStyles = {
  background: '#33ee33'
};

class LEDSquaresRenderer extends React.Component {
  render () {
    var containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      width: this.props.width,
      height: this.props.height
    };
    var rowStyle = {
      width: '100%',
      flex: '1 0 auto',
      display: 'flex'
    };
    var pixelStyles = {
      background: '#333333',
      flex: '1 0 auto',
      height: 'inherit'
    };

    var rows = [];
    var j;

    for (j = 0; j < ROWS; j++) {
      let cols = [], i;

      for (i = 0; i < COLS; i++) {
        let style = pixelStyles;
        if (
          this.props.isTouching
          && this.props.activeLED[0] === i
          && this.props.activeLED[1] === j
        ) {
          style = Object.assign({}, pixelStyles, activeLEDStyles);
        }
        cols.push(
          <div key={`pixel_${i}_${j}`}style={style}></div>
        );
      }
      
      rows.push(
        <div key={`row_${j}`} style={rowStyle}>{cols}</div>
      );
    }
    return (
      <div style={containerStyles}>
        {rows}
      </div>
    )
  }
}

export default LEDSquaresRenderer;
