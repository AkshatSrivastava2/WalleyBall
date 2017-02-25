import React, { Component } from 'react';
import Ball from './Ball.js';
import Bars from './Bars.js';

class App extends Component
{
	constructor()
	{
		super();
		this.state = {
			screen: {
				width: window.innerWidth-5,
				height: window.innerHeight-5,
				ratio: window.DevicePixelRatio || 1,
			},
			context: null,
		}
		this.ball=[];
		this.bars=[];
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


	componentDidMount() 
	{
		window.addEventListener('resize', this.handleResize.bind(this, false));
		const context = this.refs.canvas.getContext('2d');
		this.setState({ context: context });
		this.makeBall();
		this.makeBars();
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
		//context.scale(this.state.screen.ratio, this.state.screen.ratio);

		context.fillStyle ='#000';
		context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
		this.updateObjects(this.ball, 'ball');
		this.updateObjects(this.bars, 'bars');
		context.restore();
		requestAnimationFrame(()=>{this.update()});
	}


	makeBall()
	{
		let  ball= new Ball();
		this.addObject(ball, 'ball');
	}


	makeBars()
	{
		let xCoordinate = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-30];
		let yCoordinate = [5,window.innerHeight-30, window.innerHeight/2-100, window.innerHeight/2-100];
		let barLength = [400,400,20,20];
		let barWidth = [20,20,200,200];
		let colors = ['red','blue','green','yellow'];
		for(let i=0;i<4;i++)
		{
			let bars = new Bars({
				position: {
					x: xCoordinate[i],
					y: yCoordinate[i]
				},
				size: {
					length: barLength[i],
					width: barWidth[i]
				},
				color: {
					barColor: colors[i],
				},
        //create: this.addObject.bind(this),
    });
			this.addObject(bars, 'bars');
		}
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
		return(<div>
			<canvas ref="canvas"
			width={this.state.screen.width * this.state.screen.ratio}
			height={this.state.screen.height * this.state.screen.ratio}
			/>
			</div>
			);
	}
}
export default App;
