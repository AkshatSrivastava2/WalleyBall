//import React,{Component} from 'react';
//import  Ball from './Ball.js';
export default class Bars
{
	constructor(args)
	{
		this.position =  
		{
			x:args.position.x,
			y:args.position.y
		},
		this.dimensions = 
		{
			length:args.size.length,
			width:args.size.width
		},
		this.fillColor = args.color.barColor;
	}
		
	render(state)
	{
		const context= state.context;		
		context.fillStyle = this.fillColor;
		context.save();
		context.fillRect(this.position.x,this.position.y,this.dimensions.length,this.dimensions.width);
		context.stroke();

	}
}