import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Notification } from 'element-react';
import * as actionCreators from '../../store/actions/Actioncreators';
import validate from '../../utilities/Validation';
import classes from './Add-EditUser.module.css';

class AddUser extends Component {
    state = {
        formData: {
            name: {
                value: '',
                isValid: false,
                isTouched: false
            },
            email: {
                value: '',
                isValid: false,
                isTouched: false
            },
            phone: {
                value: '',
                isValid: false,
                isTouched: false
            },
            status: {
                value: '',
                isValid: false,
                isTouched: false
            },
            role: {
                value: '',
                isValid: false,
                isTouched: false
            }
        },
        isValid: false
    }

    componentDidMount() {
        let userId = this.props.match.params.id;
        if (userId) {
            let usersCopy = [...this.props.users];
            let userIndex = usersCopy.findIndex(user => user.id == userId);
            let userDetails = { ...usersCopy[userIndex] };

            for (let key in userDetails) {
                userDetails[key] = {
                    value: userDetails[key],
                    isValid: true,
                    isTouched: false
                }
            }
            this.setState({
                formData: userDetails
            })
        }
    }

    open() {
        Notification({
            title: 'Done!',
            message: 'Saved Successfully',
            type: 'success',
            duration: 1500
        });
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

    onSaveHandler() {
        let user = {};
        user.name = this.state.formData.name.value;
        user.email = this.state.formData.email.value;
        user.phone = this.state.formData.phone.value;
        user.status = this.state.formData.status.value;
        user.role = this.state.formData.role.value;

        let userId = this.props.match.params.id;
        if (!userId) {
            this.props.save(user);
        }
        else {
            user.id = userId;
            this.props.edit(user);
        }
        this.props.history.push(`/Users`);
    }

    render() {
        let emailErrorMessage;
        let nameErrorMessage;
        let phoneErrorMessage;

        if (this.state.formData.email.isValid === false && this.state.formData.email.isTouched === true) { emailErrorMessage = <span className={classes.error}>Wrong Data</span> }
        if (this.state.formData.name.isValid === false && this.state.formData.name.isTouched === true) { nameErrorMessage = <span className={classes.error}>Required</span> }
        if (this.state.formData.phone.isValid === false && this.state.formData.phone.isTouched === true) { phoneErrorMessage = <span className={classes.error}>Required</span> }

        let enableFormButton;
        if (this.state.formData.email.isValid && this.state.formData.name.isValid && this.state.formData.phone.isValid &&
            this.state.formData.status.isValid && this.state.formData.role.isValid) {
            enableFormButton = true;
        }

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
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Name</label>
                    <input value={this.state.formData.name.value} onChange={(e) => { this.onChangeHandler("name", e.target.value) }} type="text" className="form-control" id="inputAddress2" placeholder="Name" />
                    {nameErrorMessage}
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Phone No</label>
                    <input value={this.state.formData.phone.value} onChange={(e) => { this.onChangeHandler("phone", e.target.value) }} type="number" className="form-control" id="inputAddress" placeholder="Phone No" />
                    {phoneErrorMessage}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">Status</label>
                    <select value={this.state.formData.status.value} onChange={(e) => { this.onChangeHandler("status", e.target.value) }} id="inputState" className="form-control">
                        <option>Choose...</option>
                        <option>Active</option>
                        <option>Soft_Deleted</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">Role</label>
                    <select value={this.state.formData.role.value} onChange={(e) => { this.onChangeHandler("role", e.target.value) }} id="inputState" className="form-control">
                        <option>Choose...</option>
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                </div>
                <Button plain={true} type="success" disabled={!enableFormButton}
                    onClick={
                        (e) => {
                            e.preventDefault();
                            this.onSaveHandler();
                            this.open()
                        }
                    }>Save</Button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (user) => dispatch(actionCreators.saveUser(user)),
        edit: (user) => dispatch(actionCreators.editUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);