import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {hashHistory} from 'react-router';

// import { Link } from 'react-router-dom'
export default class Greeting extends React.Component {
  loginClick(){
    hashHistory.push('/')
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
              {' '} Password Recovery
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Button color='green' fluid size='large'>Reset</Button>
              </Segment>
            </Form>
            <Message>
              Already have an Account? <a onClick = {this.loginClick.bind(this)}>Log In</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
