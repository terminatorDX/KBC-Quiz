import React, { Component } from "react";
import questions from "../data/questions";
import { Link } from "react-router-dom";

export default class Quiz extends Component {
    state = {
        qCount: 0,
        ques: [...questions],
        finished: false,
        givenAns: [],
        total: 0
    };
    previusButton() {
        return (
            <button
                className="btn col-2 btn-danger py-3"
                onClick={e => {
                    e.preventDefault();
                    this.prev(true);
                }}
            >
                {this.state.qCount === 0 ? "Home" : "Prev"}
            </button>
        );
    }
    prev() {
        const { qCount, ques, givenAns } = this.state;
        console.log("the count in the prev function is :", qCount);
        if (
            ques[qCount].answerCorrect &&
            ques[qCount].answerCorrect === givenAns[qCount]
        ) {
            console.log("answered question  ", givenAns[qCount]);
        }
        if (qCount > 0) {
            this.setState({
                qCount: this.state.qCount - 1,
                finished: false
            });
        }
        if (qCount === 0) {
            this.setState({
                qCount: 0,
                finished: true
            });
        }
    }
    click(given, answer) {
        const { qCount } = this.state;
        console.log("the answer:", answer, "given:", given, "qcount:", qCount);
        var joined = this.state.givenAns.concat(answer); //todo : adding the given answer to array of answers
        this.setState({ givenAns: joined }); //todo:to add ht e list of ques answered
        if (given === answer) {
            this.setState({
                total: this.state.total + 1
            });
        }
        if (qCount === 0) {
            console.log("answer :", answer, "qcount:", qCount, "qCount<1");
            this.setState({
                qCount: qCount + 1
            });
        } else {
            console.log("answer :", answer, "qcount:", qCount, "else");
            this.setState({
                finished: true
            });
        }
        console.log(" qCount=====", this.state.qCount);
    }
    render() {
        const { qCount, ques, finished, total } = this.state;
        var answered = true;

        if (finished)
            return (
                <h1 className="text-center m-5 text-primary">
                    <button className="btn btn-success m-auto p-auto">
                        <Link to="/">Retry</Link>
                    </button>
                    <br />
                    Quiz is finished <br />
                    Your answer being {total}
                </h1>
            );
        return (
            <div className="container my-5">
                <div className="col">
                    <div className="container">
                        <div className="text-black text-center">
                            {this.previusButton()}
                            <h2 className="text-center m-3">
                                {ques[qCount].questionno}
                            </h2>
                        </div>
                        <div className="row">
                            {ques[qCount].options.map(value => {
                                return (
                                    <button
                                        className="btn col btn-light  m-1"
                                        key={value.key}
                                        disabled={answered ? false : true}
                                        onClick={() => {
                                            this.click(
                                                value.key,
                                                ques[qCount].answerCorrect
                                            );
                                        }}
                                    >
                                        <p className="lead p-auto text-dark mt-2 text-center">
                                            <b>{value.ques}</b>
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
