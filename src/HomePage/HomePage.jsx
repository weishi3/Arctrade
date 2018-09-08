import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {alertActions, userActions} from '../_actions';

class HomePage extends React.Component {


    constructor(props) {
        super(props);

        //dispatch trigger state change!
        // userActions.getApplicationsByEmail(this.props.applicant.email_addr);
        this.props.dispatch(userActions.getApplicationsByEmail(this.props.user.email_addr));


        this.state = {
            userU: {
                email_addr: this.props.user.email_addr,
                password: this.props.user.password,
                name: this.props.user.name,
                phone_number: this.props.user.phone_number,
                education_skill: this.props.user.education_skill,
                resume_link: this.props.user.resume_link

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }


    handleChange(event) {
        const { name, value } = event.target;
        const { userU } = this.state;
        this.setState({
            userU: {
                ...userU,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { userU } = this.state;
        const { dispatch } = this.props;
        if (userU.email_addr && userU.password && userU.name && userU.phone_number&& userU.education_skill && userU.resume_link) {
            dispatch(userActions.update(userU));
        }
    }

    handleWithdraw(job_id){
        console.log(job_id);
        const { dispatch,user } = this.props;
        dispatch(userActions.withdrawApplication(job_id,user.email_addr));
    }

    handleAccept(job_id){
        console.log(job_id);
        const { dispatch,user } = this.props;
        dispatch(userActions.acceptApplication(job_id,user.email_addr));
    }

    handleDecline(job_id){
        console.log(job_id);
        const { dispatch,user } = this.props;
        dispatch(userActions.declineApplication(job_id,user.email_addr));
    }


    handleJobDetail(job) {
        console.log(job);
        const { dispatch } = this.props;
        dispatch(userActions.viewJobDetail(job));
    }

    handleJobDetail2(job_id) {

        const { dispatch,jobs} = this.props;
        let job=null;
        for (var i=0; i < jobs.items.length; i++){
            if (jobs.items[i].job_id == job_id){
                job=jobs.items[i];
                break;
            }
        }


        dispatch(userActions.viewJobDetail(job));
    }

    render() {
        console.log("render homepage");
        var styleWhiteFont={
            color:"white",
            text:"20px"
        }




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

        console.log(this.props);

        const { userU, submitted } = this.state;
        const { user,jobs,applications} = this.props;
        var activeApplications=[];
        var inactiveApplications=[];
        if (applications.items){
            activeApplications=applications.items.filter(isActive);
            inactiveApplications=applications.items.filter(isInActive);
        }
        return (
            <div >
            <nav className="navbar navbar-dark bg-dark navbar-fixed-top">


                   <a className="navbar-brand" style={styleWhiteFont} href="#">Arctrade</a>

                <Link to="/login"><button className="btn btn-outline-success my-2 my-sm-0">Logout</button> </Link>

            </nav>

                <div className="container">
                    <div className="row">
                        <div className="info">
                            <h1>{user.name}</h1>
                            <p>{user.email_addr} |{user.phone_number}</p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <ul  className="nav nav-tabs  nav-justified" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="application-tab" href="#application" data-toggle="tab" role="tab" aria-controls="application" aria-selected="true">
                                Application
                            </a>
                        </li>
                        <li  className="nav-item">
                            <a className="nav-link" id="profile-tab" href="#profile" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
                                Update Profile
                            </a>
                        </li>
                        <li  className="nav-item">
                            <a className="nav-link" id="job-tab" href="#job" data-toggle="tab" role="tab" aria-controls="job" aria-selected="false">
                                Search Job
                            </a>
                        </li>
                    </ul>

                </div>

                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="application" role="tabpanel" aria-labelledby="application-tab">
                                        {/*start*/}
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="currentApplicationHeading">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse"
                                                                data-target="#collapseOne" aria-expanded="true"
                                                                aria-controls="collapseOne">
                                                               Current Application
                                                            <span className="badge badge-primary badge-pill">{activeApplications.length}</span>
                                                        </button>
                                                    </h5>
                                                </div>
                                                {activeApplications.length>0 &&
                                                <div id="collapseOne" className="collapse show"
                                                     aria-labelledby="currentApplicationHeading" data-parent="#accordion">
                                                    <div className="row">
                                                    {activeApplications.map((application, index) =>

                                                        <div className="card col-12 col-md-6" key={application.job_id}>
                                                            <div className="card-header">
                                                                {!offered(application) && !accepted(application) &&
                                                                <button type="button"
                                                                        className="btn btn-danger"
                                                                        data-toggle="modal" data-target={"#withdrawModal"+application.job_id}>
                                                                    <b>Withdraw</b>
                                                                </button>
                                                                }

                                                                {offered(application)&&
                                                                    <span>
                                                                        <b>Congratulations!You get an offer!</b>
                                                                <button type="button"
                                                                        className="btn btn-success ml-2"
                                                                        data-toggle="modal" data-target={"#acceptModal"+application.job_id}>
                                                                    <b>Accept</b>
                                                                </button>
                                                                         <button type="button"
                                                                                 className="btn btn-danger ml-2"
                                                                                 data-toggle="modal" data-target={"#declineModal"+application.job_id}>
                                                                    <b>Decline</b>
                                                                </button>


                                                                    </span>
                                                                }

                                                                { accepted(application) &&
                                                                <b>You accepted the offer! Welcome to Arctrade, {user.name}!</b>
                                                                }
                                                                {/*modal 1*/}
                                                                <div className="modal fade" id={"withdrawModal"+application.job_id} tabIndex="-1" role="dialog"
                                                                     aria-labelledby={"withdrawModalLabel"+application.job_id} aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={"withdrawModalLabel"+application.job_id}>Withdraw this application?</h5>
                                                                                <button type="button" className="close" data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                By withdraw this application, you would no longer be considered for this position any more.
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary"
                                                                                        data-dismiss="modal">No
                                                                                </button>
                                                                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleWithdraw.bind(this, application.job_id)}> Withdraw
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*modal 2*/}
                                                                <div className="modal fade" id={"acceptModal"+application.job_id} tabIndex="-1" role="dialog"
                                                                     aria-labelledby={"acceptModalLabel"+application.job_id} aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={"acceptModalLabel"+application.job_id}>Accept this offer?</h5>
                                                                                <button type="button" className="close" data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                By accept this application, you would get hired and cannot choose to "withdraw" or "decline".
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary"
                                                                                        data-dismiss="modal">No
                                                                                </button>
                                                                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleAccept.bind(this, application.job_id)}> Accept
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*modal 3*/}
                                                                <div className="modal fade" id={"declineModal"+application.job_id} tabIndex="-1" role="dialog"
                                                                     aria-labelledby={"declineModalLabel"+application.job_id} aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={"declineModalLabel"+application.job_id}>Decline this offer?</h5>
                                                                                <button type="button" className="close" data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                By decline this application, you would no longer be considered for this position.
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary"
                                                                                        data-dismiss="modal">No
                                                                                </button>
                                                                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleDecline.bind(this, application.job_id)}> Decline
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        <div className="card-body">
                                                        <div className="card-title"> <a onClick={this.handleJobDetail2.bind(this, application.job_id)}> <h2>{application.title} (job_id:{application.job_id})</h2></a> <br></br>
                                                            You applied on {application.date_submit}</div>
                                                        <p className="card-text">
                                                            <b>Location:</b> {application.location}<br></br>
                                                            <b>Status:</b> {application.status}
                                                        </p>
                                                        </div>
                                                        </div>



                                                    )}
                                                    </div>

                                                </div>

                                                }

                                            </div>

                                            {/*second*/}
                                            <div className="card">
                                                <div className="card-header" id="pastApplicationHeading">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse"
                                                                data-target="#collapseTwo" aria-expanded="true"
                                                                aria-controls="collapseTwo">
                                                            Past Application
                                                            <span className="badge badge-primary badge-pill">{inactiveApplications.length}</span>
                                                        </button>
                                                    </h5>
                                                </div>
                                                {inactiveApplications.length>0 &&
                                                <div id="collapseTwo" className="collapse show"
                                                     aria-labelledby="pastApplicationHeading" data-parent="#accordion">
                                                    <div className="row">
                                                        {inactiveApplications.map((application, index) =>

                                                            <div className="card col-12 col-md-6" key={application.job_id}>
                                                                <div className="card-body">
                                                                    <div className="card-title"><h2>{application.title}</h2><br></br>
                                                                        id:{application.job_id}   |  <a> view job detail</a>   | You applied on {application.date_submit}</div>
                                                                    <p className="card-text">
                                                                        <b>Location:</b> {application.location}<br></br>
                                                                        <b>Status:</b> {application.status}
                                                                    </p>
                                                                </div>
                                                            </div>



                                                        )}
                                                    </div>

                                                </div>

                                                }

                                            </div>

                                        </div>






                                            {/*end*/}
                                        </div>

                                    {/*second tab*/}
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                        <div className="col-md-6 col-md-offset-3">
                                            <h2>Update Profile</h2>
                                            <form name="form" onSubmit={this.handleSubmit}>
                                                <div className={'form-group' + (submitted && !userU.email_addr ? ' has-error' : '')}>
                                                    <label htmlFor="email_addr">Email Box</label>
                                                    <input type="text" className="form-control" name="email_addr" value={userU.email_addr} onChange={this.handleChange} />
                                                    {submitted && !userU.email_addr &&
                                                    <div className="help-block">Email Address is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !userU.password ? ' has-error' : '')}>
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" name="password" value={userU.password} onChange={this.handleChange} />
                                                    {submitted && !userU.password &&
                                                    <div className="help-block">Password is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !userU.name ? ' has-error' : '')}>
                                                    <label htmlFor="name">Full Name</label>
                                                    <input type="text" className="form-control" name="name" value={userU.name} onChange={this.handleChange} />
                                                    {submitted && !userU.name &&
                                                    <div className="help-block">Full Name is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !userU.phone_number ? ' has-error' : '')}>
                                                    <label htmlFor="phone_number">Phone Number</label>
                                                    <input type="text" className="form-control" name="phone_number" value={userU.phone_number} onChange={this.handleChange} />
                                                    {submitted && !userU.phone_number &&
                                                    <div className="help-block">Phone Number is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !userU.education_skill ? ' has-error' : '')}>
                                                    <label htmlFor="education_skill">Education & Skill Description</label>
                                                    <input type="text" className="form-control" name="education_skill" value={userU.education_skill} onChange={this.handleChange} />
                                                    {submitted && !userU.education_skill &&
                                                    <div className="help-block">Description is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !userU.resume_link ? ' has-error' : '')}>
                                                    <label htmlFor="resume_link">Resume Link</label>
                                                    <input type="text" className="form-control" name="resume_link" value={userU.resume_link} onChange={this.handleChange} />
                                                    {submitted && !userU.resume_link &&
                                                    <div className="help-block">Resume is required</div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary">Update</button>
                                                </div>
                                            </form>
                                        </div>


                                    </div>

                                    {/*second tab end*/}



                                    <div className="tab-pane fade" id="job" role="tabpanel" aria-labelledby="job-tab">

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>









            </div>
        );
    }
}

function isActive(x) {
    return !isInActive(x);
}
function isInActive(x) {
    return x.status=='No longer under consideration (rejected)'||x.status=="Withdrawn"||x.status=="Offer declined";
}

function offered(x) {
    return x.status=="Offer delivered (offered)";
}

function accepted(x) {
    return x.status=="Offer accepted (hired)";
}



function mapStateToProps(state) {
    // const { applicants, authentication } = state;
    // const { applicant } = authentication;
    return {
        applications:state.applications,
        user:state.authentication.user,
        jobs:state.jobs,

        //cannot put item here.. when application ={}
        // activeApplications:state.applications.items.filter(isActive),
        // inactiveApplications:state.applications.items.filter(isInActive),

};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };