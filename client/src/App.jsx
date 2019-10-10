import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import InputName from "./components/InputName";
import "bulma/css/bulma.css";
import Chat from "./components/Chat";

/** import socket client **/
import io from "socket.io-client";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      username: null
    };

    /** connect to server **/
    this.socket = io("http://192.168.20.150:5000");

    this.socket.on("updatedUserList", updatedUsersList => {
      this.setState({ ...this.state, userlist: updatedUsersList })
    });
  }

  createChatUser(user) {
    if (user.trim() !== "") {
      this.socket.emit("newConfirmedChatUser", user);
      this.setState({...this.state, username: user})
      this.props.history.push("/chat")    
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <InputName
                {...props}
                createChatUser={user => this.createChatUser(user)}
              />
            )}
          />
          <Route
            exact
            path="/chat"
            render={props => (
              <Chat
                {...props}
                update={this.updateList}
                socket={this.socket}
                users={this.state.userlist}
                userName={this.state.username}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
