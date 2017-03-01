import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ball from './Ball.js';
import Bars from './Bars.js';
import PointerLock from './react-pointerlock';
import Obstacles from './Obstacles.js';
//import Wall from './cement_wall.jpg'

class App extends Component
{
	constructor()
	{
		super();
		this.state = {
			screen: {
				width: parent.innerWidth-5,
				height: parent.innerHeight-5,
				ratio: parent.DevicePixelRatio || 1,
			},
			context: null,
		}

		this.ball=[];
		this.bars=[];
		this.obstacles=[];

		inGame: false;
		
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	updateDimensions()
	{
		if(this.state.screen.width>parent.innerWidth || this.state.screen.height>parent.innerHeight)
		{
			this.setState({
				screen: {
					width: parent.innerWidth,
					height: parent.innerHeight
				},
				context: null,
			});
			this.startGame();
		} 
	}

	onMouseMove(movement) 
	{
		if(movement.x>movement.y)
		{
	    	//right movement
	    	if(this.bars[0].position.x+this.bars[0].dimensions.length>this.state.screen.width-50)
	    	{
	    		movement.x=0;
	    	}
	    	this.bars[0].position.x=this.bars[0].position.x+movement.x;
	    	this.bars[1].position.x=this.bars[1].position.x+movement.x;
	    }
	    else if(movement.x<movement.y)
	    {
    		//left movement
    		if(this.bars[0].position.x<50)
    		{
    			movement.x=0;
    		}
    		this.bars[0].position.x=this.bars[0].position.x+movement.x;
    		this.bars[1].position.x=this.bars[1].position.x+movement.x;
    	}
    	if(movement.x>movement.y)
    	{
    		if(this.bars[3].position.y<50)
    		{
    			movement.y=0;
    		}
    		//upper movement
    		this.bars[2].position.y=this.bars[2].position.y+movement.y;
    		this.bars[3].position.y=this.bars[3].position.y+movement.y;
    	}
    	else if(movement.x<movement.y)
    	{
    		//bottom movement
    		if(this.bars[3].position.y+this.bars[3].dimensions.width>this.state.screen.height-50)
    		{
    			movement.y=0;
    		}
    		this.bars[2].position.y=this.bars[2].position.y+movement.y;
    		this.bars[3].position.y=this.bars[3].position.y+movement.y;
    	}
    }

    componentDidMount() 
    {
    	window.addEventListener('resize', this.updateDimensions.bind());
    	const context = this.refs.canvas.getContext('2d');
    	this.setState({ context: context });
    	let xcoor= window.innerWidth/2;
    	let ycoor= window.innerHeight/2;
    	let radius= 25;
    	let color= 'red';
    	let velocityx=0;
    	let velocityy=0; 

    	this.makeBall(xcoor,ycoor,radius,color, velocityx, velocityy);

    	let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,this.state.screen.width-25];
    	let yCoordinateBar = [5,this.state.screen.height-25, this.state.screen.height/2-100, this.state.screen.height/2-100];
    	let barLength= [400,400,20,20];
    	let barWidth= [20,20,200,200];
    	let colorsBar = ['red','blue','green','yellow'];

    	this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);
    	
    	let obstacle_x = [200,600,1000];
    	let obstacle_y = [200,400,300];
    	let obstacle_type = ['#95a5a6','#DAA520','#34495e'];
    	let obstacle_l = [70,70,70];
    	let obstacle_w = [70,70,70];

    	/*let some_image = new Image()
    	some_image.src = Wall
    	console.log(some_image)
    	context.drawImage(some_image, 0, 0)*/

    	this.makeObstacles(obstacle_x, obstacle_y, obstacle_l, obstacle_w, obstacle_type);

