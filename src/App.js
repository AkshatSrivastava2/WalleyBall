import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ball from './Ball.js';
import Bars from './Bars.js';
import PointerLock from './react-pointerlock';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {
      screen: {
        width: parent.innerWidth-5,
        height: parent.innerHeight-5,
        ratio: parent.DevicePixelRatio || 1,
      },
      context: null,
    }

    this.ball=[];
    this.bars=[];
    inGame: false;
    this.onMouseMove = this.onMouseMove.bind(this);
  }

 // this.onMouseMove = this.onMouseMove.bind(this);
  
  updateDimensions()
    {
      if(this.state.screen.width>parent.innerWidth || this.state.screen.height>parent.innerHeight)
      {
        this.setState({
          screen: {
            width: parent.innerWidth,
            height: parent.innerHeight
          },
          context: null,
        });
        this.startGame();
      } 
    }
 
 onMouseMove(movement) {
   if(movement.x>movement.y){
    //right movement
    if(this.bars[0].position.x+this.bars[0].dimensions.length>this.state.screen.width-50)
    {
      movement.x=0;
    }
    this.bars[0].position.x=this.bars[0].position.x+movement.x;
    this.bars[1].position.x=this.bars[1].position.x+movement.x;
   }else if(movement.x<movement.y){
    //left movement
    if(this.bars[0].position.x<50)
    {
      movement.x=0;
    }
    this.bars[0].position.x=this.bars[0].position.x+movement.x;
    this.bars[1].position.x=this.bars[1].position.x+movement.x;
   }
   if(movement.x>movement.y){
    if(this.bars[3].position.y<50)
    {
      movement.y=0;
    }
    //upper movement
    this.bars[2].position.y=this.bars[2].position.y+movement.y;
    this.bars[3].position.y=this.bars[3].position.y+movement.y;
   }else if(movement.x<movement.y){
    //bottom movement
     if(this.bars[3].position.y+this.bars[3].dimensions.width>this.state.screen.height-50)
    {
      movement.y=0;
    }
    this.bars[2].position.y=this.bars[2].position.y+movement.y;
    this.bars[3].position.y=this.bars[3].position.y+movement.y;
   }

  }

  componentDidMount() 
  {
    window.addEventListener('resize', this.updateDimensions.bind());
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    let xcoor= window.innerWidth/2;
    let ycoor= window.innerHeight/2;
    let radius= 25;
    let color= 'red';
    let velocityx=0;
    let velocityy=0; 

    this.makeBall(xcoor,ycoor,radius,color, velocityx, velocityy);
    //this.makeBars();

    let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,this.state.screen.width-25];
      let yCoordinateBar = [5,this.state.screen.height-25, this.state.screen.height/2-100, this.state.screen.height/2-100];
      let barLength= [400,400,20,20];
      let barWidth= [20,20,200,200];
      let colorsBar = ['red','blue','green','yellow'];
    //   for(let i=0;i<4;i++)
    // {
    this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);
    //}

    requestAnimationFrame(() => {this.update()});

  }
  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateDimensions);
  }
  update()
  {
    const context = this.state.context;
    //const ball=this.ball[0];
    //const bars=this.bars[4];
    
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);

    context.fillStyle ='#000';
    context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
    
    this.checkCollisionWith(this.ball, this.bars);
    
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

    }
    });
    this.ball=[];
    this.addObject(ball, 'ball');
}

