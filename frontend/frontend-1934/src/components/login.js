import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser} from '../actions/index';


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
    onSubmit(values){
        this.props.loginUser(values,() =>{
            this.props.history.push('/');
        })
    }
    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Username"
                        name="email"
                        component={this.renderField} />
                    <Field
                        label="Password"
                        name="password"
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
})(connect(null,{loginUser})(Login));