import React from 'react'
import { Button, Checkbox, Form} from 'semantic-ui-react'
import { ToastContainer, toast, style } from 'react-toastify';

style({
  TOP_RIGHT: {
    top: '5em',
    right: '10em'
  }
})

export default class AddCompany extends React.Component {
constructor(){
  super()
  this.state={
    ACCOUNT_ID: '',
    USERNAME: '',
    PASSWORD: '',
    ROLE: '',
    accSelected: ''
  }
  this.notifySuccess = this.notifySuccess.bind(this)
  this.notifyError = this.notifyError.bind(this)
}
componentWillMount(){
  let context = this
  $.ajax({
          url: "http://localhost:3000/user/"+this.props.params.uName,
          type: 'GET',
          success: function(data) {
            context.setState({
              ...data,
              accSelected: context.props.accMapObj[data.ACCOUNT_ID]
            })
          }.bind(context),
          error: function(err) {
              console.log('error occurred on AJAX');
              console.log(err);
          }.bind(context)
      });
}
notifySuccess(){
  console.log('here');
  toast.success("Updated Successfully !", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
}
notifyError(){
  toast.error("Errro!", {
    position: toast.POSITION.BOTTOM_CENTER
  });
}

myFunction(){
  var configObj = {}

    configObj={
      PASSWORD: this.state.PASSWORD,
      USERNAME: this.state.USERNAME,
      ACCOUNT_ID: this.state.ACCOUNT_ID,
      ROLE: this.state.ROLE
    }
setTimeout(this.myFunction1.bind(this, configObj), 100)
}
myFunction1(configObj){
  console.log(configObj, "configObj");
  let context = this
  $.ajax({
          url: "http://localhost:3000/user/",
          type: 'PUT',
          data: configObj,
          success: function(data) {
            console.log(data);
            context.notifySuccess()
          }.bind(context),
          error: function(err) {
              console.log('error occurred on AJAX');
              console.log(err);
          }.bind(context)
      });
}
submitClick(){
  setTimeout(this.myFunction.bind(this), 100)
}
accChange(e,data){
  this.setState({
    accSelected: this.props.accMapObj[data.value],
    ACCOUNT_ID: data.value
  })
}
userNameChange(e){
  this.setState({
USERNAME: e.target.value
  })
}
passwordChange(e){
  this.setState({
PASSWORD: e.target.value
  })
}
roleChange(e, data){
  this.setState({
ROLE: data.value
  })
}

render(){
  const options = [
    { key: 'm', text: 'admin', value: 'admin' },
    { key: 'f', text: 'user', value: 'user' }
  ]
  const accOptions = [
    { key: '1', text: 'Atlanta Beverage', value: '1' },
    { key: '2', text: 'Jean Coutu', value: '2' },
    { key: '3', text: 'Admin', value: '0' }
  ]
  return(
    <div>
    <Form>

    <Form.Select fluid label= {this.state.accSelected} options={this.props.accOptions}
    onChange = {this.accChange.bind(this)} placeholder= {this.state.accSelected}>
    </Form.Select>

        <Form.Field>
          <label>User Name</label>
          <input placeholder='User Name' onChange={this.userNameChange.bind(this)} value={this.state.USERNAME}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={this.passwordChange.bind(this)} value={this.state.PASSWORD}/>
        </Form.Field>
          <Form.Select fluid label='Role' onChange={this.roleChange.bind(this)} options={options} value={this.state.ROLE} placeholder='Role' />
        <Button type='submit' color = 'olive' onClick={this.submitClick.bind(this)}>Submit</Button>
      </Form>
      <ToastContainer />
      </div>
  )
}
}
