import React, { Component } from "react";
import questions from "../data/questions";
import { Link } from "react-router-dom";
// import PrevButton from "../components/PreviousButton/PrevButton";

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
            if (this.state.qCount === 0) {
                return (
                    <Link className="btn col-2 btn-danger py-3" to="/">
                        Home
                    </Link>
                );
            }
            return (
                <button
                    className="btn col-2 btn-danger py-3"
                    onClick={e => {
                        e.preventDefault();
                        this.prev(true);
                    }}
                >
                    Prev
                </button>
            );
        }
        return (
            <button
                className="btn col-2 btn-danger py-3"
                onClick={e => {
                    e.preventDefault();
                    this.next(true);
                }}
            >
                {this.state.qCount === 1 ? "Finish" : "Next"}
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
                        className="col-md-6 col-sm-12 btn btn-primary disabled m-1 mx-auto"
                    >
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
                        className="col-md-6 col-sm-12 btn btn-success disabled m-1 mx-auto"
                    >
                        <p className="lead p-auto text-dark mt-2 text-center">
                            <b>{value.ques}</b>
                        </p>
                    </button>
                );
            }
            return (
                <button
                    key={value.key}
                    className="btn col-md-6 col-sm-12  btn-light disabled m-1 mx-auto"
                >
                    <p className="lead p-auto text-dark mt-2 text-center">
                        <b>{value.ques}</b>
                    </p>
                </button>
            );
        }
        return (
            <button
                key={value.key}
                className="btn col-md-6 col-sm-12  btn-light m-1 mx-auto"
                onClick={() => {
                    this.click(value.key, ques[qCount].answerCorrect);
                }}
            >
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
        if (count > -1 && count < 2) {
            this.setState({
                finished: false
            });
        }
        if (count === 2) {
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
        if (count > -1 && count < 2) {
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
        this.setState({ givenAns: joined }); //todo:to add ht e list of ques answered
        if (quesKey === actualAns) {
            this.setState({
                total: this.state.total + 1
            });
        }
        if (count === 2) {
            console.log("answer :", quesKey, "qcount:", count, "else");
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
                    <button
                        onClick={() => {
                            console.log("given ans:", this.state.givenAns);
                        }}
                        className="btn btn-success p-auto mx-5 my-5"
                    >
                        <Link to="/">Retry</Link>
                    </button>
                    <br />{" "}
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
            <div className="container my-5">
                <div className="col">
                    <div className="container">
                        <div className="text-black text-center my-2">
                            {this.previusButton(0)}
                            <h2 className="text-center m-3">
                                {ques[qCount].questionno}
                            </h2>
                            {this.previusButton(1)}
                        </div>
                        <div className="row">
                            {ques[qCount].options.map(value => {
                                return this.getClassName(value);
                            })}
                        </div>
                    </div>
                </div>
                <p className="lead text-center text-dark m-5">
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
