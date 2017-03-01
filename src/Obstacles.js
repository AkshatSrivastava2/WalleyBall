export default class Obstacles 
{
	constructor(args)
	{
		this.position=args.position,
		this.dimensions=args.size,	
		this.obstacleType=args.obstacle_type
		//this.imageUrl=args.location
	}


	render(state)
	{		
		//<img src={this.imageUrl} style={{marginTop: this.position.x, marginLeft: this.position.y}}></img>
		const context= state.context;		
		context.fillStyle = this.obstacleType.name;
		context.save();
		context.fillRect(this.position.x,this.position.y,this.dimensions.length,this.dimensions.width);
		context.stroke();
	}
}