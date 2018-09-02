import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
    render() {
        return (
            <div>
                <form>
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
})(ForgotPassword);