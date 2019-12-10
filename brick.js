class Brick{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 60;
        this.visible = true;
        switch(color){
            case 0:
                this.color = "red";
                break;
            
            case 1:
                this.color = "orange";
                break;
            
            case 2:
                this.color = "yellow";
                break;
            
            case 3:
                this.color = "green";
                break;
            
            case 4:
                this.color = "blue";
                break;
            
        }
    }



    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
}
