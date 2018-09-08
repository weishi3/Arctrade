import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class JobPage extends React.Component {
    constructor(props) {
        super(props);


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            coverLetter: ''

        };
    }

    handleSubmit(e) {

        e.preventDefault();


        const { coverLetter } = this.state;
        const { dispatch } = this.props;
        const { user,job} = this.props;
        console.log(coverLetter);


        dispatch(userActions.submitApplication(job.job_id,user.email_addr, coverLetter));

        // dispatch(userActions.submitApplication(job.job_id,applicant.email_addr, coverLetter));

    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }




    render() {


        var styleWhiteFont={
            color:"white",
            text:"20px"
        }
        var styleVerticalMiddle={
            verticalAlign:'middle',
            display: 'table-cell'
        }
        var styleVerticalMiddleOuter={
            height:'100px',
            display: 'table'
        }

        var styleWidthDialog={
            maxWidth:'100%',
            marginLeft:'5px',
            marginRight:'5px'

        }


        const {coverLetter} = this.state;

        const { user,job} = this.props;
        console.log(this.props);
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-fixed-top">


                    <a className="navbar-brand" style={styleWhiteFont} href="#">Arctrade</a>

                    <Link to="/login"><button className="btn btn-outline-success my-2 my-sm-0">

                        { user&&
                        <p>Sign Out</p>}
                        {!user &&

                        <p>Sign In</p>}


                    </button> </Link>

                </nav>


                <div className="container">
                    <div className="row">
                        <div className="info-wrapper col-12 col-md-7">
                            <h1>{job.title}</h1>
                            <p>Job Id:{job.job_id} </p><p> Location: {job.location} </p><p> Post Date: {job.date_post}</p>
                        </div>

                        <div className="apply-wrapper col-12 col-md-5" style={styleVerticalMiddleOuter}>
                            <div style={styleVerticalMiddle}>
                                {user &&
                                <a href="" data-toggle="modal" data-target="#modalRegisterForm" className="btn btn-primary col-9 offset-2 col-md-9 offset-md-2">Apply Now</a>
                                }
                                {!user &&
                                <a href="/login" className="btn btn-primary col-9 offset-2 col-md-9 offset-md-2">Sign In To Apply</a>
                                }

                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade col-10 offset-1" id="modalRegisterForm" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" style={styleWidthDialog} role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Submit Application</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <label data-error="wrong" data-success="right" htmlFor="coverletter">
                                        <p>You are about to apply for position: {job.title}</p>
                                        <p>Say something to impress us! (like a cover letter, or relative working experience)</p>
                                    </label>
                                    <textarea rows="15" type="text" name="coverLetter" value={coverLetter} onChange={this.handleChange} className="form-control validate"></textarea>

                                </div>


                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-secondary"  data-dismiss="modal" aria-label="Close" onClick={this.handleSubmit}>Submit Application</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-9 col-xl-10">
                            <h3>DESCRIPTION</h3>
                            <p>{job.description}</p>
                        </div>

                    </div>
                </div>



            </div>
        );
    }
}

function mapStateToProps(state) {
    const { job } = state.job;

    const { user } = state.authentication;
    // console.log(state);
    return {
        user,job
    };
}

const connectedJobPage = connect(mapStateToProps)(JobPage);
export { connectedJobPage as JobPage };