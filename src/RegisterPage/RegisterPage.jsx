import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        //
        // public string EMAIL_ADDR { get; set; }
        // public string NAME { get; set; }
        // public string PHONE_NUMBER { get; set; }
        // public string EDUCATION_SKILL { get; set; }
        // public string RESUME_LINK { get; set; }
        // public string PASSWORD { get; set; }

        this.state = {
            user: {
                email_addr: '',
                password: '',
                name: '',
                phone_number: '',
                education_skill: '',
                resume_link: ''

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.email_addr && user.password && user.name && user.phone_number&& user.education_skill && user.resume_link) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.email_addr ? ' has-error' : '')}>
                        <label htmlFor="email_addr">Email Box</label>
                        <input type="text" className="form-control" name="email_addr" value={user.email_addr} onChange={this.handleChange} />
                        {submitted && !user.email_addr &&
                            <div className="help-block">Email Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                        {submitted && !user.name &&
                        <div className="help-block">Full Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.phone_number ? ' has-error' : '')}>
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="text" className="form-control" name="phone_number" value={user.phone_number} onChange={this.handleChange} />
                        {submitted && !user.phone_number &&
                        <div className="help-block">Phone Number is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.education_skill ? ' has-error' : '')}>
                        <label htmlFor="education_skill">Education & Skill Description</label>
                        <input type="text" className="form-control" name="education_skill" value={user.education_skill} onChange={this.handleChange} />
                        {submitted && !user.education_skill &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.resume_link ? ' has-error' : '')}>
                        <label htmlFor="resume_link">Resume Link</label>
                        <input type="text" className="form-control" name="resume_link" value={user.resume_link} onChange={this.handleChange} />
                        {submitted && !user.resume_link &&
                            <div className="help-block">Resume is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };