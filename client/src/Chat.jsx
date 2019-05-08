import React, { Component } from 'react'

import { Container } from 'bloomer';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { Box } from 'bloomer/lib/elements/Box';
import { Content } from 'bloomer/lib/elements/Content';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Button } from 'bloomer/lib/elements/Button';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';

export default class Chat extends Component {
  constructor(props){
    
    super(props)
    this.chatArea = ""
    this.state = {
      messagesList: [],
      message: ""
    }
  }

  submitMessage(e){
    e.preventDefault()
    if(this.state.message.trim() !== ""){
      const today = new Date();
      const timeStamp = today.getHours() + ":" + today.getMinutes();
      const messages = [...this.state.messagesList]
      messages.push({
      user: this.props.userName,
      message: this.state.message,
      timeStamp
    })

    this.setState({
      ...this.state,
      messagesList: messages,
      message: ""
    })
    }
    

  }

  handleChange(e){
    this.setState({message: e.target.value})
  }

  componentDidMount(){
    this.chatArea = document.querySelector(".chat-area")

  }

  componentDidUpdate(){
    this.chatArea.scrollTop = this.chatArea.scrollHeight;
  }


  render() {
    const {users, userName} = this.props
    

    if(!userName){
      this.props.history.push("/")

    }

    return (
      <Container  className="chat-container is-fluid">
      <Content>
      <Columns isSize="1/4">
        <Column className="users-list">
        <h2 className="title">Users list</h2>
        <ul>
          {users.map((user, idx) => {
            return user===userName?
            <li key={idx} className="current-user">{user}</li>:
            <li key={idx}>{user}</li>
          })}
        </ul>
        </Column>
        <Column  isSize="3/4">
        <Box className="chat-area">
        <ul>
          {this.state.messagesList.map((message, idx) =>{
            return message.user===userName?
          <li key={idx} className="current-user-message">[{message.timeStamp}] {message.user}: {message.message} </li>:
          <li key={idx}>[{message.timeStamp}] {message.user}: {message.message} </li>
          })}
        </ul>
        </Box>
        <form className="text-form" onSubmit={(e) => this.submitMessage(e)}>
          <Field isGrouped>
          <Input
            onChange={e => this.handleChange(e)}
            type="text" 
            placeholder="write a message..."
            value={this.state.message}/>
          <Control>
            <Button 
              isColor="danger"
              onClick={(e) => this.submitMessage(e)}>
              Send
            </Button>
          </Control>
          
          </Field>
        </form>
        </Column>
      </Columns>

      </Content>
      </Container>
    )
  }
}
