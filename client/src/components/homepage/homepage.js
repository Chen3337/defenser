import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
import { Link } from "react-router-dom";
import Axios from 'axios';
import CharacteroneTool from '../../image/characteronetool.PNG';
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.loadingPage = document.getElementById('loading');
    }
    state = {
        gameStatus: null,
        mainImage: false,
        characterOneImage: false,
    }
    componentDidMount() {
        this.image = new Image();
        this.image.src = MainImage;
        this.image.onload = this.loading;
    }
    Imageload = () => {
        this.setState({
            mainImage: true
        })
    }
    componentWillUnmount() {
        this.loadingPage.style.zIndex = 1000;
    }
    loading = () => {
        // if(this.state.gameStatus && this.state.mainImage && this.state.characterOneImage){
        this.loadingPage.style.zIndex = -1000;
        // }
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "80vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <b>game character status</b>
                    <div style={{ width: '95%', height: '20%', margin:'auto', backgroundColor: 'yellow', marginBottom:'5px'}}>
                        <img style={{ width: "20%", height: '95%', border: '1px solid black', float: 'left' }} src={CharacteroneTool} alt="charactoerone" />
                        <div style={{float: 'left', width: '50%', height:'95%', paddingLeft:'10px'}}>
                            <b>level: 1 <br/>upgrade: 20</b>
                        </div>
                        <div style={{float: 'left', width: '25%', height:'95%', margin:'auto'}}>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        </div>
                    </div>
                    <div style={{ width: '95%', height: '20%', margin:'auto', backgroundColor: 'yellow', marginBottom:'5px'}}>
                        <img style={{ width: "20%", height: '95%', border: '1px solid black', float: 'left' }} src={CharacteroneTool} alt="charactoerone" />
                        <div style={{float: 'left', width: '50%', height:'95%', paddingLeft:'10px'}}>
                            <b>level: 1 <br/>upgrade: 20</b>
                        </div>
                        <div style={{float: 'left', width: '25%', height:'95%', margin:'auto'}}>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        </div>
                    </div>
                    <div style={{ width: '95%', height: '20%', margin:'auto', backgroundColor: 'yellow', marginBottom:'5px'}}>
                        <img style={{ width: "20%", height: '95%', border: '1px solid black', float: 'left' }} src={CharacteroneTool} alt="charactoerone" />
                        <div style={{float: 'left', width: '50%', height:'95%', paddingLeft:'10px'}}>
                            <b>level: 1 <br/>upgrade: 20</b>
                        </div>
                        <div style={{float: 'left', width: '25%', height:'95%', margin:'auto'}}>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        </div>
                    </div>
                    <div style={{ width: '95%', height: '20%', margin:'auto', backgroundColor: 'yellow', marginBottom:'5px'}}>
                        <img style={{ width: "20%", height: '95%', border: '1px solid black', float: 'left' }} src={CharacteroneTool} alt="charactoerone" />
                        <div style={{float: 'left', width: '50%', height:'95%', paddingLeft:'10px'}}>
                            <b>level: 1 <br/>upgrade: 20</b>
                        </div>
                        <div style={{float: 'left', width: '25%', height:'95%', margin:'auto'}}>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        </div>
                    </div>

                </div>
                {/* second one */}
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '70%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: "20vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <b>castle status</b>
                    <div style={{ width: '95%', height: '90%', margin:'auto', backgroundColor: 'yellow', marginBottom:'5px'}}>
                        <img style={{ width: "20%", height: '95%', border: '1px solid black', float: 'left' }} src={CharacteroneTool} alt="charactoerone" />
                        <div style={{float: 'left', width: '50%', height:'95%', paddingLeft:'10px'}}>
                            <b>level: 1 <br/>upgrade: 20</b>
                        </div>
                        <div style={{float: 'left', width: '25%', height:'95%', margin:'auto'}}>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        <button style={{backgroundColor: '#03fce3', width:'95%'}}>Upgrade</button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '70%', top: '80%', transform: 'translate(-50%, -50%)', width: '35%', height: "5vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    <b><Link to='/game'>START</Link></b>
                </div>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '70%', top: '20%', transform: 'translate(-50%, -50%)', width: '35%', height: "5vh", backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9' }}>
                    Money: 20
                </div>
            </div>
        )
    }
}

export default Homepage;