import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
class Ball
{
	constructor()
	{
		this.position={
			x:window.innerWidth/2-300,
			y:window.innerHeight/2-40
		},
		this.size={
			radius:25,
			color:'red'

		}
	}
	render(state){
		const context=state.context;
		context.save();
		context.beginPath();
		context.fillStyle=this.size.color;
		context.arc(this.position.x,this.position.y,this.size.radius,0,2*Math.PI,true);
		context.fill();
		context.closePath();
	}
}
export default Ball;