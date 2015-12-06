import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';

export default class Tweet extends React.Component {
	constructor(props) {
		super(props);
	}
	viewProfile(){
		this.location.href = `/user/${this.props.data.user.id}`;
	}
	render() {
		let tweetData = this.props.data;
		return (
			<ListItem
				insetChildren={true}
				leftAvatar={<Avatar src={tweetData.user.profile_image_url} onClick={this.viewProfile.bind(this)} />}
				primaryText={tweetData.text}>
			</ListItem>
		);
	}
}

Tweet.defaultProps = {
	data: ''
};