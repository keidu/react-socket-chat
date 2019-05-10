# React Socket Chat

This is a simple example of a chat created with React and websockets.

The *master* branch contains the code without the sockets implementation. If you switch to *addSocket* branch, you will see the code with the sockets already added.

### Usage

- In **server** folder, run *npm run dev* in order to start it. It will run in port 5000 by default.
- In **client** folder, run *npm start* to start the React app.

More info about sockets: [https://socket.io/docs/](https://socket.io/docs/)

Here are some of the steps done to implement sockets:

### Server

1. Install **socket.io** package.

2. Require it on *bin/www*: 

   ```js
   const io = require('socket.io').listen(server);
   ```

3. Listen for connections:

   ```js
   io.on("connection", socket => {
   //here go the events
   })
   ```

4. Receive messages from client and relay them to the rest of the clients:

   ```js
   socket.on("userConnect", user =>{
     console.log(`${user} connected`)
   	socket.broadcast.emit("newUser", user)
      })
   ```

### Client

1. Install **socket.io-client** package

2. Import it where needed

3. On constructor, connect to server:

   ```js
   this.socket = io("URL_OF_THE_BACKEND")
   ```

4. Send message to server:

   ```js
   this.socket.emit("messageSent", message)
   ```

5. When component loads (*componentDidMount*), listen for new messages and add them to the state:

   ```js
   this.socket.on("newMessage", message =>{
   	const messages = [...this.state.messagesList]
   	messages.push(message)
   	this.setState({
   		...this.state,
   		messagesList: messages
   	})
   })
   ```