class Monsterthree {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.94;
        this.y = this.ScreenY * 0.8;
        this.sprite = {
            startX : 0,
            startY : 0,
            width : 140,
            height : 155,
        };
        this.attsprite = {startX : 0, startY : 710, width : 140, height : 100};
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
            this.sprite = {
                startX : 0 + (this.spriteNumber * 146),
                startY : 850,
                width : 140,
                height : 155,
            };
            if(this.cycle % 9 === 0){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 4){
                this.deletecharacter = true;
            }
        }
        else if(this.mode === 'move'){
            this.move();
            this.sprite = {
                startX : 0,
                startY : 0,
                width : 140,
                height : 155,
            };
            if(this.cycle % 10 === 0){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 2){
                this.spriteNumber = 0;
            }
        }
        else if(this.mode === 'attack'){
            if(this.cycle === 26){
                this.hit = true;
            }
            if(this.spriteNumber === 0){
                this.sprite = {startX : 0, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 1){
                this.sprite = {startX : 175, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 2){
                this.sprite = {startX : 345, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 3){
                this.attacked = true;
                this.sprite = {startX : 520, startY : 510, width : 160, height : 155};
                this.attsprite = {startX : 0, startY : 710, width : 140, height : 100};
            }
            else if(this.spriteNumber === 4){
                this.sprite = {startX : 700, startY : 510, width : 160, height : 155};
                this.attsprite = {startX : 0, startY : 710, width : 140, height : 100};
            }
            else if(this.spriteNumber === 5){
                this.sprite = {startX : 880, startY : 510, width : 160, height : 155};
                this.attsprite = {startX : 110, startY : 720, width : 140, height : 100};
            }
            else if(this.spriteNumber === 6){
                this.attacked = false;
                this.sprite = {startX : 1060, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 7){
                this.sprite = {startX : 1230, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 8){
                this.sprite = {startX : 1400, startY : 510, width : 160, height : 155};
            }
            else if(this.spriteNumber === 9){
                this.sprite = {startX : 1580, startY : 310, width : 110, height : 65};
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
                width : 140,
                height : 155,
            };
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
            context.drawImage(state.monsterthreeImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        }
        context.drawImage(state.monsterthreeImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        // context.strokeRect( 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        // context.strokeRect( 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Monsterthree;