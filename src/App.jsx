import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';

//connect WebSocket
const ws = new WebSocket("ws://localhost:5000");
let newName;

// Handle any errors that occur.

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
            messages: [],
            newMessage: '',
            counter: 0
        };
        this.newMessage = this.newMessage.bind(this)
        this.username = this.username.bind(this)
        //
        ws.onmessage = (ev) => {
          let inMesg = (JSON.parse(ev.data))
          console.log(this.state.messages)
          const outMsg = this.state.messages.concat(inMesg)
          let data = (JSON.parse(ev.data))
          this.setState({counter: data.count})
          this.setState({messages: outMsg})
        }
    }

    newMessage(ev) {
        if (ev.charCode === 13) { // on enter
            const newMessage = {
                username: this.state.currentUser.name, //username equals currentUser
                content: ev.target.value, //content equals input value
            }
            const data = JSON.stringify(newMessage) //stringify new message
            ws.send(data) //send data to socket

        }
    }

    username(event) {
      if (event.charCode === 13) { // on enter
      let newName={name: event.target.value} //delcaring new username from input
      let oldName={name: this.state.currentUser.name} //declaring previously used username
      !(event.target.value === '') ? this.setState({currentUser: newName}):this.setState({currentUser: {name:'Anonymous'}}) //if username field black default to Anonymous, otherwise input value
        if(newName.name === oldName.name) { //if new and old username match, do nothing
          console.log("I'm the same")
          }
        else {
         const userName = {type: "postNotification", content: `${oldName.name} has changed their name to ${newName.name}`}; // if user changes log message
         ws.send(JSON.stringify(userName)) //stringy username message, send to socket
        }
    }
  }


    componentDidMount(event) {
        console.log("componentDidMount <App />");
    }

    render() {
        console.log("Rendering <App />")
        return (
            <div>
                <nav>
                    <h1>Chatty</h1>
                    <h5 className='counter'> There are currently { this.state.counter } users online</h5>
                </nav>
                <MessageList messages={this.state.messages}/>
                <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} username={this.username}/>
            </div>
        );
    }
}
export default App;
