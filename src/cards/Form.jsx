import React, { useState } from "react";
import "./Form.css";
import logo from "../images/logo.svg";
const Forms = () => {
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const [isVerified, Verify] = useState(false);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!values.username || !values.password) {
            alert("Please fill out the form");
            return;
        }
        // Post request to backend
        fetch(`https://localhost:4000/app/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("this route was successfull");
                    setValues({
                        ...values,
                        password: "",
                        username: ""
                    });
                } else {
                    console.log("this route did not go through");
                }
            });
    };
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
                    <form className="container px-5" onSubmit={handleSubmit}>
                        <div className="form-group my-5">
                            <input
                                value={values.username}
                                onChange={handleChange("username")}
                                type="text"
                                className="from-control form-control-lg"
                                placeholder="Username"
                            />
                        </div>
                        <div className="form-group my-5">
                            <input
                                value={values.password}
                                onChange={handleChange("password")}
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
};

export default Forms;
