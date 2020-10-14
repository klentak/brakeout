el = document.getElementById('canvas');
ctx = el.getContext('2d');

ball = new Ball(325, 670, 8, 4, -4);
pad = new Pad(285, 680);
bricks = [];
score = 0;
brake_bricks = 1;
lives = 3;
stop = true;

function brick_create(){
    for(i=0; i<5; i++){
        bricks[i] = [];
        for(j=0; j<9; j++){
            bricks[i][j] = new Brick(11+(71*j), 30+(30*i), i);
        }
    }
}

function brick_draw(ctx){
    for(i=0; i<5; i++){
        for(j=0; j<9; j++){
            if(bricks[i][j].visible){
                bricks[i][j].draw(ctx);
            }
        }
    }
}
brick_create()

function frame(){
    ctx.clearRect(0,0,650,700);
    ctx.fillStyle = "gray";
    ctx.font = "15px Arial";
    ctx.fillText("SCORE: ", 10, 690);
    ctx.fillText("LIVES: ", 580, 690);
    ctx.fillText(score, 70, 690);
    ctx.fillText(lives, 630, 690);
    ball.draw(ctx);
    flag = 0;

    brick_draw(ctx);

    for(let i=0; i<5; i++){
        for(let j=0; j<9; j++){
            if(ball.cy>=bricks[i][j].y && bricks[i][j].visible == true && ball.cy<= bricks[i][j].y + bricks[i][j].h){
                if(ball.cx >= bricks[i][j].x - ball.r 
                    && ball.cx <= bricks[i][j].x + ball.r){
                    ball.dx = -ball.dx;
                    bricks[i][j].visible = false;
                }else if( ball.cy >= bricks[i][j].y-ball.r && ball.cy <= bricks[i][j].y + bricks[i][j].h){
                    if(ball.cx>=bricks[i][j].x - ball.r
                        && ball.cx<=bricks[i][j].x + bricks[i][j].w + ball.r){
                        if(i-1>0 && ball.dy>0 && bricks[i-1][j].visible == true){
                            ball.dx = -ball.dx;
                            score += 10;
                        }else if(bricks.length <= i && ball.dy<0 && bricks[i+1][j].visible == true){
                            ball.dx = -ball.dx;
                            score += 10;
                        }else{
                            ball.dy = -ball.dy;
                            score += 10;
                        }
                        bricks[i][j].visible = false;
                    }
                }
            }
            if(bricks[i][j].visible){
                flag=1;
            }
        }
    }

    if(flag == 0){
        lives++;
        pause();
        brick_create();
    }

    if( ball.cy >= pad.y && ball.cy <= pad.y + pad.h){
        if(ball.cx>=pad.x - ball.r
            && ball.cx<=pad.x + pad.w + ball.r){
            ball.dy = -ball.dy;
            if(ball.dx>0 && pad.dx<0){
                ball.dx= -4;
            }
            else if(ball.dx<0 && pad.dx>0){
                    ball.dx= 4;
            }else if(ball.dx>0){
                ball.dx+=0.2;
            }else if(ball.dx<0){
                ball.dx-=0.2;
            }
        }
    }

    if(ball.cy >= pad.y+pad.h){
        lives--;
        restart();
    }

    pad.draw(ctx);
    pad.move();

    if(!stop){
        requestAnimationFrame(frame);
    }
    ball.move();
}

function restart(){
    stop = true;
    if(lives <= 0){
        alert("GAME OVER, your score: "+score);
        score = 0;
        lives = 3;
    }else{
        if(score<200){
            score = 0;
        }else{
            score -= 200;
        }
    } 
        ball = new Ball(325, 670, 8, 4, -4);
        pad = new Pad(285, 680);
        requestAnimationFrame(frame);
}

function pause(){
    stop = true;
    ball = new Ball(325, 670, 8, 4, -4);
    pad = new Pad(285, 680);
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

function keyDown(e){
    if(e.keyCode == "190"){
        pad.dx=3;
        if(stop==true){
            ball = new Ball(325, 670, 8, 4, -4);
            stop = false;
            requestAnimationFrame(frame);
        }
    }
    if(e.keyCode == "188"){
        pad.dx=-3;
        if(stop==true){
            stop = false;
            ball = new Ball(325, 670, 8, -4, -4);
            requestAnimationFrame(frame);
        }
    }
}

function keyUp(e){
    if(e.keyCode == "190" && pad.dx>0){
        pad.dx=0;
    }
    if(e.keyCode == "188" && pad.dx<0){
        pad.dx=0;
    }
}