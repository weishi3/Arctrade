import { userConstants } from '../_constants';


let jobs = JSON.parse(sessionStorage.getItem('jobs'));
const initialState = jobs ? { items: jobs } : {};


export function jobs(state = initialState, action) {
    switch (action.type) {
        case userConstants.JOB_GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.JOB_GETALL_SUCCESS:
            return {
                items: action.jobs
            };
        case userConstants.JOB_GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}