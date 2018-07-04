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
      background: 'rgba(242, 176, 53, 0.1)',
      color: 'rgb(242, 113, 39)',
      textAlign: 'center',
      transition: 'opacity 1s ease'
    };

    let textContainerStyle = {
      position: 'relative',
      top: '25%',
      fontWeight: 'bold',
      fontSize: '56pt'
    };

    if (!this.props.active) {
      containerStyle.opacity = 0.0;
    } else {
      containerStyle.opacity = 1.0;
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