    	requestAnimationFrame(() => {this.update()});    	
    }

    componentWillUnmount()
    {
    	window.removeEventListener('resize', this.updateDimensions);
    }

    update()
    {
    	const context = this.state.context;

    	context.save();
    	context.scale(this.state.screen.ratio, this.state.screen.ratio);

    	context.fillStyle ='#000';
    	context.fillRect(0,0,this.state.screen.width, this.state.screen.height);

    	this.checkCollisionWithBars(this.ball, this.bars); //checks collision between ball and bars

    	this.checkCollisionWithObstacles(this.ball, this.obstacles);

    	this.updateObjects(this.ball, 'ball');
    	this.updateObjects(this.bars, 'bars');
    	this.updateObjects(this.obstacles, 'obstacles');

    	context.restore();
    	requestAnimationFrame(()=>{this.update()});
    }

    makeBall(x,y,r,c, vx, vy)
    {
    	let  ball= new Ball(
    	{
    		position:
    		{
    			xcoor:x,
    			ycoor:y
    		},
    		velocity : {
    			x: vx,
    			y: vy
    		},
    		size:
    		{
    			radius:r,
    			color:c

    		}
    	});
    	this.ball=[];
    	this.addObject(ball, 'ball');
    }

    makeBars(bar_x, bar_y, bar_l, bar_w, bar_c)
    {
    	for(let i=0;i<4;i++)
    	{
    		let bars = new Bars({
    			position: {
    				x: bar_x[i],
    				y: bar_y[i]
    			},
    			size: {
    				length: bar_l[i] ,
    				width: bar_w[i]
    			},
    			color: {
    				barColor: bar_c[i],
    			},

    		});
    		this.addObject(bars, 'bars');
    	}
    }

    makeObstacles(obstacle_x, obstacle_y, obstacle_l, obstacle_w,type)
    {
    	for(let i=0;i<4;i++)
    	{
    		let obstacles = new Obstacles({
    			position : {
    				x: obstacle_x[i],
    				y: obstacle_y[i]
    			},
    			size : {
    				length: obstacle_l[i],
    				width: obstacle_w[i]
    			},
    			obstacle_type : {
    				name : type[i]
    			}
    		});
    		this.addObject(obstacles,'obstacles');
    	}
    }

    checkCollisionWithBars(item1,item2)
    {   
    	let a=0;
    	let b=3;
    	for(b;b>=0;b--)
    	{
    		const items1 = item1[a];
    		const items2 = item2[b];
    		this.reflectionFromBars(items1,items2, b);
    	}
    }

    checkCollisionWithObstacles(element1, element2)
    {
    	let c=0;
    	let d=2;
    	for(d;d>=0;d--)
    	{
    		const elements1 = element1[c];
    		const elements2 = element2[d];
    		this.reflectionFromObstacles(elements1,elements2, d);
    	}
    }

    reflectionFromBars(args1,args2, b)
    {
    	let ballx=args1.position.x;
    	let bally=args1.position.y;
    	let ballradius=args1.size.radius;
    	let ballcolor=args1.size.color;

    	let barx=args2.position.x;
    	let bary=args2.position.y;
    	let ballvelocity_x=args1.velocity.x;
    	let ballvelocity_y=args1.velocity.y;
    	let barWidth=args2.dimensions.width;
    	let barLength=args2.dimensions.length;
    	let colorsBar = ['red','blue','green','yellow'];

    	if(b==0)
    	{
    		if(ballx>=barx&&ballx<=barx+barLength)
    		{
    			if(bally-ballradius<=bary+barWidth)
    			{
    				let random=Math.floor(Math.random()*10%4);
    				if(this.ball[0].size.color==this.bars[0].fillColor.barColor)
    				{
    					while(this.ball[0].size.color==colorsBar[random])
    						random=Math.floor(Math.random()*10%4);
    					this.ball[0].size.color=colorsBar[random];
    				}
    				this.ball[0].velocity.y=- this.ball[0].velocity.y;
    			}
    		}
    		else
    		{  
    			if(bally-ballradius<=0)
    			{       
    				this.ball[0].velocity.y=- this.ball[0].velocity.y;

    			}
    		}
    	}
    	else if(b==1)
    	{

    		if(ballx>=barx&&ballx<=barx+barLength)
    		{
    			if(bally+ballradius>=bary)
    			{
    				let random=Math.floor(Math.random()*10%4);
    				if(this.ball[0].size.color==this.bars[1].fillColor.barColor)
    				{
    					while(this.ball[0].size.color==colorsBar[random])
    						random=Math.floor(Math.random()*10%4);
    					this.ball[0].size.color=colorsBar[random];
    				}
    				this.ball[0].velocity.y=- this.ball[0].velocity.y;
    			}
    		}
    		else
    		{  
    			if(bally+ballradius>=this.state.screen.height)
    			{

    				this.ball[0].velocity.y=- this.ball[0].velocity.y;
    			}
    		}
    	}
    	else if(b==2)
    	{
    		if(bally>=bary&&bally<=bary+barWidth)
    		{               

    			if(ballx-ballradius<=barx+barLength)
    			{
    				let random=Math.floor(Math.random()*10%4);
    				if(this.ball[0].size.color==this.bars[2].fillColor.barColor)
    				{
    					while(this.ball[0].size.color==colorsBar[random])
    						random=Math.floor(Math.random()*10%4);
    					this.ball[0].size.color=colorsBar[random];
    				}
    				this.ball[0].velocity.x=- this.ball[0].velocity.x;
    			} 
    		}
    		else
    		{
    			if(ballx-ballradius<=0)
    			{
    				this.ball[0].velocity.x=- this.ball[0].velocity.x;

    			}
    		}
    	}
    	else if(b==3)
    	{ 
    		if(bally+ballradius>=bary&&bally<=bary+barWidth)
    		{
    			if(ballx+ballradius>=barx)
    			{
    				let random=Math.floor(Math.random()*10%4);
    				if(this.ball[0].size.color==this.bars[3].fillColor.barColor)
    				{
    					while(this.ball[0].size.color==colorsBar[random])
    						random=Math.floor(Math.random()*10%4);
    					this.ball[0].size.color=colorsBar[random];
    				}
    				this.ball[0].velocity.x=-this.ball[0].velocity.x;

    			}
    		}
    		else
    		{
    			if(ballx+ballradius>=this.state.screen.width)
    			{      
    				this.ball[0].velocity.x=- this.ball[0].velocity.x;
    			}
    		}
    	}
    }

    reflectionFromObstacles(arg1,arg2,d)
    {
    	let ballx=arg1.position.x;
    	let bally=arg1.position.y;
    	let ballradius=arg1.size.radius;
    	let ballcolor=arg1.size.color;
    	let ballvelocity_x=arg1.velocity.x;
    	let ballvelocity_y=arg1.velocity.y;

    	let obstaclesx = arg2.position.x;
    	let obstaclesy = arg2.position.y;
    	let obstacleLength = arg2.dimensions.length;
    	let obstacleWidth = arg2.dimensions.width;
    	let obstacleType = arg2.obstacleType.name;

    	if(d==0)
    	{
    		if(ballx>=obstaclesx && ballx<=obstaclesx+obstacleLength)
    		{
    			if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth) //top
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("1");
    			}
    			else if(bally-ballradius<=obstaclesy+obstacleWidth && bally-ballradius>=obstaclesy) //bottom
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("0");			
    			}
    		}
    		else if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth)
    		{
    			if(ballx+ballradius>=obstaclesx && ballx+ballradius<=obstaclesx+obstacleLength) //left
    			{
    				this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				//this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    			else if(ballx-ballradius<=obstaclesx+obstacleLength && ballx-ballradius>=obstaclesx) //right
    			{
    				//this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    		}
    	}
    	else if(d==1)
    	{
    		if(ballx>=obstaclesx && ballx<=obstaclesx+obstacleLength)
    		{
    			if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth) //top
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("1");
    			}
    			else if(bally-ballradius<=obstaclesy+obstacleWidth && bally-ballradius>=obstaclesy) //bottom
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("0");			
    			}
    		}
    		else if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth)
    		{
    			if(ballx+ballradius>=obstaclesx && ballx+ballradius<=obstaclesx+obstacleLength) //left
    			{
    				this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				//this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    			else if(ballx-ballradius<=obstaclesx+obstacleLength && ballx-ballradius>=obstaclesx) //right
    			{
    				//this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    		}
    	}
    	else if(d==2)
    	{
    		if(ballx>=obstaclesx && ballx<=obstaclesx+obstacleLength)
    		{
    			if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth) //top
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("1");
    			}
    			else if(bally-ballradius<=obstaclesy+obstacleWidth && bally-ballradius>=obstaclesy) //bottom
    			{
    				this.ball[0].velocity.y= -this.ball[0].velocity.y;
    				//alert("0");			
    			}
    		}
    		else if(bally+ballradius>=obstaclesy && bally+ballradius<=obstaclesy+obstacleWidth)
    		{
    			if(ballx+ballradius>=obstaclesx && ballx+ballradius<=obstaclesx+obstacleLength) //left
    			{
    				this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				//this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    			else if(ballx-ballradius<=obstaclesx+obstacleLength && ballx-ballradius>=obstaclesx) //right
    			{
    				this.ball[0].velocity.x= -this.ball[0].velocity.x;
    				//this.ball[0].velocity.y= -this.ball[0].velocity.y;
    			}
    		}
    	}
    }


    startGame()
    {
    	this.setState({
    		inGame: true,
    	});
    	let xCoordinate= (this.state.screen.width/2);
    	let yCoordinate= 100;
    	let radius= 25;
    	let color= 'red';
    	let velocityx=10;
    	let velocityy=10; 
    	this.makeBall(xCoordinate,yCoordinate,radius,color, velocityx, velocityy);

    	let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
    	let yCoordinateBar = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
    	let barLength= [400,400,20,20];
    	let barWidth= [20,20,200,200];
    	let colorsBar = ['red','blue','green','yellow'];
    	this.bars =[];
    	this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);

    	let obstacle_x = 200;
    	let obstacle_y = 200;
    	let obstacle_type = 'grey';
    	let obstacle_l = 50;
    	let obstacle_w = 50;
    	this.makeObstacles(obstacle_x, obstacle_y, obstacle_l, obstacle_w, obstacle_type);

    	requestAnimationFrame(() => {this.update()});
    }

    addObject(item,group) 
    {
    	this[group].push(item);
    }


    updateObjects(items,group)
    {
    	let index=0;
    	for(let item of items)
    	{
    		items[index].render(this.state);
    		index++;
    	}
    }



    render()
    {
    	let startgamebutton;
    	if(!this.state.inGame){
    		startgamebutton = (
    			<div>
    			<button
    			onClick={ this.startGame.bind(this) }>
    			Start Game
    			</button>
    			</div>
    			)
    	}

    	return(
    		<div>
    		<PointerLock onMouseMove={ this.onMouseMove }>
    		{startgamebutton} 
    		<canvas ref="canvas"
    		width={this.state.screen.width * this.state.screen.ratio}
    		height={this.state.screen.height * this.state.screen.ratio}
    		/>

    		</PointerLock>

    		</div>
    		);
    	}
    }
    export default App;
