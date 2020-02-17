import React, { Component } from "react";
import "./Dashboard.css";
import Form from "../cards/Form";
import "typeface-roboto";

import { NavLink } from "react-router-dom";
export default class Dashboard extends Component {
    render() {
        return (
            <div className="outline">
                <div className="row">
                    <div className="col-3">
                        <Form />
                    </div>
                    <div className="col-9">
                        <header id="home-section">
                            <div className="dark-overlay">
                                <NavLink
                                    to="/user/quiz"
                                    className="nav-link px-3"
                                >
                                    <h4 className="text-dark text-center mt-5 mx-auto py-5">
                                        Please Login to Start the quiz
                                    </h4>
                                </NavLink>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        );
    }
}
