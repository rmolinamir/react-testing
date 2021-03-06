import { actionTypes } from "actions";

/**
 * @function giveUpReducer
 * @param {boolean} state - Boolean of the success value.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - New success rate.
 */
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.GIVE_UP:
      return true;
    case actionTypes.NEW_WORD:
      return false;
    default:
      return state;
  }
}
