class Castle {
    constructor(status) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.x = this.ScreenX * 0.06;
        this.y = this.ScreenY * 0.8;
        this.sizeX = this.ScreenX * 0.06;
        this.sizeY = this.ScreenY * 0.40;
        this.hp = status.hp;
        this.coin = status.coin;
        this.income = status.income;
    }
    addCoin(amount) {
        this.coin += amount;
    }
    minusCoin(amount) {
        this.coin -= amount
    }
    attackedDamage(damage) {
        this.hp -= damage;
    }
    render(state) {
        const context = state.context;
        context.save()
        context.translate(this.x, this.y);
        context.font = "20px Arial";
        context.fillText(this.hp, (0 - this.sizeX * 0.75), -20 - this.sizeY);
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        context.drawImage(state.castleImage, 50, 0, 50, 120, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        context.restore();
    }
}
export default Castle;