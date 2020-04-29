import React, { Component } from 'react';
import Axios from 'axios';
import GameOver from './gameover';
import WinGame from './wingame';
// this is the background images
import MainImage from '../../image/game.jpg';
import GroundImage from '../../image/ground.PNG';
import Toolbar from '../../image/toolbar.PNG';
import CastleTool from '../../image/castle.png';
import CharacterData from '../../data/characterinfo';
import GameLevelData from '../../data/gamelevel';
// monster and character class files
import Monsterone from './monster/monsterone';
import Monstertwo from './monster/monstertwo';
import Monsterthree from './monster/monsterthree';
import Monsterfour from './monster/monsterfour';
import Characterone from './character/characterone';
import Charactertwo from './character/charactertwo';
import Characterthree from './character/characterthree';
import Characterfour from './character/characterfour';
import Castle from './castle/castle';
// monster and cahracter sprite images
import Monsteronesprite from '../../image/monsterone.png';
import Monstertwosprite from '../../image/monstertwo.png';
import Monsterthreesprite from '../../image/monsterthree.png';
import Monsterfoursprite from '../../image/monsterfour.png';
import Characteronesprite from '../../image/characterone.png';
import Charactertwosprite from '../../image/charactertwo.png';
import Characterthreesprite from '../../image/characterthree.png';
import Characterfoursprite from '../../image/characterfour.png';
// charactor tool image
import CharacteroneTool from '../../image/characteronetool.PNG';
import CharactertwoTool from '../../image/charactertwotool.PNG';
import CharacterthreeTool from '../../image/characterthreetool.PNG';
import CharacterfourTool from '../../image/characterfourtool.PNG';
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
        this.castleImage = React.createRef();
        this.loadingPage = document.getElementById('loading');
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
        castleImage: null,
        theMonsters: [],
        myCharacters: [],
        context: null,
        distance: window.innerWidth * 0.06,
        characterData: CharacterData,
        gamelevelMonsters: GameLevelData[parseInt(this.props.match.params.level) - 1].monsters,
        gameStatus: null,
        imageNumber: 0,
        castle: null,
        loading: true,
        time: -1,
        gameover: false,
        wingame: false,
        monsterComing: 0,
        thisGameLevel: parseInt(this.props.match.params.level),
        updateTimer: null,
    }

    componentDidMount() {
        this.image = new Image();
        this.image.src = MainImage;
        this.image.onload = this.LoadImage();
        const context = this.canvas.current.getContext('2d');
        var monsters = this.state.gamelevelMonsters.monsterone.number + this.state.gamelevelMonsters.monstertwo.number + this.state.gamelevelMonsters.monsterthree.number + this.state.gamelevelMonsters.monsterfour.number;
        this.getGameStatus();
        this.setState({
            context: context,
            monsterComing: monsters
        })
        requestAnimationFrame(() => { this.update() });
    }
    update = () => {
        if (this.state.loading) {
            this.loading();
        }
        
        if (this.state.context !== null) {
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            if (this.state.castle && this.state.castleImage) {
                this.state.castle.render(this.state);
                if(this.state.castle.hp < 1){
                    this.setState({
                        gameover: true,
                    })
                }
            }
            if (this.state.theMonsters[0] && this.state.myCharacters[0]) {
                var distance = this.state.theMonsters[0].x - this.state.myCharacters[0].x;
                if (distance < 0) {
                    if (this.state.theMonsters[0].mode !== 'attack') {
                        this.state.theMonsters[0].changemode('attack');
                    }
                    if (this.state.myCharacters[0].mode !== 'attack') {
                        this.state.myCharacters[0].changemode('attack');
                    }
                }
                else if (distance > 0) {
                    if (this.state.theMonsters[0].mode !== 'move') {
                        this.state.theMonsters[0].changemode('move');
                    }
                    if (this.state.myCharacters[0].mode !== 'move') {
                        this.state.myCharacters[0].changemode('move');
                    }
                }
                if (this.state.theMonsters[0].hit) {
                    this.state.myCharacters[0].attackedDamage(this.state.theMonsters[0].damage);
                    this.state.theMonsters[0].finishHit();
                }
                if (this.state.myCharacters[0].hit) {
                    this.state.theMonsters[0].attackedDamage(this.state.myCharacters[0].damage);
                    this.state.myCharacters[0].finishHit();
                }
            }
            if (this.state.theMonsters.length !== 0 && this.state.myCharacters.length === 0) {
                if (this.state.theMonsters[0].x < this.state.distance) {
                    if (this.state.theMonsters[0].mode !== 'attack') {
                        this.state.theMonsters[0].changemode('attack');
                    }
                    if (this.state.theMonsters[0].hit) {
                        this.state.castle.attackedDamage(this.state.theMonsters[0].damage);
                        this.state.theMonsters[0].finishHit();
                    }
                }
                else if (this.state.theMonsters[0].mode !== 'move') {
                    this.state.theMonsters[0].changemode('move');
                }
            }
            if (this.state.theMonsters.length === 0 && this.state.myCharacters.length !== 0) {
                if (this.state.myCharacters[0].x > (this.state.screenWidth - this.state.distance)) {
                    this.state.myCharacters[0].changemode('stay');
                }
                else if (this.state.myCharacters[0].mode !== 'move') {
                    this.state.myCharacters[0].changemode('move');
                }
            }
            if (this.state.theMonsters.length !== 0) {
                if (this.state.theMonsters[0].deletecharacter) {
                    this.state.castle.addCoin(this.state.theMonsters[0].coin * 0.5);
                    this.deleteMonster();
                }
                for (var i = 0; i < this.state.theMonsters.length; i++) {
                    if (i > 0) {
                        var h = i - 1;
                        var monsterDis = this.state.theMonsters[i].x - this.state.theMonsters[h].x;
                        if (monsterDis < this.state.distance) {
                            this.state.theMonsters[i].changemode('stay');
                        }
                        else if (this.state.theMonsters[i].mode !== 'move') {
                            this.state.theMonsters[i].changemode('move');
                        }
                    }
                    this.state.theMonsters[i].render(this.state);
                }
            }
            if (this.state.myCharacters.length !== 0) {
                if (this.state.myCharacters[0].deletecharacter) {
                    this.deleteCharacter();
                }
                for (var j = 0; j < this.state.myCharacters.length; j++) {
                    if (j > 0) {
                        var k = j - 1;
                        var characterDis = this.state.myCharacters[k].x - this.state.myCharacters[j].x;
                        if (characterDis < this.state.distance) {
                            this.state.myCharacters[j].changemode('stay');
                        }
                        else if (this.state.myCharacters[j].mode !== 'move') {
                            this.state.myCharacters[j].changemode('move');
                        }
                    }
                    this.state.myCharacters[j].render(this.state);
                }
            }
            if(this.state.theMonsters.length === 0 && this.state.monsterComing === 0){
                this.setState({
                    wingame : true,
                })
            }
        }
        if(this.state.gameover || this.state.wingame){
            if(this.state.gameover){
                this.gameoverCall();
            }
            if(this.state.wingame){
                this.youwinCall();
            }
            clearInterval(this.state.updateTimer);
        }
        else{
            requestAnimationFrame(() => { this.update() });
        }
    }
    gameoverCall = () => {
        Axios.put(`/api/upgrade/lose/${this.state.thisGameLevel}`)
            .then((result) => {console.log('gameover')})
    }
    youwinCall = () => {
        Axios.put(`/api/upgrade/win/${this.state.thisGameLevel}`)
            .then((result) => {console.log('win')})
    }
    // when image onload add to state
    LoadImage = (e, image) => {
        var imageNumber = this.state.imageNumber;
        imageNumber += 1;
        if (image) {
            this.setState({
                [e.target.name]: image,
                imageNumber: imageNumber,
            })
        }
        else {
            this.setState({
                imageNumber: imageNumber,
            })
        }

    }
    componentWillUnmount() {
        this.loadingPage.style.zIndex = 1000;
    }
    addMonster = (monsterNum, monsterLvl) => {
        var monster;
        if (monsterNum === 'monsterone') {
            monster = new Monsterone(this.state.characterData.characterone[monsterLvl - 1]);
        }
        else if (monsterNum === 'monstertwo'){
            monster = new Monstertwo(this.state.characterData.charactertwo[monsterLvl - 1]);
        }
        else if (monsterNum === 'monsterthree'){
            monster = new Monsterthree(this.state.characterData.characterthree[monsterLvl - 1]);
        }
        else if (monsterNum === 'monsterfour'){
            monster = new Monsterfour(this.state.characterData.characterfour[monsterLvl - 1]);
        }
        var monsters = this.state.theMonsters.concat(monster);
        var monsterComing = this.state.monsterComing -1;
        this.setState({
            theMonsters: monsters,
            monsterComing: monsterComing,
        })
    }
    thisLevelMonsters = () => {
        var timer = 2000;
        var monsterinfo = this.state.gamelevelMonsters;
        if (monsterinfo.monsterone) {
            for (var i = 0; i < monsterinfo.monsterone.number; i++) {
                this.settingTimer('monsterone', monsterinfo.monsterone.level, timer)
                timer += 5000;
            }
        }
        if (monsterinfo.monstertwo) {
            for (var i = 0; i < monsterinfo.monstertwo.number; i++) {
                this.settingTimer('monstertwo', monsterinfo.monstertwo.level, timer)
                timer += 5000;
            }
        }
        if (monsterinfo.monsterthree) {
            for (var i = 0; i < monsterinfo.monsterthree.number; i++) {
                this.settingTimer('monsterthree', monsterinfo.monsterthree.level, timer)
                timer += 5000;
            }
        }
        if (monsterinfo.monsterfour) {
            for (var i = 0; i < monsterinfo.monsterfour.number; i++) {
                this.settingTimer('monsterfour', monsterinfo.monsterfour.level, timer)
                timer += 5000;
            }
        }

    }
    settingTimer = (monsterNum, Lvl, time) => {
        setTimeout(() => { this.addMonster(monsterNum, Lvl) }, time);
    }
    loading = () => {
        if (this.state.gameStatus && this.state.imageNumber === 16) {
            this.loadingPage.style.zIndex = -1000;
            this.thisLevelMonsters();
            var updateTimer = setInterval(() => {
                var time = this.state.time + 1;
                this.setState({ time: time })
            }, 1000);
            this.setState({
                loading: false,
                castle: new Castle(this.state.characterData.castle[this.state.gameStatus.castle - 1]),
                updateTimer: updateTimer
            });
        }
    }
    getGameStatus = () => {
        Axios.get('/api/gamestatus')
            .then((result) => {
                if (result.data === 'no user') {
                    window.location.href = '/';
                }
                this.setState({
                    gameStatus: result.data,
                });
            })
    }
    addCharacter = (name) => {
        var character;
        var coinneed;
        var newChar = true;
        if (name === 'characterone') {
            coinneed = this.state.characterData.characterone[this.state.gameStatus.characterone - 1].summon;
            if (this.state.castle.coin > (coinneed - 1)) {
                character = new Characterone(this.state.characterData.characterone[this.state.gameStatus.characterone - 1]);
            } else { newChar = false; }
        } else if (name === 'charactertwo') {
            coinneed = this.state.characterData.charactertwo[this.state.gameStatus.charactertwo - 1].summon;
            if (this.state.castle.coin > (coinneed - 1)) {
                character = new Charactertwo(this.state.characterData.charactertwo[this.state.gameStatus.charactertwo - 1]);
            } else { newChar = false; }
        } else if (name === 'characterthree') {
            coinneed = this.state.characterData.characterthree[this.state.gameStatus.characterthree - 1].summon;
            if (this.state.castle.coin > (coinneed - 1)) {
                character = new Characterthree(this.state.characterData.characterthree[this.state.gameStatus.characterthree - 1]);
            } else { newChar = false; }
        } else if (name === 'characterfour') {
            coinneed = this.state.characterData.characterfour[this.state.gameStatus.characterfour - 1].summon;
            if (this.state.castle.coin > (coinneed - 1)) {
                character = new Characterfour(this.state.characterData.characterfour[this.state.gameStatus.characterfour - 1]);
            } else { newChar = false; }
        }
        if (newChar) {
            var characters = this.state.myCharacters.concat(character);
            this.state.castle.minusCoin(coinneed);
            this.setState({
                myCharacters: characters,
            })
        }
    }
    deleteCharacter = () => {
        var newCharacterList = this.state.myCharacters.slice();
        newCharacterList.splice(0, 1);
        this.setState({
            myCharacters: newCharacterList,
        });
    }
    deleteMonster = () => {
        var newMonsterList = this.state.theMonsters.slice();
        newMonsterList.splice(0, 1);
        this.setState({
            theMonsters: newMonsterList,
        });
    }
    callstate = () => {
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <div style={{ width: "100%", height: '20vh', position: "fixed", top: '0', left: '10px', zIndex: "10" }}>
                    <div style={{ display: 'inline-block', float: 'left', width: "8%", height: '100%', textAlign: 'center' }}>
                        <img onLoad={() => { this.LoadImage() }} onClick={() => this.addCharacter("characterone")} style={{ width: '100%', height: '60%', backgroundColor: 'white', border: '2px solid black' }} src={CharacteroneTool} alt="charactoerone" />
                        <br />
                        <b style={{ color: 'white' }}>{this.state.gameStatus ? this.state.characterData.characterone[this.state.gameStatus.characterone - 1].summon : 'unknown'}</b>
                    </div>
                    <div style={{ display: 'inline-block', float: 'left', width: "8%", height: '100%', textAlign: 'center' }}>
                        <img onLoad={() => { this.LoadImage() }} onClick={() => this.addCharacter('charactertwo')} style={{ width: "100%", height: '60%', backgroundColor: 'white', border: '2px solid black' }} src={CharactertwoTool} alt="charactoertwo" />
                        <br />
                        <b style={{ color: 'white' }}>{this.state.gameStatus ? this.state.characterData.charactertwo[this.state.gameStatus.charactertwo - 1].summon : 'unknown'}</b>
                    </div>
                    <div style={{ display: 'inline-block', float: 'left', width: "8%", height: '100%', textAlign: 'center' }}>
                        <img onLoad={() => { this.LoadImage() }} onClick={() => this.addCharacter('characterthree')} style={{ width: "100%", height: '60%', backgroundColor: 'white', border: '2px solid black' }} src={CharacterthreeTool} alt="charactoerthree" />
                        <br />
                        <b style={{ color: 'white' }}>{this.state.gameStatus ? this.state.characterData.characterthree[this.state.gameStatus.characterthree - 1].summon : 'unknown'}</b>
                    </div>
                    <div style={{ display: 'inline-block', float: 'left', width: "8%", height: '100%', textAlign: 'center' }}>
                        <img onLoad={() => { this.LoadImage() }} onClick={() => this.addCharacter('characterfour')} style={{ width: "100%", height: '60%', backgroundColor: 'white', border: '2px solid black' }} src={CharacterfourTool} alt="charactoerfour" />
                        <br />
                        <b style={{ color: 'white' }}>{this.state.gameStatus ? this.state.characterData.characterfour[this.state.gameStatus.characterfour - 1].summon : 'unknown'}</b>
                    </div>
                    <div style={{ display: 'inline-block', float: 'left', width: "20%", height: '100%', textAlign: 'center', paddingTop: '5px' }}>
                        <h3 style={{ color: 'white' }}>Coin: {this.state.castle ? this.state.castle.coin : 'unknown'}</h3>
                    </div>
                    <div style={{ display: 'inline-block', float: 'left', width: "20%", height: '100%', textAlign: 'center', paddingTop: '5px' }}>
                        <h3 style={{ color: 'white' }}>Monster Left: {this.state.monsterComing}</h3>
                    </div>
                    <div onClick={() => this.callstate()} style={{ display: 'inline-block', float: 'left', width: "20%", height: '100%', textAlign: 'center', paddingTop: '5px' }}>
                        <h3 style={{ color: 'white' }}>Time: {this.state.time}</h3>
                    </div>
                </div>
                <img onLoad={() => { this.LoadImage() }} style={{ width: "100%", height: '20vh', position: "fixed", top: "0" }} src={Toolbar} alt="toolbar" />
                <img onLoad={() => { this.LoadImage() }} style={{ width: "100%", height: '20vh', position: "fixed", bottom: "0" }} src={GroundImage} alt="ground" />
                <div style={{ backgroundImage: `url(${MainImage})`, width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <canvas ref={this.canvas}
                        width={this.state.screenWidth}
                        height={this.state.screenHeight}
                    />
                </div>
                <div style={{ display: 'none' }}>
                    <img name='monsteroneImage' ref={this.monsteroneImage} src={Monsteronesprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.monsteroneImage.current) }} />
                    <img name='monstertwoImage' ref={this.monstertwoImage} src={Monstertwosprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.monstertwoImage.current) }} />
                    <img name='monsterthreeImage' ref={this.monsterthreeImage} src={Monsterthreesprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.monsterthreeImage.current) }} />
                    <img name='monsterfourImage' ref={this.monsterfourImage} src={Monsterfoursprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.monsterfourImage.current) }} />
                    <img name='characteroneImage' ref={this.characteroneImage} src={Characteronesprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.characteroneImage.current) }} />
                    <img name='charactertwoImage' ref={this.charactertwoImage} src={Charactertwosprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.charactertwoImage.current) }} />
                    <img name='characterthreeImage' ref={this.characterthreeImage} src={Characterthreesprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.characterthreeImage.current) }} />
                    <img name='characterfourImage' ref={this.characterfourImage} src={Characterfoursprite} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.characterfourImage.current) }} />
                    <img name='castleImage' ref={this.castleImage} src={CastleTool} alt="sprite" onLoad={(e) => { this.LoadImage(e, this.castleImage.current) }} />
                </div>
                {this.state.gameover ? <GameOver /> : <div></div>}
                {this.state.wingame ? <WinGame Thislevel={this.state.thisGameLevel} Levelon={this.state.gameStatus.level} /> : <div></div>}
            </div >
        )
    }
}

export default Game;