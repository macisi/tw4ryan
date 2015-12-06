import React from 'react';
import ReactDOM from 'react-dom';

export default class Tweet extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let tweetData = this.props.data;
		return (
			<div>
				<div className="avatar">
					<img src={tweetData.user.profile_image_url} />
				</div>
				<p>{tweetData.text}</p>
			</div>
		);
	}
}

Tweet.defaultProps = {
	data: ''
};
	


