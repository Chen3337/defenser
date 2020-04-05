import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/login';
class Router extends Component {




    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </Router>
        )
    }
}

export default Router;