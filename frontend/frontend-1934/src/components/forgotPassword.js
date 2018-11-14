import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/index';
import { Button, Panel, ButtonGroup } from 'react-bootstrap'


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
    signUp() {
        this.props.history.push('');
    }
    onSubmit(values) {
        this.props.forgotPassword(values, () => {
            this.props.history.push('/verifyCode');
        })
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <Panel className="panel_full" >
                    <form className="form-page" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <p align="left"><Link to="/" className="btn btn-default btn-xs">X</Link></p>
                        <Field
                            label="E-mail"
                            name="email"
                            component={this.renderField} />
                        <button type="submit" className="btn_N"> Send Recovery e-mail </button><br />

                    </form>
                </Panel>

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
})(connect(null, { forgotPassword })(ForgotPassword));