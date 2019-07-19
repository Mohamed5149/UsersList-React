import React, { Component } from 'react';
import { connect } from 'react-redux';
import validate from '../../utilities/Validation';
import { Button, Notification } from 'element-react';


import * as classes from './LoginForm.module.css';


class LoginForm extends Component {

    state = {
        formData: {
            email: {
                value: '',
                isValid: '',
                isTouched: ''
            },
            password: {
                value: '',
                isValid: '',
                isTouched: ''
            }
        },
        isValid: false
    }

    onChangeHandler = (id, value) => {
        //copying the state
        const obj = {};
        for (let key in this.state.formData) {
            obj[key] = { ...this.state.formData[key] };
        };
        obj[id].value = value;
        obj[id].isValid = validate(id, value);
        obj[id].isTouched = true;
        this.setState({ formData: { ...obj } })
    }

    open(name) {
        Notification({
            title: 'Success',
            message: `Welcome ${name}`,
            type: 'success',
            duration: 1500
        });
    }

    failure() {
        Notification.error({
            title: 'Error',
            message: `Invalid Credentials !`,
            duration: 1500
        });
    }

    onLoginHandler() {
        let userEmail = this.state.formData.email.value;
        let usersCopy = [...this.props.users];
        let userIndex = usersCopy.findIndex(user => user.email === userEmail);
        if (userIndex !== -1) {
            let userDetails = { ...usersCopy[userIndex] };
            if (userDetails.password === this.state.formData.password.value) {
                localStorage.setItem('userId', userDetails.id);
                localStorage.setItem('userRole', userDetails.role);
                this.open(userDetails.name);
                this.props.history.push('/Users');
            }
            else {
                this.failure();
            }
        }
        else {
            this.failure();
        }
    }

    render() {
        let emailErrorMessage;
        let passwordErrorMessage;

        let enableFormButton;
        if (this.state.formData.email.isValid && this.state.formData.password.isValid) {
            enableFormButton = true;
        }

        if (this.state.formData.email.isValid === false && this.state.formData.email.isTouched === true) { emailErrorMessage = <span className={classes.error}>Wrong Data</span> }
        if (this.state.formData.password.isValid === false && this.state.formData.password.isTouched === true) { passwordErrorMessage = <span className={classes.error}>Required</span> }

        return (
            <form style={{ width: "80%", margin: "5rem" }}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input value={this.state.formData.email.value} onChange={(e) => { this.onChangeHandler("email", e.target.value) }} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        {emailErrorMessage}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <input value={this.state.formData.password.value} onChange={(e) => { this.onChangeHandler("password", e.target.value) }} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        {passwordErrorMessage}
                    </div>
                </div>
                <Button onClick={() => { this.onLoginHandler() }} plain={true} type="success" disabled={!enableFormButton}>Login</Button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps, null)(LoginForm);