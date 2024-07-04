$(document).ready(function(){
	var game = {score:0, min:100, max:100};
	var stage = new createjs.Stage("canvas");
	var stage2 = new createjs.Stage("canvas2");

	var redCon = new createjs.Container(),
		purpCon = new createjs.Container(),
		blueCon = new createjs.Container();
	var parts = [], barParts = [], barParts2 = [];
	var particles = [
		{
			name : "red",
			baseRadius : 50,
			count : 32,
			bg : /*"255,0,0,"*/"151, 55, 22,",
			pos : {
				x : 40,
				y : 80
			},
			staggerVars: {
				x : 9,
				y : 1.2
			} 
		},
		{
			name : "purp",
			baseRadius : 40,
			count : 31,
			bg : "116,52,116,",
			pos : {
				x : 40,
				y : 90
			},
			staggerVars: {
				x : 9,
				y : 1
			}  
		},
		{
			name : "blue",
			baseRadius : 5,
			count : 45,
			bg : "0,162,232,",
			pos : {
				x : 30,
				y : 80
			},
			staggerVars: {
				x : 6,
				y : 0
			}  
		}
	];

	var conArr = [redCon, purpCon, blueCon];
	var newCon = new createjs.Container();
	function createParticles(){
		for(var j = 0; j < particles.length; j++){
			var part = particles[j];
			for(var i = 0; i < part.count; i++){
				var rad = part.baseRadius + 0.5*i + Math.random()*20,
					xpos = part.pos.x + i*part.staggerVars.x,
					ypos = part.pos.y - i*part.staggerVars.y;
				var circle = new createjs.Shape();
		        circle.graphics
	        	.beginRadialGradientFill(["rgba("+ part.bg +"0.5","rgba("+ part.bg +"0.5)","rgba("+ part.bg +"0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
				.drawCircle(xpos, ypos, rad);
		        circle.x = xpos;
		        circle.y = ypos;
		        circle.alpha = 0;
		        //circle.compositeOperation = 'lighter';
				parts.push(circle);
		        conArr[j].addChild(circle);		        
			}
			stage.addChild(conArr[j]);
		}
		console.log(particles)
		console.log(conArr)
		for(var i = 0; i < 45; i++){
			var rad = 20 + Math.random()*10,
				xpos = 40 + i*7,
				ypos = 0;
			var circle = new createjs.Shape();
	        circle.graphics
	        .beginRadialGradientFill(["rgba(151, 55, 22,0.2","rgba(151, 55, 22,0.2)","rgba(151, 55, 22,0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
			.drawCircle(xpos, ypos, rad);
	        circle.x = xpos;
	        circle.y = ypos;
	        circle.alpha = 0;
	        //circle.compositeOperation = 'lighter';
			barParts.push(circle);        
			stage2.addChild(circle);
		}

		for(var i = 0; i < 45; i++){
			var rad = 20 + Math.random()*10,
				xpos = 45 + i*7,
				ypos = 0;
			var circle = new createjs.Shape();
	        circle.graphics
	        .beginRadialGradientFill(["rgba(151, 55, 22,0.2","rgba(151, 55, 22,0.2)","rgba(151, 55, 22,0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
			.drawCircle(xpos, ypos, rad);
	        circle.x = xpos;
	        circle.y = ypos;
	        circle.alpha = 0;
	        //circle.compositeOperation = 'lighter';
			barParts2.push(circle);        
			stage2.addChild(circle);
		}
	};

	createParticles();
	TweenLite.ticker.fps(60);
    TweenLite.ticker.addEventListener("tick", stage.update, stage);
    TweenLite.ticker.addEventListener("tick", stage2.update, stage2);
	
    var tl = new TimelineMax();
    tl
    .add("enter1")
    .to(barParts, 0.05, {
    	y:"-=15"
    }, "enter1")
    .to(barParts2, 0.05, {
    	y:"+=65"
    }, "enter1")
    .to(".goal-ind", 3, {width:"100%"}, "enter1")
  	.to(game, 3, {score:100, roundProps:"score", onUpdate:updateHandler}, "enter1")
  	.to($(".progress-ind"), 3, {width:"33%"}, "enter1")	
    .add("enter2")
	.to(game, 3, {score:200, roundProps:"score", onUpdate:updateHandler}, "enter2")
  	.to($(".progress-ind"), 3, {width:"66%"}, "enter2")
  	.staggerTo(conArr[2].children, 1, {
		y:"-=5",
		alpha:0.2,
		onComplete:upDown
	}, 0.06, "enter2")
	.staggerTo(conArr[1].children, 1, {
		alpha:0.3, 
		onComplete:upDown
	}, 0.07, "enter2")
	.staggerTo(conArr[0].children, 1, {		
		alpha:0.1, 
		onComplete:upDown
	}, 0.07, "enter2")
    .add("enter3")
    .to(game, 4, {score:300, roundProps:"score", onUpdate:updateHandler}, "enter3")
  	.to($(".progress-ind"), 4, {width:"100%"}, "enter3")
  	.staggerTo(barParts, 1, {
    	alpha:1,
    	onComplete:upDown
    }, 0.05, "enter3")
    .staggerTo(barParts2, 0.5, {
    	alpha:1,
    	onComplete:upDown
    }, 0.07, "enter3")
    .staggerTo(conArr[2].children, 0.8, {y:"+=5",alpha:0.3}, 0.07, "enter3")
    .staggerTo(conArr[1].children, 0.8, {y:"+=15", alpha:0.6}, 0.05, "enter3")
    .staggerTo(conArr[0].children, 0.8, {y:"-=5", alpha:0.5}, 0.05, "enter3")
    .to(".goal-bar", 3, {borderRadius:5, boxShadow:"inset 0px 0px 7px 7px rgba(151, 55, 22, 0.5), 0px 0px 7px 7px rgba(151, 55, 22, 0.4)"}, "enter3+=3")
    .to(".goal-ind", 3, {backgroundColor:"rgba(132, 158, 52, 0.92)"}, "enter3+=2")
	;
	
	tl.timeScale(1);
	function pauseTl(){
		tl.pause();
	}

	function playTl(){
		tl.play();
	}

	function resetTl(){
		tl.tweenTo("enter1").duration(1);
	}

	$("button#play").on("click", playTl);
	$("button#pause").on("click", pauseTl);
	$("button#reset").on("click", resetTl);

    function updateHandler() {
        document.getElementById("score").innerHTML = game.score;
    }

	function upDown(){
		TweenMax.to(this.target, 1 + Math.random()*0.2, {
			x:"+=15",			
			y:"+=5", 
			ease:Back.easeInOut,
			repeat:-1,
			yoyo:true
		});
	}

});