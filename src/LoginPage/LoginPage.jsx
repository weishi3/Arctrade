import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());
        this.props.dispatch(userActions.getAllJobs());


        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleHR = this.handleHR.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleJobDetail(job) {
        console.log(job);
        const { dispatch } = this.props;
        dispatch(userActions.viewJobDetail(job));
    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleHR(e){
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.loginAsHR(username, password));
        }

    }



    render() {
        var styleDivF={
            position:'relative',
            margin:'0 auto',
            width:'95%',
            border:'5px solid gray',
            background:'#eeeeee'
        };
        var styleWhole={
            margin:'0 auto',
            width:'95%',

        };



        var styleDivT = {
            width:'100%',
            whiteSpace:'nowrap',
            overflow:'auto'
        };
        var styleTable = {
            fontSize: '13px'
        };
        var styleTd = {
            verticalAlign: 'middle'
        };

        const { loggingIn,jobs} = this.props;
        // console.log(this.props);
        const { username, password, submitted } = this.state;
        return (
            <div style={styleWhole}>
                <div style={styleDivF}>
                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                        <button className="btn btn-primary" onClick={this.handleHR}>Login as HR</button>
                    </div>
                </form>
                </div>
                {/*<h3>All registered applicants:</h3>*/}
                {jobs.loading && <em>Loading jobs...</em>}
                {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
                {jobs.items &&

                <div style={styleDivT}>
                    <table className="table table-hover" style={styleTable}>
                        <thead>
                        <tr>
                            <th>Job_Id</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Date Posted</th>

                        </tr>
                        </thead>
                        <tbody>
                        {jobs.items.map((job, index) =>

                            <tr key={job.job_id}>
                            <td style={styleTd}>
                            <span>{job.job_id}</span>

                            </td>
                            <td style={styleTd}>
                                <span>{job.title}</span>

                            </td>
                            <td style={styleTd}>
                                <span>{job.location}</span>
                            </td>
                            <td style={styleTd}>
                                <span>{job.date_post}</span>
                            </td>
                                <td style={styleTd}>
                                    <button onClick={this.handleJobDetail.bind(this, job)}>Detail-></button>
                                </td>
                            </tr>
                        )}


                        </tbody>
                    </table>
                </div>


                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { jobs } = state;
    // const { loggingIn } = state.authentication;
    //bool cannot be passed
    return {
        jobs
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 