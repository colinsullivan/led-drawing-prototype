/**
 *  @file       MovementDetectorController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import bonescript from 'bonescript';

import { MOTION_SENSOR_CHANGED } from '../common/actionTypes';

const b = bonescript;
const DISTANCE_INPUT_PIN = 'P8_7';
const READ_INTERVAL_MS = 200;

class MovementDetectorController {
  constructor(store) {
    this.store = store;


    b.pinMode(DISTANCE_INPUT_PIN, b.INPUT);

    this.onPinRead = this.handlePinRead.bind(this);
    this.readInterval = setInterval(() => {
      b.digitalRead(DISTANCE_INPUT_PIN, this.onPinRead);
    }, READ_INTERVAL_MS);

  }

  handlePinRead (pin) {
    let state = this.store.getState();

    if (state.motionSensor !== pin.value) {
      this.store.dispatch({
        type: MOTION_SENSOR_CHANGED,
        payload: {
          pinValue: pin.value
        }
      });
    }
    
  }

}

export default MovementDetectorController;
