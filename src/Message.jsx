import React, {Component} from 'react';

class Message extends Component {

    render() {
        console.log(this.props)
        if (this.props.username === undefined) {
            return (
                <div className="system">{this.props.content}</div>
            )
        } else {}
        return (
            <div>
                <div className="message">
                    <span className="username">{this.props.username}</span>
                    <span className="content">{this.props.content}</span>
                </div>
            </div>

        );
    }
}
export default Message;
