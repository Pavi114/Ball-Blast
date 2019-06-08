 	window.onload = function(){
        var canvas = document.querySelector("#canvas");
        var ctx = canvas.getContext("2d");
        var bullets,flag,rocks,loop,collide_canon,curr_score,paused,timeInterval;
        var image = [];

        //Image Loading
        image.push(new Image());
        image[0].src = "lib/images/cannon.jpg";
        image.push(new Image());
        image[1].src = "lib/images/ballRed.gif";
        image.push(new Image());
        image[2].src = "lib/images/ballBlue.gif";
        image.push(new Image());
        image[3].src = "lib/images/ballGreen.gif";
        image.push(new Image());
        image[4].src = "lib/images/bulletPic.gif";

        //audio loading
        var audio = new Audio("lib/audio/Ball Blast.mp3");
        audio.addEventListener("ended",function(){
            this.currentTime = 0;
            this.play();
        })
        

        canvas.width = window.innerWidth * 0.4;
        canvas.height = window.innerHeight * 0.7;    

        document.onkeydown = function(e){
            if(!collide_canon){
             if(e.keyCode == 32){
              init();
              animate();
              audio.play();
             } 
             if(e.keyCode == 37 || e.keyCode == 65){
               if(!paused){
                canon.collideWall();
                canon.moveLeft();   
                }
             }
             else if(e.keyCode == 39 || e.keyCode == 68){
                 if(!paused){
                   canon.collideWall();
                   canon.moveRight();   
                   }     
                }  
             else if(e.keyCode == 80){
                 paused = true;
                 pauseScreen();
                 return false;
                }
             else if(e.keyCode == 82){
                paused = false;
                animate();
                return false;
               } 
            }
        }

    function clear(){
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    }

    var ground = {
        x:0,
        y: canvas.height - 50,
        width: canvas.width,
        height: 50,
        // color: "green",
        draw: function(){
            ctx.save();
            ctx.beginPath();
            var grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
            grd.addColorStop(0,"#061700");
            grd.addColorStop(0.5,"#56ab2f");
            grd.addColorStop(1,"#a8e063");
            ctx.fillStyle = grd;
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.closePath();
            ctx.restore();
        }

    };

    var setting = {
        x:0,
        y:0,
        width: canvas.width,
        height: canvas.height - 40,
        color: "rgb(208,256,253)",
        draw: function(){
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.closePath();
            ctx.restore();
        }
    };

    var cloud = {
        x: 0,
        y: random(20,70),
        radx: random(30,40),
        rady: random(15,20),
        dx: 0.5,
        draw: function(){
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "#FFFFFF";
            ctx.ellipse(this.x,this.y,this.radx,this.rady,0,0,2*Math.PI);
            ctx.fill();
            ctx.restore();
        },
        update: function(){
         this.x += this.dx;
         this.draw();
     },
     reset: function(){
        this.y = random(20,70);
        this.radx = random(20,30);
        this.rady = random(10,15);
        this.x = 0;
     }
    };

    function mountains(){
        ctx.save();

        ctx.beginPath();
        ctx.fillStyle = "rgba(113,199,236,0.7)";
        ctx.moveTo(0,canvas.height - 30);
        ctx.lineTo(0,canvas.height/2);
        ctx.lineTo(canvas.width/4,60);
        ctx.lineTo(3*canvas.width/4,canvas.height/2 + 40);
        ctx.lineTo(canvas.width - 45,canvas.height/2 - 50);
        ctx.lineTo(canvas.width,canvas.height/2 + 10);
        ctx.lineTo(canvas.width,canvas.height - 30);
        ctx.closePath();
        ctx.fill();

        trees(50,canvas.height - 68);
        trees(70,canvas.height - 90);
        trees(90,canvas.height - 78);
        trees(120,canvas.height - 100);
        trees(130,canvas.height - 120);
        trees(150,canvas.height - 81);
        trees(170,canvas.height - 78);
        trees(180,canvas.height - 75);
        trees(canvas.width - 70,canvas.height - 60);
        trees(canvas.width - 85,canvas.height - 80);
        trees(canvas.width - 100,canvas.height - 62);
        trees(canvas.width - 50,canvas.height - 70);
        trees(canvas.width - 30,canvas.height - 58);

        ctx.beginPath();
        ctx.fillStyle = "rgb(54,200,45)";
        ctx.moveTo(0,canvas.height - 30);
        ctx.lineTo(0,canvas.height - 40);
        ctx.quadraticCurveTo(canvas.width/4,canvas.height/2 + 100,canvas.width/2,canvas.height - 50);
        ctx.quadraticCurveTo(3*canvas.width/4,3*canvas.height/4 + 40,canvas.width,canvas.height - 50);
        ctx.lineTo(canvas.width,canvas.height - 30);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(85,136,240,0.4)";
        ctx.moveTo(0,canvas.height - 30);
        ctx.lineTo(0,canvas.height - 40);
        ctx.lineTo(canvas.width/4 + 10,canvas.height/2 + 10);
        ctx.lineTo(canvas.width/2,canvas.height - 50);
        ctx.lineTo(3*canvas.width/4 - 10,canvas.height - 57);
        ctx.lineTo(3*canvas.width/4 + 50,canvas.height/2 + 60);
        ctx.lineTo(canvas.width,canvas.height - 40);
        ctx.lineTo(canvas.width,canvas.height - 30);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(85,136,255,0.3)";
        ctx.moveTo(0,canvas.height - 30);
        ctx.lineTo(0,canvas.height/2 + 30);
        ctx.lineTo(canvas.width/4 - 25,canvas.height/2 - 100);
        ctx.lineTo(canvas.width/4 + 60,canvas.height/2 + 20);
        ctx.lineTo(canvas.width/2 + 5,canvas.height/2 - 49);
        ctx.lineTo(3*canvas.width/4,canvas.height/2 + 40);
        ctx.lineTo(3*canvas.width/4 + 28,canvas.height/2 + 6);
        ctx.lineTo(canvas.width - 30,canvas.height/2 + 40);
        ctx.lineTo(canvas.width,canvas.height/2 + 20);
        ctx.lineTo(canvas.width,canvas.height - 30);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function trees(x,y){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgb(139,69,19)";
        ctx.fillRect(x,y,3,5);
        ctx.fillStyle = "rgb(54,200,45)";
        ctx.moveTo(x,y);
        ctx.lineTo(x-5,y+2);
        ctx.lineTo(x,y-5);
        ctx.lineTo(x-7,y-3);
        ctx.lineTo(x,y-6);
        ctx.lineTo(x+2,y-12);
        ctx.lineTo(x+3,y-6);
        ctx.lineTo(x+8,y-3);
        ctx.lineTo(x+3,y-3);
        ctx.lineTo(x+8,y+1);
        ctx.lineTo(x+3,y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    var canon = {

        x: canvas.width/2,
        y: canvas.height - 80,
        width: 50,
        height: 50,
        dx: 7,
        acc: 0,
        color: "rgb(255,0,0)",

        draw: function(){
          ctx.save();
          ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x,this.y,this.width,this.height);
          ctx.drawImage(image[0],this.x,this.y,this.width,this.height);
          ctx.closePath();
          ctx.restore();
        },

        moveLeft: function(){
            this.x -= this.dx;
            this.draw();
        },

        moveRight: function(){
            this.x += this.dx;
            this.draw();
        },

        collideWall: function(){
            if(this.x + this.width >= canvas.width){
                this.x = canvas.width - this.width;
            }
            if(this.x <= 0){
                this.x = 0;
            }
        }

    };  

    function bullet(){
        this.x = canon.x + canon.width/2;
        this.y = canon.y + 7;
        this.radius = 4;
        this.speed = 10;       
        this.update = function(){
            this.y -= this.speed;
            this.draw();
        }
        this.draw = function(){
           ctx.save();
           ctx.beginPath();
           // ctx.fillStyle = "rgb(190,150,45)";
           // ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
           ctx.drawImage(image[4],this.x - 2,this.y,2*this.radius,2*this.radius);
           ctx.fill();
           ctx.restore();
        }
    }

    function rock(x,y,strength,side,radius){
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.curr_strength = strength;
        this.radius = radius;
        // this.color = "rgb(0,0,190)";
        this.vx = 2;
        this.vy = 0;
        this.gravity = 0.15; 
        this.pic = image[random(1,3)];
        this.side = side;
        this.draw = function(){
            ctx.save();
            ctx.beginPath();
            // ctx.fillStyle = this.color;
            // ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
            // ctx.fill();
            ctx.drawImage(this.pic,this.x - this.radius,this.y - this.radius,2*this.radius,2*this.radius);
            ctx.font = "25px Consolas";
            ctx.fillStyle = "white";
            ctx.fillText(this.curr_strength,this.x - 5,this.y + 2);
            ctx.restore();
        };
        this.update = function(){
            if(this.side == "left"){
                this.x += this.vx;
            }
            else{
                this.x -= this.vx;
            }

            this.y += this.vy;
            this.vy += this.gravity;

            this.collideGround();
            this.collideWalls();

            this.draw();
        };

        this.collideGround = function(){
          if(this.y + this.radius >= ground.y){
            this.vy = -this.vy;
            this.y = ground.y - this.radius;
         }
         else if(this.y - this.radius <= 0){
            this.vy = -this.vy;
            this.y = this.radius;
           }
        }

        this.collideWalls = function(){
            if(this.x + this.radius >= canvas.width){
                this.vx = -this.vx;
                this.x = canvas.width - this.radius;
            }
            else if(this.x - this.radius <= 0){
                this.vx = -this.vx;
                this.x = this.radius;
            }
        }
    }


   function increaseBulletRate(){
      if(!(curr_score % 40) && timeInterval > 10 && curr_score > base_score){
           timeInterval -= 20;
           clearInterval(time);
           time = setInterval(function(){
            bullets.push(new bullet);
         },timeInterval);
           // console.log(timeInterval);
           base_score = curr_score;
        }
    }


    function drawRocks(){
        for(var i = 0;i <rocks.length;i++){
            rocks[i].update();
        }
    }

    function drawClouds(){

        if(cloud.x > canvas.width){
            cloud.reset();
        }

        cloud.update();    
    }

    function drawBullets(){
        for(var i = 0;i<bullets.length;i++){
            bullets[i].update();
        }  
    }

    function drawScore(){
     ctx.save();
     ctx.fillStyle = "#000000";
     ctx.font = "40px Rubik";
     ctx.fillText(curr_score,canvas.width/2 - 20,50);
     ctx.restore();
    }

    function newRock(){
       var side;
       if(!paused && rocks.length < 3){
         if(flag == 1){
           side = "left";
           x = 0;
         } 
         else{
          side = "right";
          x = canvas.width;
         }
         flag *= -1;
         var strength = random(30,100);
         var radius = random(40,50);
         var y = random(radius,canvas.width/2 - 30);
         rocks.push(new rock(x,y,strength,side,radius));
        }
    }

    function random(min,max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    function collideCanon(rock){
        var distX = Math.abs(rock.x - canon.x - canon.width/2);
        var distY = Math.abs(rock.y - canon.y - canon.height/2);
        var dist = Math.pow(dx,2) + Math.pow(dy,2);

        if(distX > (rock.radius + canon.width/2) || distY > (rock.radius + canon.height/2)){
            return false;
        }
        if(distX <= canon.width/2 || distY <= canon.height/2){
            return true;
        }

        var dx = distX-canon.width/2;
        var dy = distY-canon.height/2;
        return (Math.pow(dx,2) + Math.pow(dy,2) <= Math.pow(rock.radius,2));
    }

    function splitting(rockHit){
        if(rockHit.radius/2 > 15){
            rocks.push(new rock(rockHit.x,rockHit.y,Math.floor(rockHit.strength /2),"left",rockHit.radius/2));
            rocks.push(new rock(rockHit.x,rockHit.y,Math.floor(rockHit.strength/2),"right",rockHit.radius/2));
        }
    }

    function rockSplit(){
       for(var i = 0;i<rocks.length;i++){
            if(rocks[i].curr_strength <= 0){
                splitting(rocks[i]);
                rocks.splice(i,1);
                break;
            }
        }
    }

    function collideRock(bullet){
        var distX = Math.abs(bullet.x - this.x);
        var distY = Math.abs(bullet.y - this.y);
        var dist = Math.abs(bullet.radius + this.radius);
        return (Math.pow(distX,2) + Math.pow(distY,2) <= Math.pow(dist,2));
    }

    function gameOver(){
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.4)"; 
        ctx.fillRect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2 - 50);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Consolas";
        ctx.fillText(curr_score,canvas.width/4 + 80,canvas.height/2 - 70);
        ctx.font = "25px Consolas";

        var highScore = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : curr_score;
        if(highScore <= curr_score){
            highScore = curr_score;
            localStorage.setItem("score",highScore);
        }

        ctx.fillText("Top Score: " + highScore,canvas.width/4  + 10,canvas.height/2 - 35);
        ctx.font = "20px Consolas";
        ctx.fillText("Press any key for",canvas.width/4 + 10,canvas.height/2);
        ctx.fillText("a new game ",canvas.width/4 + 10,canvas.height/2 + 25);
        ctx.restore();
    }

    function startScreen(){
        ctx.save();
        ctx.fillStyle = "rgba(255,153,102,0.7)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "rgb(255,153,102)";
        ctx.fillRect(0,0,canvas.width/4,canvas.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#ff4d00"; 
        ctx.font = "40px Raleway";
        ctx.fillText("BALL",canvas.width/2 - 30,60);
        ctx.fillText("BLAST",canvas.width/2 + 30,105);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.font = "20px Consolas";
        ctx.fillText("Instructions: ",canvas.width/4 - 50,canvas.height/2 - 20);
        ctx.fillText("1. Use arrow keys(L/R) or A/D to move",canvas.width/4 - 60,canvas.height/2 + 15);
        ctx.fillText("2. Press P to pause and R to resume",canvas.width/4 - 60,canvas.height/2 + 40);
        ctx.fillText("3. Press space to start the game",canvas.width/4 - 60,canvas.height/2 + 65);
        ctx.restore();
    }

    function pauseScreen(){
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.4)"; 
        ctx.fillRect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2 - 80);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Raleway";
        ctx.fillText("GAME PAUSED",canvas.width/4,canvas.height/2 - 70);
        ctx.font = "20px Consolas";
        ctx.fillText("Press R to resume",canvas.width/4  + 10,canvas.height/2 - 25);
        ctx.restore();
    }

    function init(){
        clear();
        curr_score = 0;
        bullets = [];
        rocks = [];
        flag = 1;
        paused = false;
        timeInterval = 90;
        collide_canon = false;
        base_score = 0;
        loop = setInterval(newRock,5000);
        time = setInterval(function(){
            bullets.push(new bullet());
        },timeInterval);
    }

    function animate(){
        if(!paused){
            clear();
            ground.draw();
            setting.draw();
            drawClouds();
            mountains();
            canon.draw();
            drawBullets();
            drawRocks();
            drawScore();
            increaseBulletRate();
            
            //cannon collision
            for(var i = 0;i<rocks.length;i++){
              if(collideCanon(rocks[i])){
                  collide_canon = true;
                  gameOver();
                  cancelAnimationFrame(id);
                  clearInterval(loop);
                  clearInterval(time);
                  document.onkeypress = function(event){
                     init();
                     animate();
                 }
                 return;
               }
            }
    
           //bullet collision
           for(var i = 0;i<rocks.length;i++){
             var index = bullets.findIndex(collideRock,rocks[i]);
             if(index != -1){
                 curr_score++;
                 bullets.splice(index,1);
                 rocks[i].curr_strength--;
                 rocks[i].draw();
                 break;
             }
         }
         
         //splitting of rocks when strength = 0
         rockSplit();

         var id = window.requestAnimationFrame(animate);
        }
    }

    startScreen();
}   




