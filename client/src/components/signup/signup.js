import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
// import {Link} from "react-router-dom";
import Axios from 'axios';
class Signup extends Component {
    state = {
        username: '',
        password: '',
        confirmpassword: '',
        errors: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }
    signupfunc = () => {
        if(this.state.username.length < 3){
            this.setState({
                errors: 'please enter a username (more than 3 characters)'
            })
        }
        else if(this.state.password < 3){
            this.setState({
                errors: 'please enter password (more than 3 characters)'
            })
        }
        else if(this.state.password !== this.state.confirmpassword){
            this.setState({
                errors: 'password do not match'
            })
        }
        else{
            Axios.post('')
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "70vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <h2>Create account</h2>
                    <b>username:</b>
                    <input name='username' type='text' value={this.state.username} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <br></br>
                    <b>password:</b>
                    <input name='password' type='password' value={this.state.password} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <br></br>
                    <b>confirm password:</b>
                    <input name='confirmpassword' type='password' value={this.state.confirmpassword} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <b style={{ color: 'red' }}>{this.state.errors}</b>
                    <br></br>
                    <br></br>
                    <button style={{ width: '60%', backgroundColor: 'green', color: 'white', padding: '5px' }} onClick={() => this.signupfunc()}>login</button>
                </div>
            </div>
        )
    }
}

export default Signup;