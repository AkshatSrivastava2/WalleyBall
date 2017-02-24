import React, { Component } from 'react';

class Ball
{
	constructor()
	{
		this.position={
			x:window.innerWidth/2,
			y:window.innerHeight/2,

		},	
		this.velocity = {
     	x: Math.random() * (1.5 + 1.5 + 1) -1.5,
     	y: Math.random() * (1.5 + 1.5 + 1) -1.5
    	},
		this.size={
			radius:25,
			color:'red'

		}
	}

	render(state){
		 // Move
		if(this.position.x > state.screen.width + this.size.radius-70){ 
    		this.velocity.x = -this.velocity.x;
    	}
    	else if(this.position.x < -this.size.radius+70) {
    		this.velocity.x = (state.screen.height + this.velocity.x);
       	}
       	//
    	if(this.position.y > state.screen.height + this.size.radius-75){ 
    		this.velocity.y = -this.velocity.y;
    	}
    	else if(this.position.y < -this.size.radius+75) {
    		this.velocity.y = (state.screen.height + this.velocity.y);
       	}
   		this.position.x += this.velocity.x;
    	this.position.y += this.velocity.y;	
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