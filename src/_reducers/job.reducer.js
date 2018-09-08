import { userConstants } from '../_constants';




let job = JSON.parse(sessionStorage.getItem('job'));
const initialState = job ? { job: job } : {};


export function job(state = initialState, action) {
    switch (action.type) {
        case userConstants.JOB_VIEW_DETAIL_SUCCESS:
            return {
                job: action.job
            };
        default:
            return state
    }
}