import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
import { Link } from "react-router-dom";
import Axios from 'axios';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.loadingPage = document.getElementById('loading');
    }
    state = {
        username: '',
        password: '',
        confirmpassword: '',
        errors: '',
    }
    componentDidMount() {
        this.image = new Image();
        this.image.src = MainImage;
        this.image.onload = this.loading;
    }
    componentWillUnmount() {
        this.loadingPage.style.zIndex = 1000;
    }
    loading = () => {
        this.loadingPage.style.zIndex = -1000;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }
    signupfunc = () => {
        if (this.state.username.length < 3) {
            this.setState({
                errors: 'please enter a username (more than 3 characters)'
            })
        }
        else if (this.state.password < 3) {
            this.setState({
                errors: 'please enter password (more than 3 characters)'
            })
        }
        else if (this.state.password !== this.state.confirmpassword) {
            this.setState({
                errors: 'password do not match'
            })
        }
        else {
            this.loadingPage.style.zIndex = 1000;
            var data = {
                username: this.state.username,
                password: this.state.password
            }
            Axios.post('/api/', data).then((results) => {
                this.loading();
                if (results.data.error) {
                    this.setState({
                        errors: results.data.error
                    })
                }
                else if (results.data.username) {
                    this.setState({
                        errors: 'successful'
                    })
                }
                
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "75vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <h2>Create Account</h2>
                    <b>username:</b>
                    <input placeholder="more than three characters" name='username' type='text' value={this.state.username} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <br></br>
                    <b>password:</b>
                    <input placeholder="more than three characters" name='password' type='password' value={this.state.password} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <br></br>
                    <b>confirm:</b>
                    <input placeholder="re-enter password" name='confirmpassword' type='password' value={this.state.confirmpassword} onChange={(e) => { this.handleChange(e) }} />
                    <br></br>
                    <b style={{ color: 'red' }}>{this.state.errors}</b>
                    <br></br>
                    <br></br>
                    <button style={{ width: '60%', backgroundColor: 'green', color: 'white', padding: '5px' }} onClick={() => this.signupfunc()}>Signup</button>
                    <br></br>
                    <Link to="/" style={{textDecoration: 'none', color:'blue'}}>[Already have a account?]</Link>
                </div>
            </div>
        )
    }
}

export default Signup;