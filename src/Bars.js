//import React,{Component} from 'react';

export default class Bars
{
	constructor(args)
	{
		this.position =  args.position,
		this.dimensions = args.size;
		this.fillColor = args.color;
	}
		
	render(state)
	{
		const context= state.context;		
		context.fillStyle = this.fillColor.barColor;
		context.save();
		context.fillRect(this.position.x,this.position.y,this.dimensions.length,this.dimensions.width);
		context.stroke();

	}
}