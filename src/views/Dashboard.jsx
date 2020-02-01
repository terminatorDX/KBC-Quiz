import React, { Component } from "react";

import { NavLink } from "react-router-dom";
export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavLink to="/admin/quiz" className="nav-link px-3">
                    Start the Quiz
                </NavLink>
            </div>
        );
    }
}
