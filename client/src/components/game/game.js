import React, { Component } from 'react';
import MainImage from '../../image/game.jpg';
import GroundImage from '../../image/ground.PNG';
import Image from '../../image/monsterone.png';
import Monsterone from './monsterone';
import Toolbar from '../../image/toolbar.PNG';
import Monsteronetool from '../../image/monsteronetool.png';
class Game extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.image = React.createRef();
    }
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        monsteroneImage: null,
        myMonsters: [],
        context: null,
    }

    componentDidMount() {
        requestAnimationFrame(() => { this.update() });
    }
    update = () => {
        if (this.state.context !== null) {
            this.state.context.clearRect(0,0, this.state.screenWidth, this.state.screenHeight);
            if (this.state.myMonsters.length !== 0) {
                for (var i = 0; i < this.state.myMonsters.length; i++) {
                    this.state.myMonsters[i].render(this.state);
                }
            }
        }
        requestAnimationFrame(() => { this.update() });
    }
    testing = () => {
        const context = this.canvas.current.getContext('2d');
        this.setState({
            monsteroneImage: this.image.current,
            context: context,
        })


    }
    addMonster = () => {
        var monster = new Monsterone();
        var monsters = this.state.myMonsters.concat(monster);
        this.setState({
            myMonsters: monsters,
        })
    }
    render() {
        return (
            <div>
                <div style={{ width: "10%", height: '8vh', position: "fixed", top: '10px', left: '10px', zIndex: "10"}}>
                    <img onClick={() => this.addMonster()} style={{ width: "10%", height: '5vh', backgroundColor: 'white', border: '2px solid black'}} src={Monsteronetool} alt="monsterone image"/>
                </div>
                <img style={{ width: "100%", height: '10vh', position: "fixed", top: "0" }} src={Toolbar} alt="toolimage" />
                <img style={{ display: 'none' }} ref={this.image} src={Image} alt="sprite" onLoad={() => { this.testing() }} />
                <img style={{ width: "100%", height: '20vh', position: "fixed", bottom: "0" }} src={GroundImage} alt="ground" />
                <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <canvas ref={this.canvas}
                        width={this.state.screenWidth}
                        height={this.state.screenHeight}
                    />
                </div>
            </div>
        )
    }
}

export default Game;