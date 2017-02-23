import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
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
    //context.fillStyle='black';
    //context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    this.setState({ context: context });
    this.makeBall();
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
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);

    context.fillStyle ='#000';
    context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    this.updateObjects(this.ball, 'ball');
     context.restore();
     requestAnimationFrame(()=>{this.update()});
  }
  makeBall(){
  let  ball= new Ball({
      position: {
        x: this.state.screen.width/2-400,
        y: this.state.screen.height/2-200
      },
      size: {
        radius:50,
      },
      create: this.addObject.bind(this),
      //onDie: this.gameOver.bind(this)
    });
    this.addObject(ball, 'ball');
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
