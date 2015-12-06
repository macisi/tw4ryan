import React from 'react';
import ReactDOM from 'react-dom';
import Tweets from '../component/tweets.jsx';
import Profile from '../component/profile.jsx';

	
class UserPage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let userTimeLineSource = `/api/statuses/user_timeline.json?user_id=${this.props.userId}`;
		return (
			<div>
				<Profile userId={this.props.userId} />
				<div>
					<Tweets source={userTimeLineSource} />
				</div>
			</div>
		);
	}
}

UserPage.defaultProps = {
	userId: __Config.userId
};

ReactDOM.render(<UserPage />, document.getElementById('J_Content'));