makeBars(bar_x, bar_y, bar_l, bar_w, bar_c)
  {
   
     for(let i=0;i<4;i++)
     {
       let bars = new Bars({
        position: {
          x: bar_x[i],
          y: bar_y[i]
        },
        size: {
          length: bar_l[i] ,
          width: bar_w[i]
        },
        color: {
          barColor: bar_c[i],
        },
      
      });
      //this.bars=[];
      this.addObject(bars, 'bars');
    
  }
}
checkCollisionWith(item1,item2)
{   
    let a=0;
    let b=3;
   // console.log(item1);
    for(b;b>=0;b--)
    {
      const items1 = item1[a];
      const items2 = item2[b];
      this.reflection(items1,items2, b);
    }
  }
  reflection(args1,args2, b)
   {

    let ballx=args1.position.x;
    let bally=args1.position.y;
    let ballradius=args1.size.radius;
    let ballcolor=args1.size.color;
    
    let barx=args2.position.x;
    let bary=args2.position.y;
    let ballvelocity_x=args1.velocity.x;
    let ballvelocity_y=args1.velocity.y;
    let barWidth=args2.dimensions.width;
    let barLength=args2.dimensions.length;

    //console.log(ballvelocity_y);
    if(b==0)
    {
      if(ballx>=barx&&ballx<=barx+barLength)
      {
              if(bally-ballradius<=bary+barWidth)
              {
                this.ball[0].velocity.y=- this.ball[0].velocity.y;
                //console.log(ballvelocity_y);
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //this.update();
              }
      }
      else
      {  
        if(bally-ballradius<=0)
        {       
                this.ball[0].velocity.y=- this.ball[0].velocity.y;
                //console.log(ballvelocity_y);
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //this.update();
         }
      }
    }
   else if(b==1)
    {

      if(ballx>=barx&&ballx<=barx+barLength)
      {
              if(bally+ballradius>=bary)
              {
                 this.ball[0].velocity.y=- this.ball[0].velocity.y;
               //console.log(ballvelocity_y);
 
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //this.update();

                
              }
      }
      else
      {  
               if(bally+ballradius>=this.state.screen.height)
               {
                
                this.ball[0].velocity.y=- this.ball[0].velocity.y;
                //console.log(ballvelocity_y);
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //this.update();
               }
      }
    }
      else if(b==2)
    {
      if(bally>=bary&&bally<=bary+barWidth)
      {               

             if(ballx-ballradius<=barx+barLength)
              {// alert('sahuo');
                this.ball[0].velocity.x=- this.ball[0].velocity.x;
                
                //makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //update();
              } 
      }
      else
      {
               if(ballx-ballradius<=0)
               {
                this.ball[0].velocity.x=- this.ball[0].velocity.x;
              //console.log(ballvelocity_y);
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                // requestAnimationFrame(() => {this.update()});
             }
      }
    }
      else if(b==3)
    { 
      if(bally+ballradius>=bary&&bally<=bary+barWidth)
      {
              if(ballx+ballradius>=barx)
              { //alert('3');
                this.ball[0].velocity.x=-this.ball[0].velocity.x;
                
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                // requestAnimationFrame(() => {this.update()});
              }
      }
      else
      {
        if(ballx+ballradius>=this.state.screen.width)
        {      
          this.ball[0].velocity.x=- this.ball[0].velocity.x;
        //console.log(ballvelocity_y);
                //this.makeBall(ballx,bally,ballradius,ballcolor, ballvelocity_x, ballvelocity_y);
                //requestAnimationFrame(() => {this.update()});
         }
      }
  }
}

  startGame(){
    this.setState({
      
      inGame: true,
     
    });
    let xCoordinate= (this.state.screen.width/2);
    let yCoordinate= 100;
    let radius= 25;
    let color= 'red';
    let velocityx=5;
    let velocityy=5; 
    this.makeBall(xCoordinate,yCoordinate,radius,color, velocityx, velocityy);

    let xCoordinateBar = [(this.state.screen.width/2)-200,(this.state.screen.width/2)-200,5,window.innerWidth-35];
    let yCoordinateBar = [5,window.innerHeight-25, window.innerHeight/2-100, window.innerHeight/2-100];
    let barLength= [400,400,20,20];
    let barWidth= [20,20,200,200];
    let colorsBar = ['red','blue','green','yellow'];
    this.bars =[];
    this.makeBars(xCoordinateBar,yCoordinateBar,barLength,barWidth,colorsBar);
    
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

    return(
      <div>

      
         {startgamebutton} 
       <PointerLock onMouseMove={ this.onMouseMove }>
         
         <canvas ref="canvas"
         width={this.state.screen.width * this.state.screen.ratio}
         height={this.state.screen.height * this.state.screen.ratio}
         />
      
       </PointerLock>

       </div>
    );
  }
}
export default App;
