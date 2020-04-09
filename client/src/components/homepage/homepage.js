import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
import {Link} from "react-router-dom";
class Homepage extends Component {
    state = {
        username: '',
        password: '',
        confirmpassword: '',
        errors: '',
    }

    componentDidMount() {
        
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "75vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <div>
                        <b><Link to='/game'>START</Link></b>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;