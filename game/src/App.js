import React,{Component} from 'react';

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
		//this.bars = [];
		//this.ball = [];
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
		context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
		requestAnimationFrame(() => {this.update()});

	}
	update()
	{
		const context = this.state.context;
		context.save();
		context.scale(this.state.screen.ratio, this.state.screen.height);

		context.fillStyle ='green';
		context.globalAlpha = 0.4;
		context.fillRect(0,0,this.state.screen.width, this.state.screen.height);
		context.globalAlpha = 1;

		context.restore();
		requestAnimationFrame(() => {this.update()});

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
