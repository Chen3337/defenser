class Monsterone {
    constructor() {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = -200;
        this.y = this.ScreenY * 0.8;
        this.sprite = {
            startX : 0,
            startY : 0,
            width : 130,
            height : 180,
        }
        this.sizeX = this.ScreenX * 0.1;
        this.sizeY = this.ScreenY * 0.2;
    }
    
    render(state) {
        const context = state.context;
        context.scale(-1, 1);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        context.drawImage(state.monsteroneImage, this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, this.x, (this.y - this.sizeY), this.sizeX, this.sizeY);
    }
}
export default Monsterone;