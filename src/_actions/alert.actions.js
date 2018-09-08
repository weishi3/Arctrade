import {alertConstants, userConstants} from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    // refresh
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
//
// function refresh() {
//    return { type: alertConstants.REFRESH};
//
// }