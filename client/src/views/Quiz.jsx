import React, { Component } from "react";
import questions from "../data/questions";
import { Link } from "react-router-dom";
import "./Quiz.css";
import { QuizAns } from "../Fetch/Post";
export default class Quiz extends Component {
    state = {
        qCount: 0,
        ques: [...questions],
        finished: false,
        givenAns: [],
        total: 0
    };
    previusButton(id) {
        if (id === 0) {
            if (this.state.qCount !== 0) {
                return (
                    <Link className="btn col-2 btn-danger py-3 mx-1" to="/">
                        Home
                    </Link>
                );
            }
            return (
                <button
                    className="btn col-2 btn-danger py-3 mx-1"
                    onClick={e => {
                        e.preventDefault();
                        this.prev(true);
                    }}>
                    Prev
                </button>
            );
        }
        return (
            <button
                className="btn col-2 btn-danger py-3 mx-1"
                onClick={e => {
                    e.preventDefault();
                    this.next(true);
                }}>
                {this.state.qCount === this.state.ques.length - 1
                    ? "Finish"
                    : "Next"}
            </button>
        );
    }
    getClassName(value) {
        const { qCount, givenAns, ques } = this.state;
        if (givenAns[qCount]) {
            const correctanswer = ques[qCount].answerCorrect;

            if (
                givenAns[qCount] === correctanswer &&
                correctanswer === value.key //todo: so that the answer given and the correct answer and the returned are all equal
            ) {
                return (
                    <button
                        key={value.key}
                        className="col-12 btn btn-primary disabled my-3 mx-auto">
                        <p className="lead p-auto text-dark mt-2 text-center">
                            <b>{value.ques}</b>
                        </p>
                    </button>
                );
            } else if (
                correctanswer === value.key //todo: so that the correct answer is marked along
            ) {
                return (
                    <button
                        key={value.key}
                        className="col-12 btn btn-success disabled my-3 mx-auto">
                        <p className="lead text-dark mt-2 text-center">
                            <b>{value.ques}</b>
                        </p>
                    </button>
                );
            }
            return (
                <button
                    key={value.key}
                    className="btn col-12 btn-light disabled my-3 mx-auto">
                    <p className="lead p-auto text-dark mt-2 text-center">
                        <b>{value.ques}</b>
                    </p>
                </button>
            );
        }
        return (
            <button
                key={value.key}
                className="btn col-12 btn-light my-3 mx-auto"
                onClick={() => {
                    this.click(value.key, ques[qCount].answerCorrect);
                }}>
                <p className="lead p-auto text-dark mt-2 text-center">
                    <b>{value.ques}</b>
                </p>
            </button>
        );
    }
    next() {
        let count = this.state.qCount;
        if (!this.state.givenAns[count]) {
            var joined = this.state.givenAns.concat(-1);
            this.setState({ givenAns: joined }); //todo:to add nothing in case of answered passed
        }
        count = count + 1;
        console.log("the count in next menu is :", count);
        if (count > -1 && count < this.state.ques.length) {
            this.setState({
                finished: false
            });
        }
        if (count === this.state.ques.length) {
            console.log("quizans is here", this.state.givenAns);
            QuizAns(this.state.givenAns);
            this.setState({
                finished: true
            });
        }
        this.setState({
            qCount: count
        });
    }
    prev() {
        let count = this.state.qCount;
        count = count - 1;
        console.log("the count in prev menu is :", count);
        if (count > -1 && count < this.state.ques.length) {
            this.setState({
                finished: false
            });
        }
        if (count === -1) {
            this.setState({
                finished: true
            });
        }
        this.setState({
            qCount: count
        });
    }
    click(quesKey, actualAns) {
        //todo:the quesKey == given answer and actualAns == correct
        let count = this.state.qCount;
        count = count + 1;
        var joined = this.state.givenAns.concat(quesKey);
        this.setState({ givenAns: joined }); //todo:to add the list of ques answered
        if (quesKey === actualAns) {
            this.setState({
                total: this.state.total + 1
            });
        }
        if (count === this.state.ques.length) {
            // console.log("answer :", quesKey, "qcount:", count, "else");
            console.log("quizans is here", this.state.givenAns);
            QuizAns(this.state.givenAns);
            this.setState({
                finished: true
            });
        }
        this.setState({
            qCount: count
        });
        console.log("joined:", joined, "  given ans:", this.state.givenAns); //todo : adding the given answer to array of answers
        console.log(" qCount=====", this.state.qCount);
    }
    render() {
        const { qCount, ques, finished, total } = this.state;
        if (finished)
            return (
                <div className="text-center m-5 text-primary">
                    <div className="text-black text-center">
                        {this.previusButton(0)}
                    </div>
                    <br />
                    <h1>
                        Quiz is finished <br />
                        Your answer being {total}
                    </h1>
                </div>
            );
        return (
            <div className="box">
                <div className="col">
                    <div className="container">
                        <div className="text-white text-center my-2">
                            {this.previusButton(0)}
                            {this.previusButton(1)}
                            <h3 className="text-center m-3">
                                {ques[qCount].questionno}
                            </h3>
                        </div>
                        <div className="row">
                            <div className="col questions">
                                {ques[qCount].options.map(value => {
                                    return this.getClassName(value);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="lead text-center text-white m-5">
                    If the Color of Option in Previously aswered question is
                    <b className="text-primary"> Blue</b> the it is the right
                    answer otherwise if it is{" "}
                    <b className="text-success">Green</b> ,it is the wrong
                    answer
                </p>
            </div>
        );
    }
}
