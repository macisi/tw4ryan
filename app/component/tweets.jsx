import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tweet from './tweet.jsx';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';

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
			<List>
				{this.state.list.map(d => {
					return <div key={d.id}><Tweet data={d} /><ListDivider inset={true} /></div>
				})}
			</List>
		);
	}
}

Tweets.defaultProps = {
	source: ''
};