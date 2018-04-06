import React from 'react';

import Home from '../../components/home';

//This is a view layout, hence avoid putting any business logic
export default class HomeView extends React.Component {
	render () {
		return <Home message='React Home'></Home>
	}
}
