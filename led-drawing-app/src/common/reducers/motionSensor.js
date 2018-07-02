import * as actionTypes from '../actionTypes';

export default function motionSensor (state = 0, action) {
  switch (action.type) {
    case actionTypes.MOTION_SENSOR_CHANGED:
      return action.payload.pinValue;
    default:
      return state;
  }
}
