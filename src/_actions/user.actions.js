import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    loginAsHR,
    logout,
    register,
    update,
    getApplicationsByEmail,
    getAllApplications,
    submitApplication,
    getAll,
    getAllJobs,
    viewJobDetail,
    withdrawApplication,
    acceptApplication,
    declineApplication,
    editNote,
    editStatus

};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function loginAsHR(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.loginAsHR(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/HRPage');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request());

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.APPLICANT_UPDATE_REQUEST } }
    function success(user) { return { type: userConstants.APPLICANT_UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.APPLICANT_UPDATE_FAILURE, error } }
}


function getApplicationsByEmail(email_addr) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.getApplicationsByEmail(email_addr)
            .then(
                applications => {
                    dispatch(success(applications));
                    dispatch(alertActions.success('Get Your Applications successful'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.APPLICANT_GET_APPLICATIONS_REQUEST } }
    function success(applications) { return { type: userConstants.APPLICANT_GET_APPLICATIONS_SUCCESS,applications } }
    function failure(error) { return { type: userConstants.APPLICANT_GET_APPLICATIONS_FAILURE, error } }
}

function getAllApplications() {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.getAllApplications()
            .then(
                applications => {
                    dispatch(success(applications));
                    dispatch(alertActions.success('Get Applications successful'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.APPLICANT_GET_APPLICATIONS_REQUEST } }
    function success(applications) { return { type: userConstants.APPLICANT_GET_APPLICATIONS_SUCCESS,applications } }
    function failure(error) { return { type: userConstants.APPLICANT_GET_APPLICATIONS_FAILURE, error } }
}


function submitApplication(job_id,email_addr,cover_letter) {
    return dispatch => {
        dispatch(request());

        userService.submitApplication(job_id,email_addr,cover_letter)
            .then(
                () => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Submit successful'));


                },
                error => {
                    dispatch(failure(error));
                    history.push('/');
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.SUBMIT_APPLICATION_REQUEST } }
    function success() { return { type: userConstants.SUBMIT_APPLICATION_SUCCESS } }
    function failure(error) { return { type: userConstants.SUBMIT_APPLICATION_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
        // userService.getById('weishi3@illinois.edu')
            .then(
                applicants => dispatch(success(applicants)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(applicants) { return { type: userConstants.GETALL_SUCCESS, applicants } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllJobs() {
    return dispatch => {
        dispatch(request());

        userService.getAllJobs()
        // userService.getById('weishi3@illinois.edu')
            .then(
                jobs => dispatch(success(jobs)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.JOB_GETALL_REQUEST } }
    function success(jobs) { return { type: userConstants.JOB_GETALL_SUCCESS, jobs } }
    function failure(error) { return { type: userConstants.JOB_GETALL_FAILURE, error } }
}

function viewJobDetail(job) {
    return dispatch => {
       dispatch(success(job));
        sessionStorage.setItem('job', JSON.stringify(job));
        history.push('/jobPage');

    };


    function success(job) { return { type: userConstants.JOB_VIEW_DETAIL_SUCCESS, job } }

}



function withdrawApplication(job_id,email_addr) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.withdrawApplication(job_id,email_addr)
            .then(
                () => {
                    dispatch(success());//useless
                    dispatch(alertActions.success('Withdraw Your Application successful'));
                    dispatch(getApplicationsByEmail(email_addr));

                },
                error => {
                    dispatch(failure(error));//useless
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.WITHDRAW_APPLICATIONS_REQUEST } }
    function success() { return { type: userConstants.WITHDRAW_APPLICATIONS_SUCCESS} }
    function failure(error) { return { type: userConstants.WITHDRAW_APPLICATIONS_FAILURE, error } }
}




function acceptApplication(job_id,email_addr) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.acceptApplication(job_id,email_addr)
            .then(
                () => {
                    dispatch(success());//useless
                    dispatch(alertActions.success('Accept Your Application successful'));
                    dispatch(getApplicationsByEmail(email_addr));

                },
                error => {
                    dispatch(failure(error));//useless
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.ACCEPT_APPLICATIONS_REQUEST } }
    function success() { return { type: userConstants.ACCEPT_APPLICATIONS_SUCCESS} }
    function failure(error) { return { type: userConstants.ACCEPT_APPLICATIONS_FAILURE, error } }
}





function declineApplication(job_id,email_addr) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.declineApplication(job_id,email_addr)
            .then(
                () => {
                    dispatch(success());//useless
                    dispatch(alertActions.success('Decline Your Application successful'));
                    dispatch(getApplicationsByEmail(email_addr));

                },
                error => {
                    dispatch(failure(error));//useless
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.DECLINE_APPLICATIONS_REQUEST } }
    function success() { return { type: userConstants.DECLINE_APPLICATIONS_SUCCESS} }
    function failure(error) { return { type: userConstants.DECLINE_APPLICATIONS_FAILURE, error } }
}

function editNote(job_id,email_addr,note,indexOfApplication) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.editNote(job_id,email_addr,note)
            .then(
                () => {
                    dispatch(success(note,indexOfApplication));//useless
                    dispatch(alertActions.success('Update Internal Note Successful'));
                    // dispatch(getApplicationsByEmail(email_addr));

                },
                error => {
                    dispatch(failure(error));//useless
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.EDIT_NOTE_REQUEST } }
    function success(note,indexOfApplication) { return { type: userConstants.EDIT_NOTE_SUCCESS,note,indexOfApplication} }
    function failure(error) { return { type: userConstants.EDIT_NOTE_FAILURE, error } }
}


function editStatus(job_id,email_addr,target_status,indexOfApplication) {
    // console.log("functioncalled");
    return dispatch => {
        dispatch(request());

        userService.editStatus(job_id,email_addr,target_status)
            .then(
                () => {
                    dispatch(success(target_status,indexOfApplication));//useless
                    dispatch(alertActions.success('Update Status Successful'));
                    // dispatch(getApplicationsByEmail(email_addr));

                },
                error => {
                    dispatch(failure(error));//useless
                    dispatch(alertActions.error(error));

                }
            );
    };

    function request() { return { type: userConstants.EDIT_STATUS_REQUEST } }
    function success(target_status,indexOfApplication) { return { type: userConstants.EDIT_STATUS_SUCCESS,target_status,indexOfApplication} }
    function failure(error) { return { type: userConstants.EDIT_STATUS_FAILURE, error } }
}