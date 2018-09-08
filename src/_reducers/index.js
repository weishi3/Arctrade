import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { applicants } from './users.reducer';
import { alert } from './alert.reducer';
import { jobs } from './jobs.reducer';
import { job } from './job.reducer';
import { applications } from './applications.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  applicants,
  alert,
    jobs,
    job,
    applications
});

export default rootReducer;