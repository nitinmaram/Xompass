import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import HomePage from './components/home/acc.jsx'
import ImageAnalytics from './components/analytics'
import MLPrediction from './components/ml'



import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Login from './views/login';
import Home from './components/home/home.jsx';
import Forgot from './views/forgot';



ReactDOM.render(
		<Router history={hashHistory}>
			<Route path="/" component={Login} />
			<Route path="/forgot" component={Forgot} />
			<Route path="/home" component={Home} >
			<IndexRoute component={HomePage} />
			<Route path="/imageAnalytics" component={ImageAnalytics} />
			<Route path="/ml" component={MLPrediction} />
			</Route>
		</Router>,
  	document.getElementById('mountapp')
);
