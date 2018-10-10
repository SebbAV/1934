import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyCode,resetPassword } from '../actions/index';


class CodePassword extends Component {
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
    onSubmit(values) {

        this.props.verifyCode(values.code, (response) => {
            if (response.status === 200 && response.data.data != null) {
                const { email } = response.data.data;
                values["email"] = email;
                this.props.resetPassword(values, () => {
                    this.props.history.push('/');
                })
            }
        })
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <form className="form-page" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <p align="right"><Link to="/" className="btn btn-default btn-xs">Close</Link></p>
                    <Field
                        label="Recieved code"
                        name="code"
                        component={this.renderField} />
                    <Field
                        label="Password"
                        name="password"
                        component={this.renderField} />
                    <Field
                        label="Verify Password"
                        name="confirm-password"
                        component={this.renderField} />
                    <button type="submit" className="btn_N"> Verify Code </button><br/>
                   
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
    form: "VerifyCode"
})(connect(null, { verifyCode,resetPassword })(CodePassword));