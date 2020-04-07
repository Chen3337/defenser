import React, { Component } from 'react';
import MainImage from '../../image/game.jpg';
import GroundImage from '../../image/ground.PNG';
import Image from '../../image/monstertwo.png';
class Game extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.image = React.createRef();
    }
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
    }

    componentDidMount() {
    }
    testing = () => {
        const context = this.canvas.current.getContext('2d');
        context.scale(-1, 1);
        context.drawImage(this.image.current, 0, 0, 130, 180, -100, (this.state.screenHeight /10 * 9) - 50, 50, 50);
    }
    render() {
        return (
            <div>
                <img style={{ display: 'none' }} ref={this.image} src={Image} alt="sprite" onLoad={() => { this.testing() }} />
                <img style={{ width: "100%", height: '10vh', position: "fixed", bottom: "0" }} src={GroundImage} alt="ground" />
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