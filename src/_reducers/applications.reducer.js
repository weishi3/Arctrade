import { userConstants } from '../_constants';


let applications = JSON.parse(sessionStorage.getItem('applications'));
const initialState = applications ? { items: applications } : {};


export function applications(state = initialState, action) {
    switch (action.type) {
        case userConstants.APPLICANT_GET_APPLICATIONS_REQUEST:
            return {
                loading: true
            };
        case userConstants.APPLICANT_GET_APPLICATIONS_SUCCESS:
            return {
                items: action.applications
            };
        case userConstants.APPLICANT_GET_APPLICATIONS_FAILURE:
            return {
                error: action.error
            };
        case userConstants.WITHDRAW_APPLICATIONS_REQUEST:
            return state;
        case userConstants.WITHDRAW_APPLICATIONS_SUCCESS:
            return state;
        case userConstants.WITHDRAW_APPLICATIONS_FAILURE:
            return state;

        case userConstants.ACCEPT_APPLICATIONS_REQUEST:
            return state;
        case userConstants.ACCEPT_APPLICATIONS_SUCCESS:
            return state;
        case userConstants.ACCEPT_APPLICATIONS_FAILURE:
            return state;

        case userConstants.DECLINE_APPLICATIONS_REQUEST:
            return state;
        case userConstants.DECLINE_APPLICATIONS_SUCCESS:
            return state;
        case userConstants.DECLINE_APPLICATIONS_FAILURE:
            return state;





        case userConstants.EDIT_NOTE_REQUEST:
            return state;
        case userConstants.EDIT_NOTE_SUCCESS:
            console.log("here");
            console.log(state);
            state.items[action.indexOfApplication].note=action.note;
            console.log(state);
            return state;
        case userConstants.EDIT_NOTE_SUCCESS:
            return state;

        case userConstants.EDIT_STATUS_REQUEST:
            return state;
        case userConstants.EDIT_STATUS_SUCCESS:
            console.log("here");
            console.log(state);
            state.items[action.indexOfApplication].status=action.target_status;
            console.log(state);
            return state;
        case userConstants.EDIT_STATUS_FAILURE:
            return state;

        default:
            return state
    }
}