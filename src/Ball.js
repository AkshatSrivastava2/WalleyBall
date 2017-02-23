import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
class Ball{
	constructor(args) {
    this.position = args.position
    this.radius=args.size;
    this.x=window.innerWidth/2;
    this.y=window.innerHeight/2;
    this.rotation=0;
}
render(state){
	// Draw
     const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.fillStyle = '#FFF';
    context.lineWidth = 0,5;
    context.beginPath();
    context.arc(0, 0, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
export default Ball;