import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Input} from 'semantic-ui-react'
import {hashHistory} from 'react-router';
import Cookies from 'universal-cookie';
const cookies= new Cookies();

// import { Link } from 'react-router-dom'
export default class Greeting extends React.Component {
  constructor(){
    super()
    this.state = {
      dummyElement: [],
      allElements: [{location: 'Laguna Verde',
      month: 'Dec',
      dateTime:'',
      temperature:'38.99',
      humidity: '23.62',
      windVelocity: '15',
      rain: '1.52',
      results: '',
    }],
    risk: 'High'
    }

  }
  locationChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].location =  value
        return prev
      })
  }
  monthChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].month =  value
        return prev
      })
  }
  dateTimeChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].dateTime =  value
        return prev
      })
  }
  temperatureChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].temperature =  value
        return prev
      })
  }
  humidityChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].humidity =  value
        return prev
      })
  }
  windVelocityChange(val,e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].windVelocity =  value
        return prev
      })
  }
  rainChange(e){
    var value =  e.target.value
      this.setState((prev)=>{
        prev.allElements[val].rain =  value
        return prev
      })
  }
  predictClick(){
    let context = this
    for (var i = 0; i < this.state.allElements.length; i++) {
      let inputObj = {"Inputs": {
                 "input1":
                 [
                     {
                             "Location": this.state.allElements[i].location,
                             "Month": this.state.allElements[i].month,
                             "Temperature": this.state.allElements[i].temperature,
                             "Humidity": this.state.allElements[i].humidity,
                             "Wind Velocity(km/h)": this.state.allElements[i].windVelocity,
                             "Rain(mm)": this.state.allElements[i].rain,
                             "Risk": this.state.risk
                     }
                 ]
         },
         "GlobalParameters": {}
         }
         var arr = this.state.allElements[i]

      $.ajax({
        url: "http://localhost:8080/stream",
      type: 'GET',
      data: inputObj,
              success: function(data) {
                console.log(parseFloat(JSON.parse(data).Results.output1[0]['Scored Probabilities for Class "High"'])*100+'');
                context.setState((prev)=>{
                  arr.results ='Risk: '+ (parseFloat(JSON.parse(data).Results.output1[0]['Scored Probabilities for Class "High"'])*100).toFixed()+'%'
                  return{
                    prev
                  }
                })
              }.bind(context),
              error: function(err) {
                  console.log('error occurred on AJAX');
                  console.log(err);
              }.bind(this)
          });
    }

  }
  deleteInput(){
    this.setState((prev) => {
      prev.allElements.pop()
      return {allElements:  prev.allElements }
    })
  }
  addInput(){
    this.state.allElements.push({location: 'Laguna Verde',
    month: 'Dec',
    dateTime:'',
    temperature:'38.99',
    humidity: '23.62',
    windVelocity: '15',
    rain: '1.52',
    risk: 'High',
    results: ''
  })
    this.setState({
      allElements: this.state.allElements
    })
  }
  render() {
    var fieldElements = this.state.allElements.map((value,ind) => {
      return(
        <Segment style={{marginLeft: '2%'}}>
        <Header as='h5'>{ind+1}. Input Set</Header>
        <Form.Field>
        <label>
        Location:
        </label>
          <Input
            icon='location arrow'
            id = "21"
            iconPosition='left'
            placeholder={value.location}
            onChange = {this.locationChange.bind(this, ind)}
            value = {value.location}
          />
          </Form.Field>
          <Form.Field>
          <label>
          Month(Mmm):
          </label>
          <Input
            icon='calendar'
            iconPosition='left'
            placeholder={value.month}
            value={value.month}
            onChange = {this.monthChange.bind(this, ind)}
          />
          </Form.Field>
          <Form.Field>
          <label>
          Temperature(celsius):
          </label>
          <Input
            icon='theme'
            iconPosition='left'
            placeholder={value.temperature}
            value={value.temperature}
            onChange = {this.temperatureChange.bind(this, ind)}
          />
          </Form.Field>
          <Form.Field>
          <label>
          Humidity(%):
          </label>
          <Input
            icon='hourglass empty'
            iconPosition='left'
            placeholder= {value.humidity}
            value= {value.humidity}
            onChange = {this.humidityChange.bind(this, ind)}
          />
          </Form.Field>
          <Form.Field>
          <label>
          Wind Velocity(km/h):
          </label>
          <Input
            icon='space shuttle'
            iconPosition='left'
            placeholder={value.windVelocity}
            value={value.windVelocity}
            onChange = {this.windVelocityChange.bind(this, ind)}
          />
          </Form.Field>
          <Form.Field>
          <label>
          Rain(mm):
          </label>
          <Input
            icon='rain'
            iconPosition='left'
            placeholder={value.rain}
            value={value.rain}
            onChange = {this.rainChange.bind(this, ind)}
          />
          </Form.Field>
          <Header as = 'h3' color='red'>{value.results}</Header>
        </Segment>
      )
    })
    var FieldElement = <div>
    {fieldElements}
    </div>

    return (
      <div>
            <Header as='h2' color='green' textAlign='center'>
              {' '} Predict Risk
            </Header>
            <Form size='large' error={this.state.humidity}>
              {FieldElement}
            </Form>
            <Button style={{marginLeft: '2%', marginTop: '1%'}} onClick= {this.addInput.bind(this)}>Add Input</Button>
            <Button onClick= {this.deleteInput.bind(this)}>Delete Input</Button><br/>
            <Button style={{marginLeft: '2%', marginTop: '1%'}} color='orange' size='large' onClick = {this.predictClick.bind(this)}>Predict</Button>
      </div>
    )
  }
}
