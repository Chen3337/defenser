import React from 'react';
import { Link } from "react-router-dom";
function Wingame(props) {
    return (
        <div>
            <div style={{ width: '100%', height: "100vh", backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: '0.5', zIndex: '100' }} />
            <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "80vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '1', zIndex: '101' }}>
                <h2>You Win</h2>
                {props.Thislevel === props.Levelon - 1 ?
                    <b>Money Earn: 5</b>
                    :
                    <div />
                }
                {props.Thislevel === props.Levelon ?
                    <b>Money Earn: 10 <br /> Next Level unlocked</b>
                    :
                    <div />
                }
                <br />
                <b><Link to='/homepage' style={{ textDecoration: 'none', color: 'blue' }}>Back to Homepage</Link></b>
            </div>
        </div>
    )
}


export default Wingame;