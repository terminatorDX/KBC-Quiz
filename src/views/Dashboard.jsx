import React, { Component } from "react";

import { NavLink } from "react-router-dom";
export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavLink to="/user/quiz" className="nav-link px-3">
                    <h1 className="text-dark text-center mt-5 mx-auto py-5 bg-light">
                        Start the Quiz
                    </h1>
                </NavLink>
            </div>
        );
    }
}
