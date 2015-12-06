import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}
	componentDidMount(){
		axios.get('/api/users/show.json', {
			params: {
				user_id: this.props.userId
			}
		})
			.then(function(res){
				this.setState({
					data: res.data
				})
			}.bind(this));
	}
	render() {
		let data = this.state.data;
		return (<div>
			<Card>
				<CardMedia overlay={<CardHeader avatar={<Avatar src={data.profile_image_url} />} title={data.name} subtitle={`@${data.screen_name}`} />}>
					<img src={data.profile_banner_url} />
				</CardMedia>
				<CardTitle subtitle={data.description} />
			</Card>
		</div>);
	}
}

Profile.defaultProps = {
	userId: ''
};