import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Sample extends React.Component {
	constructor () {
		super();
		this.state = {
			name:'Guest name',
			age: '',
			gender: '',
			company: ''
		}
	}

	handleNameState (event) {
		this.setState({ name: event.target.value });
	}

	handleAgeState (event) {
		this.setState({ age: event.target.value });
	}

	handleGenderState (event) {
		this.setState({ gender: event.target.value });
	}

	handleCompanyState (event) {
		this.setState({ company: event.target.value });
	}

	render () {
		return (
			<div>
				<h1>Hello {this.props.message}</h1>
				<TextField floatingLabelText="Name" onChange={this.handleNameState.bind(this)} value={this.state.name}/>
				<br/>
				<TextField floatingLabelText="Age" onChange={this.handleAgeState.bind(this)} value={this.state.age}/>
				<br/>
				<TextField floatingLabelText="Gender" onChange={this.handleGenderState.bind(this)} value={this.state.gender}/>
				<br/>
				<TextField floatingLabelText="Company" onChange={this.handleCompanyState.bind(this)} value={this.state.company}/>
				<br/>
				<RaisedButton label="Primary" primary={true} />
			</div>
		);
	}
}//end of class
