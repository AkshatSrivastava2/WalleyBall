import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
class Ball
{
	constructor()
	{
		this.position={
			x:window.innerWidth/2-300,
			y:window.innerHeight-40
		},
		this.size={
			radius:25
		}
	}
	render(state){
		const context=state.context;
		context.save();
		context.beginPath();
		context.fillStyle='red';
		context.arc(0,0,20,0,2*Math.PI,true);
		context.fill();
		context.closePath();
	}
}
export default Ball;