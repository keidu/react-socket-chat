import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import InputName from './components/InputName';
import 'bulma/css/bulma.css'
import Chat from './components/Chat';

/** 1. import socket client **/
import io from 'socket.io-client';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userlist:[],
      username: null,
    }

    /** 2. connect to server **/
    this.socket = io("http://192.168.20.37:5000")
  }

  newUser(user){
    const newList = [...this.state.userlist]
    newList.push(user)
    /** 3. send event to server **/
    this.socket.emit("userConnect", user)
    
    this.setState({
      ...this.state,
      userlist: newList,
      username: user
    }, ()=>{this.props.history.push("/chat") })
    
  }

  getList(userList){
    this.setState({
      ...this.state,
      userlist: userList
    })
  }

  // componentDidMount(){

  //   /** 4. listen to new messages and add them to state **/
  //   this.socket.on("newUser", userList =>{
  //     this.setState({
  //       ...this.state,
  //       userlist: userList
  //     })
  //   })
  // }

  

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/"
            render={props => <InputName {...props} newUser={(user) => this.newUser(user)}/>}
            />
          <Route
            exact path="/chat"
            render={props => <Chat {...props} users={this.state.userlist} userName={this.state.username} list={(userList)=>{this.getList(userList)}}/>}
            />
        </Switch>
      </div>
    );

  }
}

export default withRouter(App)

