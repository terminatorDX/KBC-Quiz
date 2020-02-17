import React, { Component } from "react";
import "./Form.css";
import logo from "../images/logo.svg";

export class Form extends Component {
    state = {
        username: "",
        password: ""
    };
    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            alert("Please fill out the form");
            return;
        }

        this.props.onLoginChange(true);
        // Post request to backend
        fetch(`https://localhost:4000/app/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("this route was successfull");
                    this.setState({
                        username: "",
                        password: ""
                    });
                } else {
                    console.log("this route did not go through");
                }
            });
    };
    render() {
        return (
            <header id="home-section">
                <div className="dark-overlay">
                    <div className=" text-center py-5 mx-auto my-5">
                        <img
                            src={logo}
                            alt="logo"
                            className="img card-image py-5"
                        />
                        <h1 className=" text-capitalize text-white">Sign Up</h1>
                        <p className="lead py-3 text-white">
                            Please fill out this form to register
                        </p>
                        <form
                            className="container px-5"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-group my-5">
                                <input
                                    value={this.state.username}
                                    onChange={this.handleChange("username")}
                                    type="text"
                                    className="from-control form-control-lg"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="form-group my-5">
                                <input
                                    value={this.state.password}
                                    onChange={this.handleChange("password")}
                                    type="password"
                                    className="from-control form-control-lg"
                                    placeholder="password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success btn-block btn-outline py-3"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}

export default Form;
