import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {alertActions, userActions} from '../_actions';

class HRPage extends React.Component {


    constructor(props) {
        super(props);

        this.props.dispatch(userActions.getAllApplications());

        this.handleChange = this.handleChange.bind(this);
        this.showActiveSwitch = this.showActiveSwitch.bind(this);
        this.jobTitleFilterChange = this.jobTitleFilterChange.bind(this);
        this.statusFilterChange = this.statusFilterChange.bind(this);


        //use state give a chance to recover using reload
        this.state = {
            note: '',
            filters: {
                activeFilter:["Application submitted (pending)",
                    "Under review (reviewing)",
                    "Phone interview (interviewing)",
                    "On site interview (interviewing)",
                    "Offer delivered (offered)",
                    "Offer accepted (hired)",
                    "No longer under consideration (rejected)",
                    "Withdrawn",
                    "Offer declined"],
                statusFilter:["Application submitted (pending)",
                    "Under review (reviewing)",
                    "Phone interview (interviewing)",
                    "On site interview (interviewing)",
                    "Offer delivered (offered)",
                    "Offer accepted (hired)",
                    "No longer under consideration (rejected)",
                    "Withdrawn",
                    "Offer declined"],
                jobTitleFilter:"",


            }


        };
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleUpdateNote(index) {
       const {applications, dispatch}=this.props;
       const {note}=this.state;
        dispatch(userActions.editNote(applications.items[index].job_id, applications.items[index].email_addr, note,index ));

    }

    handleSubmit(index){
        const {applications, dispatch}=this.props;
        console.log(target_status);
        const target_status=$("#selector"+index).val();

        dispatch(userActions.editStatus(applications.items[index].job_id, applications.items[index].email_addr, target_status, index ));

    }



    handleJobDetail(job_id) {

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


    initializeNote(note) {
        console.log(note);

       //can never change props
        //

       this.setState({
           note: note,
           filters:this.state.filters

       });

       //or
        // this.state.note=note;
        // this.forceUpdate();
    }

    showActiveSwitch(e){
        var checkBox = document.getElementById("activeSwitch");

        if (checkBox.checked == true){
            this.state.filters.activeFilter=["Application submitted (pending)",
                "Under review (reviewing)",
                "Phone interview (interviewing)",
                "On site interview (interviewing)",
                "Offer delivered (offered)",
                "Offer accepted (hired)"];
            this.forceUpdate();

        } else {
            this.state.filters.activeFilter=["Application submitted (pending)",
                        "Under review (reviewing)",
                        "Phone interview (interviewing)",
                        "On site interview (interviewing)",
                        "Offer delivered (offered)",
                        "Offer accepted (hired)", "No longer under consideration (rejected)",
                        "Withdrawn",
                        "Offer declined"];
            this.forceUpdate();


        }
    }

    jobTitleFilterChange(e){
        this.state.filters.jobTitleFilter=e.target.value;
        this.forceUpdate();

    }

    statusFilterChange(e){
        var statusFilter = document.getElementById("statusFilter");
        if (statusFilter.value=="all"){
            this.state.filters.statusFilter=["Application submitted (pending)",
                "Under review (reviewing)",
                "Phone interview (interviewing)",
                "On site interview (interviewing)",
                "Offer delivered (offered)",
                "Offer accepted (hired)",
                "No longer under consideration (rejected)",
                "Withdrawn",
                "Offer declined"];
            this.forceUpdate();
        }else{
            this.state.filters.statusFilter=[];
            this.state.filters.statusFilter.push(statusFilter.value);
            this.forceUpdate();
        }

    }

    render() {
        const styleWhiteFont={
            color:"white",
            text:"20px"
        };
        const { user,applications} = this.props;

        let {note} = this.state;
        console.log("rendering"+note);


        let displayedApplications=[];
        if (applications.items){
            displayedApplications=applications.items;
        }

        const changableStatus = new Set(["Application submitted (pending)",
            "Under review (reviewing)",
            "Phone interview (interviewing)",
            "On site interview (interviewing)",
            "Offer delivered (offered)",
            "No longer under consideration (rejected)"]);

        const targetStatus = ["Application submitted (pending)",
            "Under review (reviewing)",
            "Phone interview (interviewing)",
            "On site interview (interviewing)",
            "Offer delivered (offered)",
            "No longer under consideration (rejected)"];

        const allStatus = ["Application submitted (pending)",
            "Under review (reviewing)",
            "Phone interview (interviewing)",
            "On site interview (interviewing)",
            "Offer delivered (offered)",
            "Offer accepted (hired)",
            "No longer under consideration (rejected)",
            "Withdrawn",
            "Offer declined"];



        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-fixed-top">


                    <a className="navbar-brand" style={styleWhiteFont} href="#">Arctrade</a>

                    <Link to="/login"><button className="btn btn-outline-success my-2 my-sm-0">Logout</button> </Link>

                </nav>

                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-md-2 mt-2">
                Job title filter:<input className="mr-5 ml-2"id="jobTitleFilter" onChange={this.jobTitleFilterChange}></input>
                </div>
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-md-2 mt-2">
                Job status filter:
                <select name="statusFilter" id="statusFilter" defaultValue="all" className="mr-5" onChange={this.statusFilterChange}>
                <option value="all">no condition applied</option>
                <option value={allStatus[0]}>{allStatus[0]}</option>
                <option value={allStatus[1]}>{allStatus[1]}</option>
                <option value={allStatus[2]}>{allStatus[2]}</option>
                <option value={allStatus[3]}>{allStatus[3]}</option>
                <option value={allStatus[4]}>{allStatus[4]}</option>
                <option value={allStatus[5]}>{allStatus[5]}</option>
                <option value={allStatus[6]}>{allStatus[6]}</option>
                <option value={allStatus[7]}>{allStatus[7]}</option>
                <option value={allStatus[8]}>{allStatus[8]}</option>
                </select>
                </div>
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-md-2 mt-2">
                <input type="checkbox"  id="activeSwitch" onClick={this.showActiveSwitch}></input>show only active applications
                </div>
                <div className="container">
                    <div className="row">
                        {displayedApplications
                            .filter(application => this.state.filters.activeFilter.includes(application.status)&& application.title.replace(/ /g,'').includes(this.state.filters.jobTitleFilter.replace(/ /g,''))
                            && this.state.filters.statusFilter.includes(application.status))
                            .map((application, index) =>


                            <div className="card col-12 col-lg-6" key={application.job_id.toString()+application.email_addr}>
                                <div className="card-header">
                                    {changableStatus.has(application.status) &&

                                        <div className="form-row align-items-center">
                                            <div className="col-auto my-1">
                                                <select name="statusSelector" id={"selector"+index} defaultValue={application.status}  className="custom-select mr-sm-2">
                                                    <option value={targetStatus[0]}>{targetStatus[0]}</option>
                                                    <option value={targetStatus[1]}>{targetStatus[1]}</option>
                                                    <option value={targetStatus[2]}>{targetStatus[2]}</option>
                                                    <option value={targetStatus[3]}>{targetStatus[3]}</option>
                                                    <option value={targetStatus[4]}>{targetStatus[4]}</option>
                                                    <option value={targetStatus[5]}>{targetStatus[5]}</option>
                                                </select>
                                            </div>
                                            <div className="col-auto my-1">
                                                <button  className="btn btn-primary"  onClick={this.handleSubmit.bind(this, index)}>Submit</button>
                                            </div>
                                        </div>

                                    }
                                    {!changableStatus.has(application.status) &&
                                        <p>You may not modify its status now!</p>
                                    }
                                </div>
                                <div className="card-body">
                                    <div className="card-title"><a onClick={this.handleJobDetail.bind(this, application.job_id)}><h2>{application.title} (job_id:{application.job_id}) </h2> </a>  <br></br>
                                      {application.name}({application.email_addr}) applied on {application.date_submit}</div>
                                    <div className="card-text">
                                        <b>Location:</b> {application.location}  <b>Status:</b> {application.status}<br></br><br></br>

                                        <button className="col-5  mr-2 btn btn-primary"
                                                data-toggle="modal" data-target={"#coverletterModal"+application.job_id+application.email_addr}
                                        >View Cover Letter
                                        </button>
                                        <div className="modal fade" id={"coverletterModal"+application.job_id+application.email_addr} tabIndex="-1" role="dialog"
                                             aria-labelledby={"coverletterModalLabel"+application.job_id+application.email_addr} aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={"coverletterModalLabel"+application.job_id+application.email_addr}>Cover Letter & Statement</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>
                                                             {application.coverletter}

                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <button className="col-4 ml-2 btn btn-primary" onClick={this.initializeNote.bind(this, application.note)}
                                                data-toggle="modal" data-target={"#internalNotesModal"+application.job_id+application.email_addr}
                                        >Edit Notes
                                        </button>
                                        <div className="modal fade" id={"internalNotesModal"+application.job_id+application.email_addr} tabIndex="-1" role="dialog"
                                             aria-labelledby={"internalNotesModalLabel"+application.job_id+application.email_addr} aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={"internalNotesModalLabel"+application.job_id+application.email_addr}>Internal Notes</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>
                                                            <textarea rows="10" type="text" name="note" value={note} onChange={this.handleChange} className="form-control validate"></textarea>


                                                        </p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" onClick={this.initializeNote.bind(this, application.note)}>Reload
                                                        </button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleUpdateNote.bind(this, index)}> Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>



                        )}

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
    return x.status=='No longer under consideration (rejected)'||x.status=="Withdrawn"||x.status=="You declined our offer";
}




function mapStateToProps(state) {
    // const { applicants, authentication } = state;
    // const { applicant } = authentication;
    return {
        applications:state.applications,
        user:state.authentication.user,
        jobs:state.jobs,



};
}

const connectedHRPage = connect(mapStateToProps)(HRPage);
export { connectedHRPage as HRPage };