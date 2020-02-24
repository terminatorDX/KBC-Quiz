import React, { Component } from "react";
import "./Form.css";
import logo from "../images/logo.svg";
// import { LoginFetch } from "../Fetch/Post";
const route = "http://localhost:4000";

export class Form extends Component {
    state = {
        username: "",
        password: "",
        error: "",
        loginSuccess: false
    };
    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };
    handleSubmit = async e => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            alert("Please fill out the form");
            return;
        }
        this.props.onLoginChange(true);
        // const json =await LoginFetch(this.state.username, this.state.password);
        fetch(`${route}/api/account/signup`, {
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
                this.setState({
                    error: json.error,
                    loginSuccess: json.success
                });
                if (json.success) {
                    this.props.onLoginChange(true);
                    console.log("this route was : ", this.state.loginSuccess);
                } else {
                    console.log("this route did not go through");
                }
            });
        // Post request to backend
    };
    render() {
        return (
            <header id="home-section">
                <div className="dark-overlay">
                    <div className=" text-center py-2 mx-auto my-2">
                        <img
                            src={logo}
                            alt="logo"
                            className="img card-image py-5"
                        />

                        {!this.state.loginSuccess ? (
                            <div>
                                <h1 className=" text-capitalize text-white">
                                    Sign Up
                                </h1>
                                <p className="lead py-3 text-white">
                                    Please fill out this form to register
                                </p>
                                <form
                                    className="container px-5"
                                    onSubmit={this.handleSubmit}>
                                    <div className="form-group my-5">
                                        <input
                                            value={this.state.username}
                                            onChange={this.handleChange(
                                                "username"
                                            )}
                                            type="text"
                                            className="from-control form-control-lg"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="form-group my-5">
                                        <input
                                            value={this.state.password}
                                            onChange={this.handleChange(
                                                "password"
                                            )}
                                            type="password"
                                            className="from-control form-control-lg"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-block btn-outline py-3">
                                        Register
                                    </button>
                                </form>
                                <h3 className="text-center text-danger">
                                    <b> {this.state.error} </b>
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-center text-primary">
                                    <b> {this.state.username}</b> has logged in
                                </h2>
                                <h3 className="text-center text-success">
                                    <b> {this.state.error} </b>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

export default Form;
