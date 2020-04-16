import React, { Component } from 'react';
// this is the background images
import MainImage from '../../image/game.jpg';
import GroundImage from '../../image/ground.PNG';
import Toolbar from '../../image/toolbar.PNG';
// monster and character class files
import Monsterone from './monster/monsterone';
import Characterone from './character/characterone';
// monster and cahracter sprite images
import Monsteronesprite from '../../image/monsterone.png';
// import Monstertwosprite from '../../image/monstertwo.jpg';
import Monsterthreesprite from '../../image/monsterthree.png';
import Monsterfoursprite from '../../image/monsterfour.png';
import Characteronesprite from '../../image/characterone.png';
import Charactertwosprite from '../../image/charactertwo.png';
import Characterthreesprite from '../../image/characterthree.png';
// import Characterfoursprite from '../../image/characterfour.png';
// charactor tool image
import CharacteroneTool from '../../image/characteronetool.PNG';
class Game extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.monsteroneImage = React.createRef();
        this.monstertwoImage = React.createRef();
        this.monsterthreeImage = React.createRef();
        this.monsterfourImage = React.createRef();
        this.characteroneImage = React.createRef();
        this.charactertwoImage = React.createRef();
        this.characterthreeImage = React.createRef();
        this.characterfourImage = React.createRef();
    }
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        monsteroneImage: null,
        monstertwoImage: null,
        monsterthreeImage: null,
        monsterfourImage: null,
        characteroneImage: null,
        charactertwoImage: null,
        characterthreeImage: null,
        characterfourImage: null,
        theMonsters: [],
        myCharacters: [],
        context: null,
        distance: window.innerWidth * 0.06,
    }

    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        const monsteroneTimer = setInterval(() => {
            this.addMonster();
        }, 8000);
        this.setState({
            context: context,
        })
        requestAnimationFrame(() => { this.update() });
    }
    update = () => {
        if (this.state.context !== null) {
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            if(this.state.theMonsters[0] && this.state.myCharacters[0]){
                var distance = this.state.theMonsters[0].x - this.state.myCharacters[0].x;
                if(distance < 0){
                    if(this.state.theMonsters[0].mode !== 'attack'){
                        this.state.theMonsters[0].changemode('attack');
                    }
                    if(this.state.myCharacters[0].mode !== 'attack'){
                        this.state.myCharacters[0].changemode('attack');
                    }
                }
                else if(distance > 0){
                    if(this.state.theMonsters[0].mode !== 'move'){
                        this.state.theMonsters[0].changemode('move');
                    }
                    if(this.state.myCharacters[0].mode !== 'move'){
                        this.state.myCharacters[0].changemode('move');
                    }
                }
                if(this.state.theMonsters[0].hit){
                    this.state.myCharacters[0].attackedDamage(this.state.theMonsters[0].damage[0]);
                    this.state.theMonsters[0].finishHit();
                }
                if(this.state.myCharacters[0].hit){
                    this.state.theMonsters[0].attackedDamage(this.state.myCharacters[0].damage[0]);
                    this.state.myCharacters[0].finishHit();
                }
                if(this.state.theMonsters[0].deletecharacter){
                    this.deleteMonster();
                }
                if(this.state.myCharacters[0].deletecharacter){
                    this.deleteCharacter();
                }
            }
            if(this.state.theMonsters.length !== 0 && this.state.myCharacters.length === 0){
                if(this.state.theMonsters[0].mode !== 'move'){
                    this.state.theMonsters[0].changemode('move');
                }
            }
            if(this.state.theMonsters.length === 0 && this.state.myCharacters.length !== 0){
                if(this.state.myCharacters[0].mode !== 'move'){
                    this.state.myCharacters[0].changemode('move');
                }
            }
            if (this.state.theMonsters.length !== 0) {
                for (var i = 0; i < this.state.theMonsters.length; i++) {
                    if(i > 0){
                        var h = i - 1;
                        var monsterDis = this.state.theMonsters[i].x - this.state.theMonsters[h].x;
                        if(monsterDis < this.state.distance){
                            this.state.theMonsters[i].changemode('stay');
                        }
                        else if(this.state.theMonsters[i].mode !== 'move'){
                            this.state.theMonsters[i].changemode('move');
                        }
                    }
                    this.state.theMonsters[i].render(this.state);
                }
            }
            if (this.state.myCharacters.length !== 0) {
                for (var j = 0; j < this.state.myCharacters.length; j++) {
                    if(j > 0){
                        var k = j - 1;
                        var characterDis = this.state.myCharacters[k].x - this.state.myCharacters[j].x;
                        if(characterDis < this.state.distance){
                            this.state.myCharacters[j].changemode('stay');
                        }
                        else if(this.state.myCharacters[j].mode !== 'move'){
                            this.state.myCharacters[j].changemode('move');
                        }
                    }
                    this.state.myCharacters[j].render(this.state);
                }
            }
        }
        requestAnimationFrame(() => { this.update() });
    }
    // when image onload add to state
    testing = (e, image) => {
        this.setState({
            [e.target.name]: image,
        })
    }
    addCharacter = () => {
        var character = new Characterone();
        var characters = this.state.myCharacters.concat(character);
        this.setState({
            myCharacters: characters,
        })
    }
    deleteCharacter = () => {
        var newCharacterList = this.state.myCharacters.slice();
        newCharacterList.splice(0, 1);
        this.setState({
            myCharacters: newCharacterList,
        });
    }
    addMonster = () => {
        var monster = new Monsterone();
        var monsters = this.state.theMonsters.concat(monster);
        this.setState({
            theMonsters: monsters,
        })
    }
    deleteMonster = () => {
        var newMonsterList = this.state.theMonsters.slice();
        newMonsterList.splice(0, 1);
        this.setState({
            theMonsters: newMonsterList,
        });
    }
    render() {
        return (
            <div>
                <div style={{ display: 'none' }}>
                    <img name='monsteroneImage' ref={this.monsteroneImage} src={Monsteronesprite} alt="sprite" onLoad={(e) => { this.testing(e, this.monsteroneImage.current) }} />
                    {/* <img name='monstertwoImage' ref={this.monstertwoImage} src={Monstertwosprite} alt="sprite" onLoad={(e) => { this.testing(e, this.monstertwoImage.current) }} /> */}
                    <img name='monsterthreeImage' ref={this.monsterthreeImage} src={Monsterthreesprite} alt="sprite" onLoad={(e) => { this.testing(e, this.monsterthreeImage.current) }} />
                    <img name='monsterfourImage' ref={this.monsterfourImage} src={Monsterfoursprite} alt="sprite" onLoad={(e) => { this.testing(e, this.monsterfourImage.current) }} />
                    <img name='characteroneImage' ref={this.characteroneImage} src={Characteronesprite} alt="sprite" onLoad={(e) => { this.testing(e, this.characteroneImage.current) }} />
                    <img name='charactertwoImage' ref={this.charactertwoImage} src={Charactertwosprite} alt="sprite" onLoad={(e) => { this.testing(e, this.charactertwoImage.current) }} />
                    <img name='characterthreeImage' ref={this.characterthreeImage} src={Characterthreesprite} alt="sprite" onLoad={(e) => { this.testing(e, this.characterthreeImage.current) }} />
                    {/* <img name='characterfourImage' ref={this.characterfourImage} src={Characterfoursprite} alt="sprite" onLoad={(e) => { this.testing(e, this.characterfourImage.current) }} /> */}
                </div>
                <div style={{ width: "100%", height: '15vh', position: "fixed", top: '10px', left: '10px', zIndex: "10" }}>
                    <img onClick={() => this.addCharacter()} style={{ width: "8%", height: '10vh', backgroundColor: 'white', border: '2px solid black' }} src={CharacteroneTool} alt="charactoerone" />
                </div>
                <img style={{ width: "100%", height: '15vh', position: "fixed", top: "0" }} src={Toolbar} alt="toolbar" />
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