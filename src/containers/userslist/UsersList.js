import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MessageBox, Message } from 'element-react';
import classes from './UsersList.module.css';
import * as actionCreators from '../../store/actions/Actioncreators';
import UserCard from '../../components/usercard/User-Card';
import Paging from '../../components/paging/Paging';

class UsersList extends Component {
    state = {
        role: ''
    }

    componentDidMount() {
        const role = localStorage.getItem('userRole');
        this.setState({role:role})
        this.props.get();
    }

    onEditHandler(id) {
        this.props.history.push(`/Edituser/${id}`);
    }

    onDeleteHandler(id) {
        MessageBox.confirm('This user will be permanently deleted. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            this.props.delete(id);
            Message({
                type: 'success',
                message: 'Delete completed!',
                duration: 1500
            });
        }).catch(() => {
            Message({
                type: 'info',
                message: 'Delete canceled',
                duration: 1500
            });
        });
    }

    render() {
        const indexOfLastUser = this.props.currentPage * this.props.usersPerPage;
        const indexOfFirstUser = indexOfLastUser - this.props.usersPerPage;
        const currentUsers = this.props.users.slice(indexOfFirstUser, indexOfLastUser);

        let usersList;
        usersList = currentUsers.map((user) => {
            return (
                <div key={user.id}>
                    <UserCard
                        userRole={this.state.role}
                        name={user.name}
                        email={user.email}
                        password={user.password}
                        phone={user.phone}
                        status={user.status}
                        role={user.role}
                        edit={() => this.onEditHandler(user.id)}
                        delete={() => this.onDeleteHandler(user.id)}
                    ></UserCard>
                </div>
            )
        })
        return (
            <div>
                {usersList}
                <div className={classes.paging}>
                    <div className="paging__arrow">
                        <i onClick={() => this.props.decrease()} className="fas fa-angle-left"></i>
                    </div>
                    <Paging
                        clicked={(event) => { this.props.change(Number(event.target.textContent)) }}>
                    </Paging>
                    <div className="paging__arrow">
                        <i onClick={() => this.props.increase()} className="fas fa-angle-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        usersPerPage: state.usersPerPage,
        currentPage: state.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: () => dispatch(actionCreators.InitUsers()),
        delete: (id) => dispatch(actionCreators.deleteUser(id)),
        change: (page) => dispatch(actionCreators.Changepage(page)),
        increase: () => dispatch(actionCreators.Increasepage),
        decrease: () => dispatch(actionCreators.Decreasepage),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);