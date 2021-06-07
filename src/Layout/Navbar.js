import React from 'react';
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Student Management</a>
                <div className=" navbar-collapse" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Homepage</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/student/add">Add Student Details</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;