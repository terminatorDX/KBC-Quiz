// localhost:3000/<Route>

const User = require("../models/User"),
    Answers = require("../models/Answers"),
    Router = require("express").Router();
Router.post("/answers", (req, res) => {
    const { body } = req;
    let { givenAnswers } = body;
    console.log("name1 : ", req.session.user, "name2 : ", req.user); //TODO: both of these are shown as undefined
    console.log("value recieved at /answers :", givenAnswers);
    const findUser = req.session.user || req.user;
    User.findOne({ username: findUser.username }).then((user, err) => {
        //TODO: right user here is not found at all
        if (user) {
            //TODO:some other User
            if (err) {
                return res.send({
                    success: false,
                    message: "user found but is something else is problem"
                });
            }
            console.log("user is found again in /answer : ", user);
            const answers = new Answers();
            answers.givenAns = givenAnswers;
            answers.user = user._id;
            answers.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: "user found but problem is in saving "
                    });
                }
                return res.send({
                    success: true,
                    message: "valid save"
                });
            });
        }
        return res.send({
            success: false,
            message: "user not found so answer not saved"
        });
    });
});

module.exports = Router;
