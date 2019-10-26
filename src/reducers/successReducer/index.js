import { actionTypes } from "actions";

/**
 * @function successReducer
 * @param {boolean} state - Boolean of the success value.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - New success rate.
 */
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    default:
      return state;
  }
}
