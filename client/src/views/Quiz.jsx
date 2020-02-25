import React, { Component } from "react";
import questions from "../data/questions";
import "./Quiz.css";
import { QuizAns } from "../Fetch/Post";
export default class Quiz extends Component {
    state = {
        qCount: 0,
        ques: [...questions],
        finished: false,
        givenAns: [],
        total: 0,
        sent: false
    };
    previusButton(id) {
        if (id === 0) {
            if (this.state.qCount !== 0) {
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
            return;
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
    getClassName(value, index) {
        //todo: value is ques[qCount].options mtlb sirf 4 options
        const { qCount, givenAns, ques } = this.state;
        if (givenAns[qCount] || givenAns[qCount] === 0) {
            //todo:it is assuming 0 as a null
            //todo: if answer is given
            const correctanswer = ques[qCount].answerCorrect;
            if (
                givenAns[qCount] === correctanswer &&
                correctanswer === index //todo: so that the answer given and the correct answer and the returned are all equal
            ) {
                return (
                    <button
                        key={index}
                        className="col-12 btn btn-primary disabled my-3 mx-auto">
                        <p className="lead p-auto text-dark mt-2 text-center">
                            <b>{value.ques}</b>
                        </p>
                    </button>
                );
            }
            if (
                givenAns[qCount] !== correctanswer &&
                correctanswer === index //todo: so that only correct answer is marked
            ) {
                return (
                    <button
                        key={index}
                        className="col-12 btn btn-success disabled my-3 mx-auto">
                        <p className="lead text-dark mt-2 text-center">
                            <b>{value.ques}</b>
                        </p>
                    </button>
                );
            }
            return (
                //todo : options which are neither correct nor given
                <button
                    key={index}
                    className="btn col-12 btn-light disabled my-3 mx-auto">
                    <p className="lead p-auto text-dark mt-2 text-center">
                        <b>{value.ques}</b>
                    </p>
                </button>
            );
        }
        return (
            <button
                key={index}
                className="btn col-12 btn-light my-3 mx-auto"
                onClick={() => {
                    this.click(index, ques[qCount].answerCorrect);
                }}>
                <p className="lead p-auto text-dark mt-2 text-center">
                    <b>{value.ques}</b>
                </p>
            </button>
        );
    }
    next() {
        console.log("next is pressed ---------------------------");
        let count = this.state.qCount;
        const { givenAns } = this.state;
        if (!givenAns[count] || givenAns.length !== count) {
            console.log(
                " unanswers for count :",
                count,
                " adding -1 to givenAns :",
                givenAns
            );
            var joined = givenAns.concat(-1);
            this.setState({ givenAns: joined }); //todo:to add nothing("-1") in case of next answer
        }
        count = count + 1;
        console.log("the count in next menu is :", count);
        if (count > -1 && count < this.state.ques.length) {
            this.setState({
                finished: false
            });
        }
        if (count === this.state.ques.length) {
            this.setState({
                finished: true
            });
        }
        this.setState({
            qCount: count
        });
        if (count === 4 && !this.state.sent) {
            console.log("quizans is here", this.state.givenAns, joined);
            QuizAns(joined);
            this.setState({ sent: true });
        }
        console.log("joined:", joined, "  given ans:", this.state.givenAns); //todo : adding the given answer to array of answers
        console.log("qcount in NEXT():", count, " qCOunt :", this.state.qCount);
    }
    prev() {
        console.log("prev is pressed ---------------------------------------");
        let count = this.state.qCount;
        count = count - 1;
        console.log("the count in prev menu is :", count);
        if (count >= 0 && count < this.state.ques.length) {
            this.setState({
                finished: false
            });
            this.setState({
                qCount: count
            });
        } else {
            this.setState({
                finished: true
            });
        }
    }
    click(quesKey, actualAns) {
        console.log("an answer is clicked **********************************");
        let count = this.state.qCount;
        count = count + 1;
        var joined = this.state.givenAns.concat(quesKey); //todo:to add the list of ques answered
        if (quesKey === actualAns) {
            this.setState({
                total: this.state.total + 1 //todo:the quesKey is given and actualAns == correct
            });
        }
        if (count === this.state.ques.length) {
            this.setState({
                finished: true
            });
        }
        this.setState({
            qCount: count,
            givenAns: joined
        });
        if (count === 4 && joined[3] && !this.state.sent) {
            console.log("quizans is here", this.state.givenAns, joined);
            QuizAns(joined, this.props.token);
            this.setState({ sent: true });
        }
        console.log("joined:", joined, "  given ans:", this.state.givenAns); //todo : adding the given answer to array of answers
        console.log("count in click():", count, " qCOunt :", this.state.qCount);
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
                                {ques[qCount].options.map((value, index) => {
                                    return this.getClassName(value, index);
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
