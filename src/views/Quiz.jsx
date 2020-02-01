import React, { Component } from "react";
import questions from "../data/questions";
export default class Quiz extends Component {
    state = {
        questionCount: 0,
        questions: [...questions],
        finished: false,
        answeredQuestion: [],
        totalMarks: 0
    };
    prev() {
        const { questionCount, questions, answeredQuestion } = this.state;
        if (
            questions[questionCount].answerCorrect &&
            questions[questionCount].answerCorrect ===
                answeredQuestion[questionCount]
        ) {
            console.log("answered question  ", answeredQuestion[questionCount]);
        }
        if (questionCount > 0) {
            this.setState({
                questionCount: this.state.questionCount - 1,
                finished: false
            });
        } else {
            this.setState({
                questionCount: 0,
                finished: true
            });
        }
    }
    click(given, answer) {
        const { questionCount } = this.state;
        var joined = this.state.answeredQuestion.concat(answer);
        this.setState({ answeredQuestion: joined }); //to add ht e list of questions answered
        if (given === answer) {
            this.setState({
                totalMarks: this.state.totalMarks + 1
            });
        }
        if (questionCount === 0) {
            console.log(answer, questionCount, "questionCount<1");
            this.setState({
                questionCount: questionCount + 1
            });
        } else {
            console.log(answer, questionCount, "else");
            this.setState({
                finished: true
            });
        }
        console.log("questionCount questionCount=======", this.state.i);
    }
    render() {
        const { questionCount, questions, finished, totalMarks } = this.state;
        var answered = true;

        if (finished)
            return (
                <h1 className="text-center m-5 text-primary">
                    <button className="btn btn-success m-auto p-auto">
                        <a href="/">Home</a>
                    </button>
                    <br />
                    Quiz is finished <br />
                    Your answer being {totalMarks}
                </h1>
            );
        return (
            <div className="container">
                <div className="col">
                    <div className="container">
                        <h2 className="bg-primary text-black text-capitalize m-auto">
                            <button
                                className="btn col-3 btn-danger p-auto mx-auto"
                                onClick={() => {
                                    this.prev(true);
                                }}
                            >
                                Prev
                            </button>
                            <p className="lead ml-5">
                                {questions[questionCount].questionno}
                            </p>
                        </h2>
                        <div className="bg-success row">
                            {questions[questionCount].options.map(value => {
                                return (
                                    <button
                                        className="btn col"
                                        key={value.key}
                                        disabled={answered ? false : true}
                                        onClick={() => {
                                            this.click(
                                                value.key,
                                                questions[questionCount]
                                                    .answerCorrect
                                            );
                                        }}
                                    >
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
