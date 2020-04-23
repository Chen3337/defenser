import React from 'react';

function Upgrade(props) {
    return (
        <div>
            <div style={{ width: '100%', height: "100vh", backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: '0.5' }} />
            <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "80vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '1' }}>
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <div onClick={() => props.Close()} style={{ border: '2px solid black', display: 'inline-block' }}>
                        close
                    </div>
                </div>

                <div style={{ height: '30%', width: '100%' }}>
                    <img style={{ height: '100%' }} src={props.Info[0]} alt="charactoer upgrade" />
                </div>

                <div style={{ width: '50%', float: 'left', backgroundColor: '#99ff66' }}>
                    <b>now</b>
                    <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
                        {(Object.entries(props.Info[1])).map(function (x, i) {
                            if (x[0] !== 'money') {
                                return (
                                    <i key={i}>{x[0]}: {x[1]} <br /></i>
                                );
                            }
                            return <div></div>
                        })}
                    </div>
                </div>
                {props.Info[2] ?
                    <div style={{ width: '49%', float: 'left', backgroundColor: '#99ff66' }}>
                        <b>next level</b>
                        <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
                            {(Object.entries(props.Info[2])).map(function (x, i) {
                                if (x[0] !== 'money') {
                                    return (
                                        <i key={"next "+ i}>{x[0]}: {x[1]} <br /></i>
                                    );
                                }
                                return <div></div>
                            })}
                        </div>
                    </div>
                    :
                    <h3>max level</h3>
                }
                {props.Info[2] ?
                    <div style={{ width: '100%', padding: '10px', float: 'left'}}>
                        <button style={{backgroundColor: '#04c91b'}} onClick={() => props.Upgrade()} >Level up: {props.Info[1].money}</button>
                    </div>
                    :
                    <b>Reach max level</b>
                }



            </div>
        </div>
    )
}


export default Upgrade;