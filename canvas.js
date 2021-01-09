var stage = new createjs.Stage("lineDate");
var clientWidth = document.querySelector("body").clientWidth-1;
console.log(clientWidth);
var canvas = document.getElementById("lineDate");
var angle = [2 * Math.PI * 100, 2 * Math.PI * 100, 2 * Math.PI * 100];
var cir_shape = [];
var base_line;
var shift_top = 20;
var circle_size = 15;

window.onresize = function() {
    clientWidth = document.querySelector("body").clientWidth-1;
    cir_shape = [];
    stage = new createjs.Stage("lineDate");
    draw_init();
    //stage.update();
};

function draw_init(){
    canvas.width = clientWidth;
    
    stage.enableMouseOver(10);

    for(let i=0;i<3;i++){
        var circle = new createjs.Shape();
        circle.x = clientWidth/6 * (i*2+1);
        circle.graphics.beginFill("white").drawCircle(circle.x, shift_top, circle_size);
        circle.anim = false;
        circle.lock = false;
        circle.setTransform(circle.x, shift_top, 1, 1, 0, 0, 0, circle.x, shift_top);
        //circle.addEventListener("mouseover", activeAnim);
        //circle.addEventListener("mouseout", function(e){e.target.anim = false;});
        stage.addChild(circle);
        cir_shape.push(circle);
        console.log(circle);
        console.log(circle.graphics.command.x);
    }

    base_line = new createjs.Shape();
    base_line.graphics.beginFill("white").drawRect(0, shift_top - 3, clientWidth, 5);;
    stage.addChild(base_line);

    var polygon = new createjs.Shape();
    polygon.graphics.beginStroke("white");
    polygon.graphics.beginFill("white").moveTo(clientWidth/2-10, 60).lineTo(clientWidth/2+10, 60).lineTo(clientWidth/2, 40).lineTo(clientWidth/2-10, 60);
    stage.addChild(polygon);
    console.log(polygon);

    createjs.Ticker.framerate=60; 
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();    
}

function tick(event) {    
    for(let i=0;i<3;i++){
        if(cir_shape[0].lock){
            if(angle[i] != Math.PI * 100)
                angle[i] = 2 * Math.PI * 100 - 10;
        }
        var scale = Math.cos(angle[i]/100);
        if(angle[i] < 2 * Math.PI * 100 || cir_shape[i].anim){
            cir_shape[i].setTransform(cir_shape[i].x,shift_top, Math.abs(scale+1)/4 + 0.5, Math.abs(scale+1)/4 + 0.5,0,0,0,cir_shape[i].x,shift_top);
        }
        if(angle[i] >= 2 * Math.PI * 100){
            if(cir_shape[i].anim){
                angle[i] = 0;
            }
        }else{
            angle[i] += 10;
        }
    }
    stage.update(event);
}

function activeAnim(event){
    for(let i=0;i<3;i++){
        if(cir_shape[i].anim){
            cir_shape[i].anim = false;
            cir_shape[i].setTransform(clientWidth/6 * (i*2+1), shift_top, 1, 1, 0, 0, 0, clientWidth/6 * (i*2+1), shift_top);
        }
    }
    event.target.anim = true;
    stage.update();
}

///Debug
$(document).ready(function() {
    $('div#clicked1').click(function (){
        cir_shape[0].anim = !cir_shape[0].anim;
        $('div#clicked1').text("anim[0] = " + cir_shape[0].anim);
    });
    $('div#clicked2').click(function (){
        cir_shape[1].anim = !cir_shape[1].anim;
        $('div#clicked2').text("anim[1] = " + cir_shape[1].anim);
    });
    $('div#clicked3').click(function (){
        cir_shape[2].anim = !cir_shape[2].anim;
        $('div#clicked3').text("anim[2] = " + cir_shape[2].anim);
    });
});