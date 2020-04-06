import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/login';
import Signup from './signup/signup';
import Homepage from './homepage/homepage';
class Gamerouter extends Component {




    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/homepage" component={Homepage} />
                </Switch>
            </Router>
        )
    }
}

export default Gamerouter;