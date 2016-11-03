import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const ws = new WebSocket("ws://localhost:5000");

// Handle any errors that occur.

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                name: "Bob"
            }, // optional. if currentUser is not defined, it means the user is Anonymous
            messages: [],
            newMessage: ''
        };
        this.newMessage = this.newMessage.bind(this)
    }

    newMessage(ev) {
        if (ev.charCode === 13) {
            const newMessage = {
                username: this.state.currentUser.name,
                content: ev.target.value
            }
            const message = this.state.messages.concat(newMessage)
            const data = JSON.stringify(newMessage)
            ws.send(data)
        }
    }

    componentDidMount() {
        console.log("componentDidMount <App />");

        setTimeout(() => {

            console.log("Simulating incoming message");
            // Add a new message to the list of messages in the data store
            const newMessage = {
                id: 3,
                username: "Michelle",
                content: "Hello there!"
            };
            const messages = this.state.messages.concat(newMessage)
            // Update the state of the app component.
            // Calling setState will trigger a call to render() in App and all child components.
            this.setState({messages: messages})
        }, 3000);
    }

    render() {
        console.log("Rendering <App />")
        return (
            <div>
                <nav>
                    <h1>Chatty</h1>
                </nav>
                <MessageList messages={this.state.messages}/>
                <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
            </div>
        );
    }
}
export default App;
