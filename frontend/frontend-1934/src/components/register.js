import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser} from '../actions/index';


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
    onSubmit(values){
        this.props.registerUser(values,() =>{
            this.props.history.push('/');
        })
    }
    render() {
        const {handleSubmit} = this.props
        return (
            <form className="form-page" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <p align="right"><Link to="/" className="btn btn-default btn-xs">Close</Link></p>
                <Field
                    label="Username"
                    name="nick"
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
                <button type="submit" className="btn_N"> Sign up </button>

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
})(connect(null,{registerUser})(Register));