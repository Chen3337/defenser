import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/login';
import Signup from './signup/signup';
class Gamerouter extends Component {




    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </Router>
        )
    }
}

export default Gamerouter;