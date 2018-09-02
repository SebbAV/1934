import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Login extends Component {
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            </div>
        )
    }
    passwordfield(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="password"
                    {...field.input}
                />
            </div>
        )
    }
    signUp(){
        this.props.history.push('');
    }
    render() {
        return (
            <div>
                <form>
                    <Field
                        label="Username"
                        name="Username"
                        component={this.renderField} />
                    <Field
                        label="Password"
                        name="Password"
                        component={this.passwordfield} />
                    <button type="submit" className="btn btn-primary"> Login </button>
                </form>
                <Link to="/register" className="btn btn-primary"> Sign up </Link>
                <Link to="/forgot_password"> Forgot Password? Click here </Link>
            </div>
        )
    }
}
function validate(values) {
    const errors = {};

    return errors;
}


export default reduxForm({
    validate,
    form: "LoginForm"
})(Login);