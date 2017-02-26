import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ball from './Ball.js';
import Bars from './Bars.js';
import PointerLock from 'react-pointerlock';

class App extends Component
{
	constructor()
	{
		super();
		this.state = {
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.DevicePixelRatio || 1,
			},
			context: null,
		}

		this.ball=[];
		this.bars=[];
		inGame: false
	

	this.onMouseMove = this.onMouseMove.bind(this);
	}
	handleResize(value,e)
	{
		this.setState({
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		});
	}

	onMouseMove(movement) 
	{
		const canvas = ReactDOM.findDOMNode(this.refs.canvas);
		let x = this.state.x + movement.x;
		let y = this.state.y + movement.y;

		if (x > canvas.clientWidth + 20) {
			x = 0;
		}

		if (y > canvas.clientHeight + 20) {
			y = 0;
		}

		if (x < -15) {
			x = canvas.clientWidth;
		}

		if (y < -15) {
			y = canvas.clientHeight;
		}
		let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
		let yCoordinateBar = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
		let barLength= [400,400,20,20];
		let barWidth= [20,20,200,200];
		let colorsBar = ['red','blue','green','yellow'];
		for(let i=0;i<4;i++)
		{
			this.makeBar(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);
		}
		console.log('asdf');
	}


	componentDidMount() 
	{
		window.addEventListener('resize', this.handleResize.bind(this, false));
		const context = this.refs.canvas.getContext('2d');
		this.setState({ context: context });
		let xcoor= window.innerWidth/2;
		let ycoor= window.innerHeight/2;
		let radius= 25;
		let color= 'red';
		let velocityx=0;
		let velocityy=0; 

		this.makeBall(xcoor,ycoor,radius,color, velocityx, velocityy);
    	//this.makeBars();

    	let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
    	let yCoordinateBar = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
    	let barLength= [400,400,20,20];
    	let barWidth= [20,20,200,200];
    	let colorsBar = ['red','blue','green','yellow'];
    	//   for(let i=0;i<4;i++)
    	// {
    		this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);
    	//}
    	requestAnimationFrame(() => {this.update()});
    }
    componentWillUnmount()
    {
    	window.removeEventListener('resize', this.handleResize);
    }
    update()
    {
    	const context = this.state.context;
    	const ball=this.ball[0];
    	const bars=this.bars[4];
    	context.save();
    	context.scale(this.state.screen.ratio, this.state.screen.ratio);

    	context.fillStyle ='#000';
    	context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    	this.updateObjects(this.ball, 'ball');
    	this.updateObjects(this.bars, 'bars');
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
    	  //this.bars=[];
    	  this.addObject(bars, 'bars');
    	}
    }

    startGame()
    {
    	this.setState({
    		inGame: true,
    	});
    	let xCoordinate= (this.state.screen.width/2);
    	let yCoordinate= 50;
    	let radius= 25;
    	let color= 'red';
    	let velocityx=1;
    	let velocityy=1; 
    	this.makeBall(xCoordinate,yCoordinate,radius,color, velocityx, velocityy);

    	let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
    	let yCoordinateBar = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
    	let barLength= [400,400,20,20];
    	let barWidth= [20,20,200,200];
    	let colorsBar = ['red','blue','green','yellow'];
    	this.bars =[];
    	this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);

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
    	if(!this.state.inGame)
    	{
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
    		<PointerLock onMouseMove= { this.onMouseMove.bind(this)}>
    		{startgamebutton} 
    		<canvas ref="canvas" width={this.state.screen.width * this.state.screen.ratio}
    		height={this.state.screen.height * this.state.screen.ratio}/>
    		</PointerLock>
    		);
    }
}

export default App;
