class Pad{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.h = 10;
        this.w = 80;
        this.dx = 0;
        this.color = "white";

    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
    move(){
        this.x += this.dx;

        //zabezpieczenie aby nie wyleciała dołem
        if(this.x > 650-this.h){
            this.x = 650-this.h;
        }else if(this.x < 0){
            this.x = 0;

        }
    }
}