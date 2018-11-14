import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';
import { Button, Panel, ButtonGroup } from 'react-bootstrap'


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
    signUp() {
        this.props.history.push('');
    }
    onSubmit(values) {
        this.props.history.push('/main');
        this.props.loginUser(values, () => {

        })
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <Panel className="panel_full" >
                        <form className="form-page" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Username"
                                name="email"
                                className="login"
                                component={this.renderField} />
                            <Field
                                label="Password"
                                className="login"
                                name="password"
                                component={this.passwordfield} />
                            <button type="submit" className="btn_N"> Login </button><br />
                            <p align="center"><Link to="/forgot_password"> Forgot Password? Click here </Link></p>
                            <p align="center"><Link to="/register">Not registered? Sign up </Link></p>
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
    form: "LoginForm"
})(connect(null, { loginUser })(Login));