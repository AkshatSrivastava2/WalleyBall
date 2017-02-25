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
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.DevicePixelRatio || 1,
      },
      barCount :3,
      context: null,
    }
    this.ball=[];
    this.bars=[];
    inGame: false
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
    let xcoor= window.innerWidth/2;
    let ycoor= window.innerHeight/2;
    let radius= 25;
    let color= 'red';
    let velocityx=0;
    let velocityy=0; 
    this.makeBall(xcoor,ycoor,radius,color, velocityx, velocityy);
    this.makeBars();
    requestAnimationFrame(() => {this.update()});

  }
  componentWillUnmount()
  {
    window.removeEventListener('resize', this.handleResize);
  }
  checkCollisionsWith(item1,item2){
    var a=item1.length-1;
    var b=item2.length-1;
    for(b;b>=0;b--){
      var item1=item1[a];
      var item2=item2[b];
      item1.reflection(item1,item2);
    }
  }
  update()
  {
    const context = this.state.context;
    const ball=this.ball[0];
    const bars=this.bars[4];
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);

    context.fillStyle ='#000';
    context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    context.globalAlpha=1.0;
    //this.checkCollisionsWith(this.ball, this.wall);
    for(var x=0;x<=0;x++){
    this.checkCollisionsWith(this.ball, this.bar[x]);
    }
    this.updateObjects(this.ball, 'ball');
    this.updateObjects(this.bars, 'bars');
    context.restore();
    requestAnimationFrame(()=>{this.update()});
  }

makeBall(x,y,r,c, vx, vy)
{
  let  ball= new Ball(
  	{
  		position:
  		{
			xcoor:x,
			ycoor:y
		},
		velocity : {
			x: vx,
			y: vy
		},
		size:
		{
			radius:r,
			color:c

		},
    // create: this.createObject.bind(this),
  	});
    this.ball=[];
    this.addObject(ball, 'ball');
}

makeBars()
  {
    let xCoordinate = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
    let yCoordinate = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
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
        //create: this.createObject.bind(this),
      });
      this.addObject(bars, 'bars');
    }
  }

  startGame(){
    this.setState({
      
      inGame: true,
     
    });
    let xCoordinate= (this.state.screen.width/2);
    let yCoordinate= 50;
    let radius= 25;
    let color= 'red';
    let velocityx=1;
    let velocityy=1; 
    this.makeBall(xCoordinate,yCoordinate,radius,color, velocityx, velocityy);
    requestAnimationFrame(() => {this.update()});
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
    let startgamebutton;
  	 if(!this.state.inGame){
        startgamebutton = (
        <div>
        <button
            onClick={ this.startGame.bind(this) }>
            Start Game
        </button>
        </div>
      )
    }

    return(<div>
      
      {startgamebutton}
      <canvas ref="canvas"
      width={this.state.screen.width * this.state.screen.ratio}
      height={this.state.screen.height * this.state.screen.ratio}
      />
      </div>
    );
  }
}
export default App;
