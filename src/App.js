import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Admin from "./layouts/Admin"; //TODO:bringing in routing from layouts/adminlayout

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/user" render={props => <Admin {...props} />} />
                <Redirect from="/" to="/user/dashboard" />
            </Switch>
        </React.Fragment>
    );
}

export default App;
