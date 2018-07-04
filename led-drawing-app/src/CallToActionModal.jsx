/**
 *  @file       CallToActionModal.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react';

class CallToActionModal extends React.Component {
  render () {
    let containerStyle = {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      width: '100%',
      background: 'rgba(100, 200, 100, 0.5)',
      color: 'rgb(100,200,100)',
      textAlign: 'center'
    };

    let textContainerStyle = {
      position: 'relative',
      top: '25%',
      fontWeight: 'bold',
      fontSize: '56pt'
    };

    if (!this.props.active) {
      containerStyle.display = 'none';
    } else {
      containerStyle.display = 'block';
    }

    return (
      <div style={containerStyle}>
        <div style={textContainerStyle} className="call-to-action-modal-text">
          Draw
        </div>      
      </div>
    );
  }
}

export default CallToActionModal;
