import { authHeader, config } from '../_helpers';

export const userService = {
    login,
    loginAsHR,
    update,
    logout,
    register,
    getApplicationsByEmail,
    getAllApplications,
    submitApplication,
    getAll,
    getById,
    getAllJobs,
    withdrawApplication,
    acceptApplication,
    declineApplication,
    editNote,
    editStatus
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/users/authenticate/'+username+'/'+password, requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log(user.token);
            }

            return user;
        });
}



function loginAsHR(username, password) {
    const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/users/authenticateHR/'+username+'/'+password, requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log(user.token);
            }

            return user;
        });
}


function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/users/update', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log(user.token);
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('applications');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users', requestOptions).then(handleResponse, handleError);
}


function getAllJobs() {
    const requestOptions = {
        method: 'GET',

    };

    return fetch(config.apiUrl + '/jobs', requestOptions).then(handleResponse, handleError)
        .then(jobs => {
            // login successful if there's a jwt token in the response
            if (jobs) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('jobs', JSON.stringify(jobs));
            }

            return jobs;
        });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/users/register', requestOptions).then(handleResponse, handleError);
}


function getApplicationsByEmail(email_addr) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(config.apiUrl+ '/applications/'+email_addr, requestOptions).then(handleResponse, handleError)
        .then(applications => {
            // login successful if there's a jwt token in the response
            if (applications) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('applications', JSON.stringify(applications));
            }

            return applications;
        });
}

function getAllApplications() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(config.apiUrl + '/applications', requestOptions).then(handleResponse, handleError)
        .then(applications => {
            // login successful if there's a jwt token in the response
            if (applications) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('applications', JSON.stringify(applications));
            }

            return applications;
        });
}

function submitApplication(job_id,email_addr,cover_letter) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,
            cover_letter:cover_letter

        })
    };

    return fetch(config.apiUrl + '/applications/submitapplication', requestOptions).then(handleResponse, handleError);
}



function withdrawApplication(job_id,email_addr) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,

        })
    };

    return fetch(config.apiUrl + '/applications/withdrawapplication', requestOptions).then(handleResponse, handleError);
}
function acceptApplication(job_id,email_addr) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,

        })
    };

    return fetch(config.apiUrl + '/applications/acceptapplication', requestOptions).then(handleResponse, handleError);
}

function declineApplication(job_id,email_addr) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,

        })
    };

    return fetch(config.apiUrl + '/applications/declineapplication', requestOptions).then(handleResponse, handleError);
}


function editNote(job_id,email_addr,note) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,
            note:note

        })
    };

    return fetch(config.apiUrl + '/applications/editnote', requestOptions).then(handleResponse, handleError);
}


function editStatus(job_id,email_addr,target_status) {
    console.log(job_id);
    console.log(email_addr);
    console.log(target_status);
    console.log("endprint");


    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({
            job_id:job_id,
            email_addr: email_addr,
            target_status:target_status

        })
    };

    return fetch(config.apiUrl + '/applications/editstatus', requestOptions).then(handleResponse, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}