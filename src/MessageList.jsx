import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render() {
      console.log("Rendering <MessageList />")
        return (
              <div id="message-list">
                {this.props.messages.map( (message, i) => (
                <Message key={i}
                         username={message.username}
                         content={message.content}/>))
                }
              </div>
        );
    }
}
export default MessageList;