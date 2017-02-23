import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Ball from './Ball.js';

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
  }

  componentDidMount() 
  {
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    requestAnimationFrame(() => {this.update()});

  }
  update()
  {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.height);

    context.fillStyle ='white';
    context.globalAlpha = 0.4;
    context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    context.restore();
    requestAnimationFrame(() => {this.update()});

  }
  startGame(){
  let  ball= new Ball({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      },
      create: this.createObject.bind(this),
      //onDie: this.gameOver.bind(this)
    });
    this.createObject(ball, 'ball');
}
  render()
  {
    return(
      <div>
      <canvas ref="canvas"
      width={this.state.screen.width*this.state.screen.ratio}
      height={this.state.screen.height*this.state.screen.ratio}
      />
      </div>
      );
  }
}
export default App;
