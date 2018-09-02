import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Register extends Component {
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
    render() {
        return (
            <form>
                <Field
                    label="Username"
                    name="username"
                    component={this.renderField} />
                <Field
                    label="email"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="Password"
                    name="password"
                    component={this.passwordfield} />
                <Field
                    label="Confirm password"
                    name="pwd-confirm"
                    component={this.passwordfield} />
                <button type="submit" className="btn btn-primary"> Sign up </button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

            </form>
        )
    }
}
function validate(values) {
    const errors = {};

    return errors;
}


export default reduxForm({
    validate,
    form: "RegisterForm"
})(Register);