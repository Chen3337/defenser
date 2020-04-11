class Monsterone {
    constructor() {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = 200;
        this.y = this.ScreenY * 0.8;
        this.sprite = {
            startX : 0,
            startY : 0,
            width : 130,
            height : 180,
        }
        this.sizeX = this.ScreenX * 0.1;
        this.sizeY = this.ScreenY * 0.2;
        this.mode = 'move';
        this.spriteNumber = 0;
        this.cycle = 1;
        this.speed = this.ScreenX * 0.0005;
    }
    mode(mode) {
        this.mode = mode;
    }
    move(){
        this.x += this.speed;
    }
    spriteChange() {
        
        if(this.mode === 'stay'){
            this.sprite = {
                startX : 0,
                startY : 0,
                width : 130,
                height : 180,
            }
        }
        else if(this.mode === 'move'){
            this.sprite = {
                startX : 0  + (this.spriteNumber * 130),
                startY : 190,
                width : 130,
                height : 180,
            }
            if(this.cycle === 0 || this.cycle === 15 || this.cycle === 30 || this.cycle === 45){
                this.spriteNumber += 1;
            }
            if(this.spriteNumber > 3){
                this.spriteNumber = 0;
            }
        }
        
    }
    render(state) {
        this.move();
        this.spriteChange();
        this.cycle += 1;
        if(this.cycle > 60){
            this.cycle = 0;
        }
        
        const context = state.context;
        context.save()
        context.translate(this.x, this.y);
        context.scale(-1, 1);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        context.drawImage(state.monsteroneImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, 0, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Monsterone;