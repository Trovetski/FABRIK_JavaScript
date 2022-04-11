/*
     A code to impleament FABRIC
     Algorithm in javascript by
     Aditya Gadhavi
*/

let overStart = false;
let overEnd = false;

let xOffset = 0.0;
let yOffset = 0.0;

let nodes = []; //to store nodes obviously

let minD = 100;

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    distanceTo(x,y) {
        return dist(x,y,this.x,this.y);
    }

    static getPoint(t,s){
        let p = new Point();
		
		let d = dist(t.x,t.y,s.x,s.y);
		
		let dx = (t.x-s.x)/d;
		let dy = (t.y-s.y)/d;
		
		p.x = (int) (t.x - dx*minD);
		p.y = (int) (t.y - dy*minD);
		
		return p;
    }

    static FABRIK(){
		let t = target;
		let s = start;
		let len = nodes.length-1;//number of nodes-1
		for(let i=0;i<50;i++){
			//forward step
			nodes[len].x = t.x;
			nodes[len].y = t.y;
			
			for(let j=1;j<=len;j++){
				nodes[len-j] = Point.getPoint(nodes[len-j+1],nodes[len-j]);
			}
			
			//backward step
			nodes[0].x = s.x;
			nodes[0].y = s.y;
			for(let j=1;j<=len;j++){
				nodes[j] = Point.getPoint(nodes[j-1],nodes[j]);
			}
		}
	}
}

let start = new Point(750, 300);
let target = new Point(100,100);

function setup(){
    canvas = createCanvas(1500,735);
    textSize(24);

    //number of points
    slider = createSlider(2, 10, 3);
    slider.position(500,710);
    slider.style('width', '200px');
    slider.input(generateNodes);
    
    //line length
    slider1 = createSlider(25, 250, 100);
    slider1.position(800,710);
    slider1.style('width', '200px');
    slider1.input(generateNodes);

    noLoop();
    generateNodes();
}

function draw(){
    let nPoints = nodes.length;

    clear();
    background(58); // set background

    //set text
    stroke('white');
    strokeWeight(0);

    text('Nodes',410,720);
    text('Length',710,720);

    // set nodes
    stroke('black');
    strokeWeight(8);

    for(i=0;i<nPoints;i++){
        point(nodes[i].x,nodes[i].y);
    }

    strokeWeight(2);

    for(i=0;i<nPoints-1;i++){
        line(nodes[i].x,nodes[i].y,nodes[i+1].x,nodes[i+1].y);
    }

    //outer circles of start and end
    stroke('gray');
    strokeWeight(20);

    point(start.x,start.y);
    point(target.x,target.y);

    //start point
    stroke('yellow');
    strokeWeight(15);

    point(start.x,start.y);

    //end point
    stroke('green');
    strokeWeight(15);

    point(target.x,target.y);

}

function mousePressed() {
    if(start.distanceTo(mouseX,mouseY)<12){
        overStart = true;

        xOffset = start.x - mouseX;
        yOffset = start.y - mouseY;
        Point.FABRIK();
    }
    if(target.distanceTo(mouseX,mouseY)<12){
        overEnd = true;

        xOffset = target.x - mouseX;
        yOffset = target.y - mouseY;
        Point.FABRIK();
    }
  }
  
function mouseDragged() {
    if(overStart){
        start.x = mouseX + xOffset;
        start.y = mouseY + yOffset;
    }else if(overEnd){
        target.x = mouseX + xOffset;
        target.y = mouseY + yOffset;
    }
    Point.FABRIK();
    redraw();
  }
  
function mouseReleased() {
    overStart = false;
    overEnd = false;
  }

function generateNodes(){
    nodes = [];

    var nPoints = slider.value();
    minD = slider1.value();
    for(i=0;i<nPoints;i++){
    if(i%2==0){
        p = new Point(start.x+(int)(minD*1.414213562*i),start.y);
        nodes.push(p);
    }else{
        p = new Point(start.x+(int)(minD*1.414213562*i),start.y+(int)(minD*1.414213562));
        nodes.push(p);
    }
    }

    Point.FABRIK();
    redraw();
}