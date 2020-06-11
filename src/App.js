import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import Post from './components/Post';

class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Home path="/" />
					<Post path="/post/:id"/>
				</Router>
			</div>
		);
	}
}

export default App;
