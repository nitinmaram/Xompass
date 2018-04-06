import React from 'react';

import SignUp from '../../components/forgot';

//This is a view layout, hence avoid putting any business logic
export default class SignUpView extends React.Component {
	render () {
		return <SignUp message='React Sample'></SignUp>
	}
}
