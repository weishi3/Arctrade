import { userConstants } from '../_constants';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
          user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
          user: action.user
      };
      case userConstants.APPLICANT_UPDATE_REQUEST:
          return state;
      case userConstants.APPLICANT_UPDATE_SUCCESS:
          return {
              loggedIn: true,
              user: action.user
          };
      case userConstants.APPLICANT_UPDATE_FAILURE:
          return state;
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}