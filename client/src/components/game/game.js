import React, { Component } from 'react';
import MainImage from '../../image/game.jpg';
import GroundImage from '../../image/ground.PNG';
import Image from '../../image/monsterone.png';
import Monsterone from './monsterone';
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
        monsterone: new Monsterone(),
        context: null,
    }

    componentDidMount() {
        window.onload = () => {
            requestAnimationFrame(() => { this.update() });
        }
    }
    update = () => {
        this.state.monsterone.render(this.state);
        requestAnimationFrame(() => { this.update() });
    }
    testing = () => {
        const context = this.canvas.current.getContext('2d');
        this.setState({
            monsteroneImage: this.image.current,
            context: context,
            
        })


    }
    render() {
        return (
            <div>
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