import React, { Component } from "react";
import questions from "../data/questions";
export default class Quiz extends Component {
    state = {
        i: 0,
        questions: [...questions],
        finished: false,
        answeredQuestion: [],
        totalMarks: 0
    };
    prev() {
        const { i, questions, answeredQuestion } = this.state;
        if (
            questions[i].answerCorrect &&
            questions[i].answerCorrect === answeredQuestion[i]
        ) {
            const correct = true;
            answered = true;
        }
        if (i > 0) {
            this.setState({
                i: this.state.i - 1,
                finished: false
            });
        } else {
            this.setState({
                i: 0,
                finished: true
            });
        }
    }
    click(given, answer) {
        const { i } = this.state;
        var joined = this.state.answeredQuestion.concat(answer);
        this.setState({ answeredQuestion: joined });
        if (given === answer) {
            this.setState({
                totalMarks: this.state.totalMarks + 1
            });
        }
        // if (given !== answer) {
        //     this.setState({
        //         answeredQuestion: given
        //     });
        // }
        if (i < 1) {
            console.log(answer, i);
            this.setState({
                i: i + 1
            });
        } else {
            console.log(answer, i, "else");
            this.setState({
                finished: true
            });
        }
    }
    render() {
        const {
            i,
            questions,
            finished,
            totalMarks,
            answeredQuestion
        } = this.state;
        var answered = true;
        const prevButton = (
            <button
                className="btn col"
                onClick={() => {
                    this.prev(true);
                }}>
                <p className="lead">prev</p>
            </button>
        );

        if (finished)
            return (
                <h1 className="text-center m-5 text-primary">
                    {prevButton}
                    Quiz is finished <br />
                    Your answer being {totalMarks}
                </h1>
            );

        return (
            <div className="container">
                <div className="col">
                    <div className="container">
                        <h2 className="bg-primary text-black text-capitalize m-auto">
                            {prevButton}
                            {questions[i].questionno}
                        </h2>
                        <div className="bg-success row">
                            {questions[i].options.map(value => {
                                return (
                                    <button
                                        className="btn col"
                                        key={value.key}
                                        disabled={answered ? false : true}
                                        onClick={() => {
                                            this.click(
                                                value.key,
                                                questions[i].answerCorrect
                                            );
                                        }}>
                                        <p className="lead">{value.ques}</p>
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
