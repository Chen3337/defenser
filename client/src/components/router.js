import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/login';
import Signup from './signup/signup';
import Homepage from './homepage/homepage';
import Game from './game/game';
import Level from './level/level';
class Gamerouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/homepage" component={Homepage} />
                    <Route exact path="/level" component={Level} />
                    <Route path='/game/:level' component={Game} />
                    <Route component={Login}/>
                </Switch>
            </Router>
        )
    }
}

export default Gamerouter;