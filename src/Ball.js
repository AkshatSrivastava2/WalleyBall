import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
class Ball
{

	constructor(args)
	{
		this.position =
		{
			x:args.position.xcoor,
			y:args.position.ycoor,
			
		},
		this.velocity = {
			x: args.velocity.x,
			y: args.velocity.y
		},
  
		this.size =
		{ 
			radius: args.size.radius,
		    color : args.size.color
	    }
	}
	render(state){
		/*let color = ['red','green','blue','yellow'];
			//right bar
			if(this.position.x > state.screen.width + this.size.radius-35)
			{ 
				this.velocity.x = -this.velocity.x;
				this.size.color = color[Math.floor(Math.random() * 3) + 1];
			}

    	//left bar
    	else if(this.position.x < -this.size.radius+35) 
    	{
    		this.velocity.x = (state.screen.width + this.velocity.x);
    		this.size.color = color[Math.floor(Math.random() * 3) + 1];

    	}

       	//bottom bar
       	if(this.position.y > state.screen.height + this.size.radius-35)
       	{ 
       		this.velocity.y = -this.velocity.y;
       		this.size.color = color[Math.floor(Math.random() * 3) + 1];
       	}

    	//top bar
    	else if(this.position.y < -this.size.radius+35) 
    	{
    		this.velocity.y = (state.screen.height + this.velocity.y);
    		this.size.color=color[Math.floor(Math.random() * 3) + 1];
    	}
        */
    	this.position.x += this.velocity.x;
    	//console.log(this.velocity.x);
    	this.position.y += this.velocity.y;	
 		//console.log(this.velocity.y);
    	const context=state.context;
    	context.save();
    	context.beginPath();
    	context.fillStyle=this.size.color;
    	context.arc(this.position.x,this.position.y,this.size.radius,0,2*Math.PI,true);
		//context.arc(this.position.x2,this.position.y2,this.size.radius,0,2*Math.PI,true);
		context.fill();
		context.closePath();
	}
}
export default Ball;