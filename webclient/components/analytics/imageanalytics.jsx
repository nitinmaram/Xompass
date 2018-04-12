import React from 'react'
import {hashHistory} from 'react-router';
import { Button, Form, Grid, Header, Image, Message, Segment, Card, Loader, Dimmer} from 'semantic-ui-react'
// import { Link } from 'react-router-dom'



export default class Greeting extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      url: '',
      urls:[{image_urls: ""}],
      results: '',
      rData: [],
      active: false
    };
  }
  addUrls(){
    this.setState((prev)=>{
      prev.urls.push({image_urls:""})
      return prev
    })
  }
  removeUrls(val){
    this.setState((prev)=>{
      prev.urls.splice(val,1)
      return prev
    })
  }
  urlsChange(val,e){
    var data = e.target.value
    this.setState((prev)=>{
      prev.urls[val].image_urls=data
      return prev
    })
  }
  urlChange(e){
    this.setState({
      url: e.target.value
    })
  }
  imageSubmission(){
    let context = this
    this.setState({
      active: true
    })
    var image_urls = {image_urls: []}
    for (var i = 0; i < this.state.urls.length; i++) {
      image_urls.image_urls.push(this.state.urls[i].image_urls)
    }
    image_urls.image_urls = JSON.stringify(image_urls.image_urls)

    $.ajax({
            url: "http://localhost:5000/json",
            type: 'POST',
            "data": image_urls,
            success: function(data) {
              context.setState({
                results: "Results",
                rData: JSON.parse(data),
                active: false
              })
              console.log(context.state.rData);
            }.bind(context),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
                context.setState({
                  active: false,
                  results: "Error",
                  rData: err
                })
            }.bind(this)
        });
  }
  render() {
    const urlContents = this.state.urls.map((val,ind)=>{
      return(<Form.Field>
        {ind==0?<label>Image Urls</label>:""}
        <Form.Group>
        <input placeholder={'Url '+(ind+1) } onChange = {this.urlsChange.bind(this,ind)} value = {this.state.urls[ind].image_urls}/>&nbsp;&nbsp;
        <Button color='red' onClick = {this.removeUrls.bind(this,ind)}>-</Button>
        <Button color='olive' onClick = {this.addUrls.bind(this,ind)}>+</Button>
        </Form.Group>
      </Form.Field>)
    })

    const cardContent = this.state.rData.map((val, ind) => {
      return(
        <Card>
        <Card.Content>
          <Image floated='right' size='medium' src={val.url} />
          <Card.Header>
            Fire {parseFloat(val.fire).toFixed(2)*100} %
          </Card.Header>
          <Card.Description>
              Smoke {parseFloat(val.smoke).toFixed(2)*100} %
          </Card.Description>
        </Card.Content>
        </Card>
      )
    })
    const { active } = this.state
    return (

      <div>
          <Dimmer active={active} page>
            <Loader>Predicting ..</Loader>
          </Dimmer>
      <Header>
      Image Analytics
      </Header>
      <Form size='large'>
        <Segment stacked>
          {urlContents}
          <Button color='green' fluid size='large' onClick = {this.imageSubmission.bind(this,this.state.url)}>Send</Button>
        </Segment>
      </Form>
      <Header>{this.state.results}</Header>
      <Card.Group>
      {cardContent}
      </Card.Group>
      </div>
    )
  }
}
