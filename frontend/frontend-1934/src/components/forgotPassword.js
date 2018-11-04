import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {forgotPassword} from '../actions/index';


class ForgotPassword extends Component {
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
    signUp(){
        this.props.history.push('');
    }
    onSubmit(values){
        this.props.forgotPassword(values,() =>{
            this.props.history.push('/verifyCode');
        })
    }
    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="email"
                        name="email"
                        component={this.renderField} />
                    <button type="submit" className="btn btn-primary"> Send Recovery e-mail </button>
                </form>
                <Link to="/" className="btn btn-danger">Cancel</Link>
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
    form: "ForgotPasswordForm"
})(connect(null,{forgotPassword})(ForgotPassword));