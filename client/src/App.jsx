import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import InputName from './components/InputName';
import 'bulma/css/bulma.css'
import Chat from './components/Chat';

import io from 'socket.io-client';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userlist:[],
      username: null,
    }
    this.socket = io("http://192.168.20.51:5000")
  }

  newUser(user){
    const newList = [...this.state.userlist]
    newList.push(user)
    this.socket.emit("userConnect", user)
    this.setState({
      ...this.state,
      userlist: newList,
      username: user
    })
    this.props.history.push("/chat")
  }

  componentDidMount(){
    this.socket.on("newUser", user =>{
      const newList = [...this.state.userlist]
      newList.push(user)
      this.setState({
        ...this.state,
        userlist: newList,
      })
    })
  }

  render(){
  
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/"
            render={props => <InputName {...props} newUser={(user) => this.newUser(user)}/>}
            />
          <Route
            exact path="/chat"
            render={props => <Chat {...props} users={this.state.userlist} userName={this.state.username}/>}
            />
        </Switch>
      </div>
    );

  }
}

export default withRouter(App)

