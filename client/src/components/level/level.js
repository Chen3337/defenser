import React, { Component } from 'react';
import MainImage from '../../image/main.jpg';
import { Link } from "react-router-dom";
import Gamelevel from '../../data/gamelevel';
import Axios from 'axios';
class Level extends Component {
    constructor(props) {
        super(props);
        this.loadingPage = document.getElementById('loading');
    }
    state = {
        gameStatus: null,
        image: null,
    }
    componentDidMount() {
        this.image = new Image();
        this.image.src = MainImage;
        this.image.onload = this.imageLoad;
        Axios.get('/api/gamestatus')
            .then((result) => {
                if (result.data === 'no user') {
                    window.location.href = '/';
                }
                this.setState({ gameStatus: result.data });
            })
    }
    imageLoad = () => {
        this.setState({ image: true })
    }
    componentWillUnmount() {
        this.loadingPage.style.zIndex = 1000;
    }
    loading = () => {
        if (this.state.gameStatus && this.state.image) {
            this.loadingPage.style.zIndex = -1000;
        }
    }


    levelClicked = (level) => {
        if (level < (this.state.gameStatus.level + 1)) {
            window.location.href = `/game/${level}`
        }
    }
    render() {
        if (this.loadingPage.style.zIndex !== -1000) {
            this.loading();
        }
        return (
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ textAlign: "center", padding: '20px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '35%', backgroundColor: "#ebde34", borderRadius: '25px', opacity: '.9', display: 'inline-block' }}>
                    <h2>Levels</h2>
                    {this.state.gameStatus ?
                        <div>
                            {(Gamelevel).map((x, i) => {
                                var color;
                                if (x.level > this.state.gameStatus.level) {
                                    color = 'gray';
                                }
                                else {
                                    color = "black";
                                }
                                return (<div onClick={() => this.levelClicked(x.level)} key={x.level} style={{ width: '30px', height: '25px', backgroundColor: color, color: 'white', paddingTop: '5px', margin: '5px', float: 'left' }}>{x.level}</div>)
                            })}
                        </div>
                        :
                        <div></div>
                    }
                    <div style={{ width: '100%', float: 'left', marginTop: '10px' }}>
                        <b><Link to='/homepage' style={{ textDecoration: 'none' ,color:'blue'}}>Back</Link></b>
                    </div>
                </div>
            </div>
        )
    }
}

export default Level;