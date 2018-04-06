import React from 'react';

import Login from '../../components/login';
import Cookies from 'universal-cookie';
const cookies= new Cookies();
//This is a view layout, hence avoid putting any business logic
export default class LoginView extends React.Component {
	render () {
		return <Login message='React Sample'></Login>
	}
}
