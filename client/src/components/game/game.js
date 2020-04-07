import React, { Component } from 'react';
import MainImage from '../../image/testgame.jpg';
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
        context.drawImage(this.image.current, 0, 0,130,180,100,100,50,70);
    }
    render() {
        return (
            
            <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <img style={{display:'none'}} ref={this.image} src={Image} alt="sprite" onLoad={() => {this.testing()}}/>
                <canvas ref={this.canvas}
                    width={this.state.screenWidth}
                    height={this.state.screenHeight}
                />
            </div>
        )
    }
}

export default Game;