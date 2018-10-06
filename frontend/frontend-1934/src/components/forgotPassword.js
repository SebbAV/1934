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
                <form className="form-page" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <p align="right"><Link to="/" className="btn btn-default btn-xs">Close</Link></p>
                    <Field
                        label="email"
                        name="email"
                        component={this.renderField} />
                    <button type="submit" className="btn_N"> Send Recovery e-mail </button><br/>
                    
                </form>
                
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