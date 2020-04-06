import React from 'react';
import MainImage from '../../image/main.jpg';
function Login() {
    return (
        <div style={{backgroundImage: `url(${MainImage})`, width:"100%", height:"100vh", backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <div style={{textAlign:"center", padding:'20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "60vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity:'.9' }}>
                <h2>DEFENSER</h2>
                username:
                <input></input>
                <br></br>
                <br></br>
                password: 
                <input></input>
                <br></br>
                <br></br>
                <button style={{width:'60%', backgroundColor:'green', color:'white', padding:'5px'}}>login</button>
                <br></br>
                <br></br>
                <a href="/signup"> [create account here]</a>
            </div>
        </div>
    )
}

export default Login;