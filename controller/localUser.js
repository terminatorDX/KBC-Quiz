// localhost:4000/api/account/<Route>
const Router = require("express").Router(),
    User = require("../models/User");
// UserSession = require("../models/UserSession");
// bcrypt = require("bcrypt"),
// salt = bcrypt.genSaltSync(10);

Router.post("/signup", (req, res) => {
    let errors = "";
    const { body } = req;
    let { username } = body;
    const { password } = body;
    console.log("value recieved at /signup :", username, password);
    User.findOne({ username: username })
        .then((user, err) => {
            if (user) {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server error"
                    });
                }
                return res.send({
                    success: true,
                    token: user._id,
                    message: "Valid sign in"
                });
            }
        })
        .then(() => {
            let newuser = new User();
            newuser.username = username;
            newuser.password = password;
            console.log("newuser : ", newuser);
            newuser.save((err, user) => {
                if (err) {
                    console.log("err", err);
                    errors = "error in signup redirect";
                    return res.send({
                        success: false,
                        message: errors
                    });
                }
                return res.send({
                    success: true,
                    message: "Now you can start the quiz",
                    token: user._id
                });
            });
        }); //end of then
});
Router.get("/logout", (req, res) => {
    console.log("logging out : " + user);
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            error = "Error: Server error";
            return res.send({
                success: false,
                message: error
            });
        }
    });
});

Router.get("/verify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    console.log("in localuser /verify :", token);
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    User.find({
        _id: token,
        isDeleted: false
    })
        .then((user, err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error : server error"
                });
            }
            if (user) {
                return res.send({
                    success: true,
                    message: "A Person has been found",
                    isTeacher: user.isTeacher
                });
            }
            return res.send({
                success: false,
                message: "A Person not found"
            });
        })
        .catch(err => {
            errors = "user does not exist";
            console.warn(err);
            return res.send({
                success: false,
                message: errors
            });
        });
});

module.exports = Router;
