import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: ''
    }
  }


  render() {
    console.log("Rendering <ChatBar />")
    return (
  <footer>
    <input id="username"
           type="text"
           placeholder="Your name here (Optional)"
           onKeyPress= { this.props.username }
           />
    <input id="new-message"
           type="text"
           placeholder="Type a message and hit ENTER"
           onKeyPress={ this.props.newMessage }/>
  </footer>
    );
  }
}

export default ChatBar;
