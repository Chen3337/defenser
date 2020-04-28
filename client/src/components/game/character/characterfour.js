class Characterfour {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.06;
        this.y = this.ScreenY * 0.8;
        this.sprite = { startX: 0, startY: 10, width: 50, height: 80 };
        this.attsprite = { startX: 0, startY: 650, width: 140, height: 190 };
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
            this.sprite = {
                startX: 73 + (this.spriteNumber * 52),
                startY: 625,
                width: 49,
                height: 80,
            }
            if (this.cycle % 4 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 13) {
                this.deletecharacter = true;
            }
        }
        else if (this.mode === 'move') {
            this.move();
            this.sprite = {
                startX: 0 + (this.spriteNumber * 55),
                startY: 90,
                width: 50,
                height: 80,
            }
            if (this.cycle % 15 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 3) {
                this.spriteNumber = 0;
            }
        }
        else if (this.mode === 'attack') {
            if (this.cycle === 26) {
                this.hit = true;
            }
            if (this.spriteNumber < 5) {
                this.sprite = {
                    startX: 0 + (this.spriteNumber * 56),
                    startY: 176,
                    width: 52,
                    height: 80,
                }
            }
            else if (this.spriteNumber === 5) {
                this.attacked = true;
                this.sprite = { startX: 385, startY: 176, width: 58, height: 80 }
                this.attsprite = { startX: 285, startY: 156, width: 90, height: 100 }
            }
            else if (this.spriteNumber === 6) {
                this.attsprite = { startX: 450, startY: 156, width: 90, height: 100 }
            }
            else if (this.spriteNumber === 7) {
                this.attsprite = { startX: 624, startY: 156, width: 90, height: 100 }
            }
            else if (this.spriteNumber === 8) {
                this.attsprite = { startX: 0, startY: 260, width: 90, height: 100 }
            }
            else if (this.spriteNumber === 9) {
                this.attacked = false;
                this.sprite = { startX: 0, startY: 176, width: 52, height: 80 }
            }
            if (this.cycle % 6 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 9) {
                this.spriteNumber = 0;
            }
        }
        else if (this.mode === 'stay') {
            this.sprite = { startX: 0, startY: 10, width: 50, height: 80 }
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
            context.drawImage(state.characterfourImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        }
        context.drawImage(state.characterfourImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Characterfour;