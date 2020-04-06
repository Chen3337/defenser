import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
import {Link} from "react-router-dom";
import Axios from 'axios';
class Login extends Component {
    state = {
        username: '',
        password: '',
        errors: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }
    loginfunc = () => {
        if(this.state.username.length < 3){
            this.setState({
                errors: 'please enter a username'
            })
        }
        else if(this.state.password < 3){
            this.setState({
                errors: 'please enter password'
            })
        }
        else {
            var data = {
                username: this.state.username,
                password: this.state.password
            }
            Axios.post('/api/login', data).then((results) => {
                if(results.data.username){
                    window.location.href = '/homepage';
                }
            }).catch(()=> {
                this.setState({
                    errors: 'wrong username or password'
                })
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "62vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <h2>DEFENSER</h2>
                    <b>username:</b>
                    <input placeholder="username" name='username' type='text' value={this.state.username} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <br></br>
                    <b>password:</b>
                    <input placeholder="password" name='password' type='password' value={this.state.password} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <b style={{ color: 'red' }}>{this.state.errors}</b>
                    <br></br>
                    <br></br>
                    <button style={{ width: '60%', backgroundColor: 'green', color: 'white', padding: '5px' }} onClick={() => this.loginfunc()}>login</button>
                    <br></br>
                    <Link to="/signup">[create account here]</Link>
                </div>
            </div>
        )
    }
}

export default Login;