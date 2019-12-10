class Ball{
    constructor(x, y, r, dx, dy){
        this.cx = x;
        this.cy = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;

        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        this.color = `rgb(${r},${g},${b})`;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.r, 0, 2*Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
    }
    move(){
        this.cx += this.dx; 
        this.cy += this.dy;

        if(this.dy > 0 && this.cy > 700 - this.r){
            this.dy = -this.dy;
            this.cy = 700 - this.r;
        }
        
        if(this.dy < 0 && this.cy <= 0 + this.r){
            this.dy = -this.dy;
            this.cy = this.r;
        }
        
        if(this.dx > 0 && this.cx > 650 - this.r){
            this.dx = -this.dx;
            this.cx = 650 - this.r;
            this.dy = this.dy;
        }

        if(this.dx < 0 && this.cx < 0 + this.r){
            this.dx = -this.dx;
            this.cx = this.r;
            this.dy = this.dy;
        }
    }
}