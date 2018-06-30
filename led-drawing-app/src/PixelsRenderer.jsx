/**
 *  @file       PixelsRenderer.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
import React from 'react';

import { ROWS, COLS } from './constants';

class PixelsRenderer extends React.Component {
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
    var i;

    for (i = 0; i < ROWS; i++) {
      let cols = [], j;

      for (j = 0; j < COLS; j++) {
        cols.push(
          <div key={`pixel_${i}_${j}`}style={pixelStyles}></div>
        );
      }
      
      rows.push(
        <div key={`row_${i}`} style={rowStyle}>{cols}</div>
      );
    }
    return (
      <div style={containerStyles}>
        {rows}
      </div>
    )
  }
}

export default PixelsRenderer;
