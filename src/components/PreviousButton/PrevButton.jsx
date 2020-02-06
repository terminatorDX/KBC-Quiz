import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PrevButton extends Component {
    render() {
        console.log(
            this.props.qCount,
            "qcount in butfodsandsnvjkdsnvjdsnvjsdnvjdsvnjd"
        );
        if (this.props.qCount === 0) {
            return (
                <Link className="btn col-2 btn-danger py-3" to="/">
                    Home
                </Link>
            );
        }
        return (
            <button
                className="btn col-2 btn-danger py-3"
                onClick={() => {
                    this.props.prev(true);
                }}
            >
                Prev
            </button>
        );
    }
}
