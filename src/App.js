import React,{Component} from 'react';
import './App.css';
class App extends Component {
  constructor(size = {width:window.innerWidth, height: window.innerHeight}, options = {zIndex: 1}) {
    super();
    this.objects=[];
    
    let canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.position = 'absoluter';
    canvas.style.backgroundColor = 'black';
    canvas.style.zIndex = options.zIndex;
    document.body.appendChild(canvas);
    this.context = canvas.getContext('2d');
  }
  addObject(object){
      this.objects.push(object);
    }
  render() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.objects.forEach( o => {
      o.draw(this.context);
    });
  }
}
class Circle{
  constructor(options){
    this.options=options;
    this.context=undefined;
  }
  draw(context) {
    this.context = context;
    if (this.context == null) return false;

    this.context.beginPath();
    this.context.arc(
      this.options.x,
      this.options.y,
      this.options.radius,
      0,
      2*Math.PI,
      false
    );
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#FF4136';
    this.context.fillStyle="red";
    this.context.fill();
    this.context.stroke();
  }

}
let circle = new Circle({
  x: window.innerWidth/2,
  y: window.innerHeight-50,
  radius: 25
});
 
let scene=new App();
scene.addObject(circle);
scene.render();
export default App;
