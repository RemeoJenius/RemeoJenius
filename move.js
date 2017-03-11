var WINDOWWIDTH=1024;
var WINDOWHEIGHT=768;
var MARGIN_TOP=0;
var MARGIN_LEFT=0;
const endTime = new Date(2014,7,8,14,47,52);
var curShowTimeSeconds = 0;

var balls=[];
const colors = ["#33B5E5","#0099CC","AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
	var canvas = document.getElementById("canvas");
	var content = canvas.getContext("2d");
	canvas.width=WINDOWWIDTH;
	canvas.height=WINDOWHEIGHT;
	curShowTimeSeconds = getCurShowTimeSeconds();
	setInterval(function(){
		render(content);
		update();
	},50);
}

function render(cxt){

	cxt.clearRect(0,0,WINDOWWIDTH,WINDOWHEIGHT);

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(8+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(8+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(8+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(8+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(8+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(8+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(8+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].colors;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,8,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(8+1)+(8+1),y+i*2*(8+1)+(8+1),8,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}
function getCurShowTimeSeconds () {
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);
	return ret>0?ret:0;
}
function update(){
	var nextShowTimeSeconds = getCurShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
	if(nextSeconds!=seconds){

		if(parseInt(hours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(hours/10));
		}
		if(parseInt(hours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(8+1),MARGIN_TOP,parseInt(hours%10));
		}
		if(parseInt(minutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(8+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if(parseInt(minutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(8+1),MARGIN_TOP,parseInt(minutes%10));
		}
		if(parseInt(seconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(8+1),MARGIN_TOP,parseInt(seconds/10));
		}
		if(parseInt(seconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(8+1),MARGIN_TOP,parseInt(seconds%10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}
	updateBalls();
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=WINDOWHEIGHT-8){
			balls[i].y=WINDOWHEIGHT-8;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	var cnt = 0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+8>0&&balls[i].x-8<WINDOWWIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length>cnt){
		balls.pop();
	}
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(8+1)+(8+1),
					y:y+i*2*(8+1)+(8+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					colors:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}