import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './UsersList.module.css';
import * as actionCreators from '../../store/actions/Actioncreators';
import UserCard from '../../components/usercard/User-Card';
import Paging from '../../components/paging/Paging';

class UsersList extends Component {

    componentDidMount() {
        this.props.get();
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
                        name={user.name}
                        email={user.email}
                        phone={user.phone}
                        status={user.status}
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
        change: (page) => dispatch(actionCreators.Changepage(page)),
        increase: () => dispatch(actionCreators.Increasepage),
        decrease: () => dispatch(actionCreators.Decreasepage),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);