class Characterthree {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.06;
        this.y = this.ScreenY * 0.8;
        this.sprite = { startX: 0, startY: 0, width: 50, height: 95 };
        this.attsprite = { startX: 120, startY: 410, width: 64, height: 95 };
        this.sizeX = this.ScreenX * 0.06;
        this.sizeY = this.ScreenY * 0.15;
        this.mode = 'move';
        this.spriteNumber = 0;
        this.cycle = 1;
        this.speed = this.ScreenX * 0.0005;
        this.attacked = false;
        this.hp = status.hp;
        this.damage = status.damage;
        this.deletecharacter = false;
        this.hit = false;
    }
    attackedDamage(damage) {
        this.hp -= damage;
    }
    finishHit() {
        this.hit = false;
    }
    changemode(mode) {
        if (this.mode !== 'dead') {
            this.mode = mode;
            this.cycle = 1;
            this.attacked = false;
            this.spriteNumber = 0;
        }
    }
    move() {
        this.x += this.speed;
    }
    spriteChange() {
        if (this.mode === 'dead') {
            if(this.spriteNumber < 4){
                this.sprite = {
                    startX: 0 + (this.spriteNumber * 84),
                    startY: 810,
                    width: 80,
                    height: 105,
                }
            }
            else {
                this.sprite = {
                    startX: 325 + ((this.spriteNumber -4) * 73),
                    startY: 810,
                    width: 73,
                    height: 105,
                }
            }
            
            if (this.cycle % 5 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 11) {
                this.deletecharacter = true;
            }
        }
        else if (this.mode === 'move') {
            this.move();
            this.sprite = {
                startX: 0 + (this.spriteNumber * 60),
                startY: 230,
                width: 50,
                height: 95,
            }
            if (this.cycle % 15 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 3) {
                this.spriteNumber = 0;
            }
        }
        else if (this.mode === 'attack') {
            if (this.spriteNumber === 0) {
                this.sprite = {
                    startX: 0,
                    startY: 410,
                    width: 60,
                    height: 95,
                }
            }
            else if (this.spriteNumber === 1) {
                this.sprite = {
                    startX: 60,
                    startY: 410,
                    width: 60,
                    height: 95,
                }
            }
            else if (this.spriteNumber === 2) {
                this.attacked = true;
                if (this.cycle === 26) {
                    this.hit = true;
                }
                this.sprite = {
                    startX: 184,
                    startY: 410,
                    width: 70,
                    height: 95,
                }
            }
            else if (this.spriteNumber === 3) {
                this.sprite = {
                    startX: 184,
                    startY: 410,
                    width: 70,
                    height: 95,
                }
            }
            else if (this.spriteNumber === 4) {
                this.attacked = false;
                this.sprite = {
                    startX: 184,
                    startY: 410,
                    width: 70,
                    height: 95,
                }
            }
            else if (this.spriteNumber === 5) {
                this.sprite = {
                    startX: 60,
                    startY: 410,
                    width: 60,
                    height: 95,
                }
            }
            if (this.cycle % 10 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 5) {
                this.spriteNumber = 0;
            }
        }
        else if (this.mode === 'stay') {
            this.sprite = { startX: 0, startY: 0, width: 50, height: 95 };
        }
    }
    render(state) {
        this.spriteChange();
        this.cycle += 1;
        if (this.cycle > 60) {
            this.cycle = 1;
        }
        if (this.hp < 1) {
            this.changemode('dead');
        }
        const context = state.context;
        context.save()
        context.translate(this.x, this.y);
        context.font = "20px Arial";
        context.fillText(this.hp, (0 - this.sizeX * 0.75), -20 - this.sizeY);
        context.scale(-1, 1);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        if (this.attacked) {
            context.drawImage(state.characterthreeImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        }
        context.drawImage(state.characterthreeImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Characterthree;