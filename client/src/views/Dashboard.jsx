import React, { Component } from "react";
import "./Dashboard.css";
import Form from "../cards/Form";
import "typeface-roboto";
import Quiz from "../views/Quiz";
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            isLoggedin: false,
            token: ""
        };
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onAdminChange = this.onAdminChange.bind(this);
        this.onTokenChange = this.onTokenChange.bind(this);
    }
    onLoginChange(event) {
        this.setState(state => ({
            isLoggedin: event
        }));
    }
    onTokenChange(event) {
        this.setState(state => ({
            token: event
        }));
    }
    onAdminChange(e) {
        this.setState({ isTeacher: e });
    }
    render() {
        return (
            <div className="outline">
                <div className="row">
                    <div className="col-3">
                        <Form
                            isAdmin={this.state.isAdmin}
                            isLoggedin={this.state.isLoggedin}
                            onLoginChange={this.onLoginChange}
                            onTokenChange={this.onTokenChange}
                        />
                    </div>
                    <div className="col-9">
                        <header id="home-section">
                            <div className="dark-overlay">
                                {this.state.isLoggedin ? (
                                    <Quiz token={this.state.token} />
                                ) : (
                                    <div className="px-3">
                                        <h4 className="text-dark text-center mt-5 mx-auto py-5">
                                            Please Login to Start the quiz
                                        </h4>
                                    </div>
                                )}
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        );
    }
}
