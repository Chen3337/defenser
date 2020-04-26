class Charactertwo {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.06;
        this.y = this.ScreenY * 0.8;
        this.sprite = { startX: 0, startY: 0, width: 85, height: 75 };
        this.attsprite = { startX: 315, startY: 375, width: 100, height: 80 };
        this.sizeX = this.ScreenX * 0.06;
        this.sizeY = this.ScreenY * 0.15;
        this.mode = 'move';
        this.spriteNumber = 0;
        this.cycle = 1;
        this.speed = this.ScreenX * (0.0001 * status.speed);
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
                    startX: 0 + (this.spriteNumber * 90),
                    startY: 780,
                    width: 90,
                    height: 80,
                }
            }
            else {
                this.sprite = {
                    startX: 350 + ((this.spriteNumber -4) * 67),
                    startY: 780,
                    width: 70,
                    height: 80,
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
                startX: 0 + (this.spriteNumber * 85),
                startY: 200,
                width: 90,
                height: 70,
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
                    startY: 90,
                    width: 75,
                    height: 85,
                }
            }
            else if (this.spriteNumber === 1) {
                this.sprite = {
                    startX: 90,
                    startY: 90,
                    width: 75,
                    height: 85,
                }
            }
            else if (this.spriteNumber === 2) {
                this.attacked = true;
                if (this.cycle === 31) {
                    this.hit = true;
                }
                this.sprite = {
                    startX: 170,
                    startY: 90,
                    width: 80,
                    height: 85,
                }
            }
            else if (this.spriteNumber === 3) {
                this.sprite = {
                    startX: 250,
                    startY: 90,
                    width: 95,
                    height: 85,
                };
            }
            else if (this.spriteNumber === 4) {
                this.attacked = false;
                this.sprite = {
                    startX: 355,
                    startY: 90,
                    width: 95,
                    height: 85,
                };
            }
            else if (this.spriteNumber === 5) {
                this.sprite = {
                    startX: 455,
                    startY: 90,
                    width: 95,
                    height: 85,
                };
            }
            if (this.cycle % 10 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 5) {
                this.spriteNumber = 0;
            }
        }
        else if (this.mode === 'stay') {
            this.sprite = { startX: 0, startY: 0, width: 85, height: 75 };
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
        context.scale(-1, 1);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        if (this.attacked) {
            context.drawImage(state.charactertwoImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        }
        //         context.strokeRect( 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        // context.strokeRect( 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.drawImage(state.charactertwoImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Charactertwo;