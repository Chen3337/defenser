class Monsterone {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.94;
        this.y = this.ScreenY * 0.8;
        this.sprite = {
            startX : 0,
            startY : 0,
            width : 130,
            height : 180,
        };
        this.attsprite = {
            startX : 0,
            startY : 845,
            width : 130,
            height : 165,
        };
        this.sizeX = this.ScreenX * 0.06;
        this.sizeY = this.ScreenY * 0.15;
        this.mode = 'move';
        this.spriteNumber = 0;
        this.cycle = 1;
        this.speed = this.ScreenX * 0.0005;
        this.attacked = false;
        this.hp = status.hp;
        this.damage = status.damage;
        this.coin = status.summon;
        this.deletecharacter = false;
        this.hit = false;
    }
    attackedDamage(damage){
        this.hp -= damage;
    }
    finishHit(){
        this.hit = false;
    }
    changemode(mode) {
        if (this.mode !== 'dead') {
            this.mode = mode;
            this.attacked = false;
            this.cycle = 1;
            this.spriteNumber = 0;
        }
    }
    move(){
        this.x -= this.speed;
    }
    spriteChange() {
        if(this.mode === 'dead'){
            if(this.spriteNumber < 3 ){
                this.sprite = {
                    startX : 0  + (this.spriteNumber * 132),
                    startY : 1045,
                    width : 130,
                    height : 250,
                }
            }
            else if(this.spriteNumber > 2){
                this.sprite = {
                    startX : 0  + (this.spriteNumber * 138.5),
                    startY : 1045,
                    width : 130,
                    height : 250,
                }
            }
            if(this.cycle % 10 === 0){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 5){
                this.deletecharacter = true;
            }
        }
        else if(this.mode === 'move'){
            this.move();
            this.sprite = {
                startX : 0  + (this.spriteNumber * 130),
                startY : 190,
                width : 130,
                height : 180,
            }
            if(this.cycle % 15 === 0){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 3){
                this.spriteNumber = 0;
            }
        }
        else if(this.mode === 'attack'){
            if(this.cycle === 26){
                this.hit = true;
            }
            if(this.spriteNumber === 0){
                this.sprite = {startX : 0, startY : 650, width : 140, height : 190}
            }
            else if(this.spriteNumber === 1){
                this.sprite = {startX : 160, startY : 650, width : 140, height : 190}
            }
            else if(this.spriteNumber === 2){
                this.sprite = {startX : 330, startY : 650, width : 140, height : 190}
            }
            else if(this.spriteNumber === 3){
                this.sprite = {startX : 480, startY : 650, width : 140, height : 190}
            }
            else if(this.spriteNumber === 4){
                this.attacked = true;
                this.sprite = {startX : 660, startY : 620, width : 190, height : 220}
                this.attsprite = {startX : 0, startY : 845, width : 130, height : 165}
            }
            else if(this.spriteNumber === 5){
                this.sprite = {startX : 890, startY : 620, width : 195, height : 220}
                this.attsprite = {startX : 160, startY : 845, width : 130, height : 165}
            }
            else if(this.spriteNumber === 6){
                this.sprite = {startX : 1135, startY : 620, width : 195, height : 220}
                this.attsprite = {startX : 330, startY : 845, width : 130, height : 165}
            }
            else if(this.spriteNumber === 7){
                this.attacked = false;
                this.sprite = {startX : 1380, startY : 620, width : 195, height : 220}
            }
            else if(this.spriteNumber === 8){
                this.sprite = {startX : 1580, startY : 620, width : 195, height : 220}
            }
            else if(this.spriteNumber === 9){
                this.sprite = {startX : 0, startY : 650, width : 140, height : 190}
            }
            if(this.cycle % 6 === 0){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 9){
                this.spriteNumber = 0;
            }
        }
        else if( this.mode === 'stay'){
            this.sprite = {
                startX : 0,
                startY : 0,
                width : 130,
                height : 180,
            }
        }
    }
    render(state) {
        this.spriteChange();
        this.cycle += 1;
        if(this.cycle > 60){
            this.cycle = 1;
        }
        if(this.hp < 1){
            this.changemode('dead');
        }

        const context = state.context;
        context.save()
        context.translate(this.x, this.y);
        context.font = "20px Arial";
        context.fillText(this.hp, (0 + this.sizeX * 0.25), -20 - this.sizeY);
        context.scale(1, 1);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        if(this.attacked){
            context.drawImage(state.monsteroneImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        }
        context.drawImage(state.monsteroneImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        // context.strokeRect( 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        // context.strokeRect( 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Monsterone;