import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tweet from './tweet.jsx';

export default class Tweets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	componentDidMount(){
		axios.get(this.props.source)
			.then(function(res){
				this.setState({
					list: res.data
				});
			}.bind(this));
	}
	render() {
		return (
			<div>
				{this.state.list.map(d => {
					return <Tweet key={d.id} data={d} />	
				})}
			</div>
		);
	}
}

Tweets.defaultProps = {
	source: ''
};
	


