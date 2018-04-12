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
      location: '',
      month: '',
      dateTime:'',
      temperature:'',
      humidity: '',
      windVelocity: '',
      rain: '',
      risk: ''
    }
  }
  locationChange(e){
    this.setState({
      location: e.target.value
    })
  }
  monthChange(e){
    this.setState({
      month: e.target.value
    })
  }

  predictClick(){
    let context = this
    let inputObj = {"Inputs": {
               "input1":
               [
                   {
                           "Location": "Laguna Verde",
                           "Month": "Dec",
                           "Date Time": "2017-12-15T16:09:00Z",
                           "Temperature": "38.99",
                           "Humidity": "23.62",
                           "Wind Velocity(km/h)": "15",
                           "Rain(mm)": "1.52",
                           "Risk": "High"
                   }
               ]
       }
       }
    $.ajax({
      url: "http://localhost:8080/stream",
    type: 'GET',
    data: inputObj,
            success: function(data) {
              console.log(data);
            }.bind(context),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(this)
        });
  }
  render() {
    return (
      <div>
            <Header as='h2' color='green' textAlign='center'>
              {' '} Predict Risk
            </Header>
            <Form size='large' error={this.state.humidity}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange = {this.locationChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='month'
                  type='month'
                  onChange = {this.monthChange.bind(this)}
                />

                <Button color='orange' size='large' onClick = {this.predictClick.bind(this)}>Predict</Button>
                <Message
        error
        header='Invalid location/month'
      />
              </Segment>
            </Form>
      </div>
    )
  }
}
