import React from 'react';
import MainImage from '../../image/main.jpg';
function Login() {
    console.log(window.innerWidth);
    return (
        <div style={{backgroundImage: `url(${MainImage})`, width:"100%", height:"100vh", backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <div style={{textAlign:"center", padding:'20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '40%', height: "80vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity:'.9' }}>
                <h2>DEFENSER</h2>
                username:
                <input></input>
                <br></br>
                <br></br>
                password: 
                <input></input>
            </div>
        </div>
    )
}

export default Login;