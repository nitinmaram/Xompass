import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import {hashHistory} from 'react-router';
import Cookies from 'universal-cookie';
const cookies= new Cookies();

// import { Link } from 'react-router-dom'
export default class Greeting extends React.Component {
  constructor(){
    super()
    this.state = {
      userName: '',
      password: '',
      accountname:'',
      role:'',
      invalidStatus: false
    }
  }
  userNameChange(e){
    this.setState({
      userName: e.target.value
    })
  }
  passwordChange(e){
    this.setState({
      password: e.target.value
    })
  }
  forgotClick(){
    console.log('here');
    hashHistory.push('/forgot')
  }
  loginClick(){
    // let context = this
    // let loginObj = {}
    // loginObj['username'] = this.state.userName
    // loginObj['password'] = this.state.password
    // $.ajax({
    //         url: "http://localhost:3000/login",
    //         type: 'POST',
    //         data: loginObj,
    //         success: function(data) {
    //           console.log(data);
    //           if(data.message == 'Success'){
    //             console.log(data);
    //             context.setState({accountname :data.data.account_name});
    //             context.setState({role :data.data.role});
    //             cookies.set('accountid', data.data.account_id);
    //             cookies.set('username', context.state.userName);
    //             cookies.set('accountname', context.state.accountname);
    //             cookies.set('role', context.state.role);
                hashHistory.push('/home');
        //     }
        //       else if(data.message == 'failure') {
        //         context.setState({
        //           invalidStatus: true
        //         })
        //       }
        //       else{
        //         alert('Error in Login')
        //       }
        //     }.bind(context),
        //     error: function(err) {
        //         console.log('error occurred on AJAX');
        //         console.log(err);
        //     }.bind(this)
        // });
  }
  render() {
    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
              <Image src='../../images/xompass-cut.png' />
              {' '} Log-In to your Account
            </Header>
            <Form size='large' error={this.state.invalidStatus}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange = {this.userNameChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange = {this.passwordChange.bind(this)}
                />

                <Button color='green' fluid size='large' onClick = {this.loginClick.bind(this)}>Login</Button>
                <Message
        error
        header='Invalid UserName/Password'
      />
              </Segment>
            </Form>
            <Message>
             <a onClick = {this.forgotClick.bind(this)}>Forgot password ?</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
