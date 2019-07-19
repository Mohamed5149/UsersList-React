import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    onLogOut() {
        localStorage.clear();
        this.props.history.push('/Login');
    }

    render() {
        let login;
        let logout;
        let users;

        if (!localStorage.getItem('userRole')) {
            login =
                <li className="nav-item">
                    <Link className="nav-link" to="/Login">Login</Link>
                </li>;
            logout = null;
        }

        if (localStorage.getItem('userRole')) {
            users =
                <li className="nav-item">
                    <Link className="nav-link" to="/Users">Users</Link>
                </li>;
            logout =
                <li className="nav-item active">
                    <Link onClick={() => this.onLogOut()} className="nav-link" to="/Login">Logout</Link>
                </li>
        }

        let addingNewUser = localStorage.getItem('userRole') === "Admin" ?
            <li className="nav-item">
                <Link className="nav-link" to="/Adduser">Add New User</Link>
            </li> : null;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {login}
                        {users}
                        {addingNewUser}
                        {logout}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }

}


export default withRouter(Header);