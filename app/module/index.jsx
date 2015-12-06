import React from 'react';
import ReactDOM from 'react-dom';
import Tweets from '../component/tweets.jsx';

	
class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Tweets source='/api/statuses/home_timeline.json'/>
			</div>
		);
	}
}

Home.defaultProps = {
};

ReactDOM.render(<Home />, document.getElementById('J_Content'));
	


