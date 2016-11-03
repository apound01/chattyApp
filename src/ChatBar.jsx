import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar />")
    return (
  <footer>
    <input id="username"
           type="text"
           value={ this.props.currentUser.name }
           placeholder="Your name here (Optional)" />
    <input id="new-message"
           type="text"
           placeholder="Type a message and hit ENTER"
           onKeyPress={ this.props.newMessage }/>
  </footer>
    );
  }
}

export default ChatBar;
