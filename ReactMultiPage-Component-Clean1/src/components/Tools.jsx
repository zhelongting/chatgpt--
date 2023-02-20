import React,{Component}  from "react";
import REST from '../Shared/REST';
import chatBotImage from "./images/chatBot.png";
import humanImage from "./images/human.png";

class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: 1,
            askedQuestion: "",
            chatContent: []
        };
        this.askQuestion = this.askQuestion.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }
    handleQuestionChange(event) {
        this.setState({ askedQuestion: event.target.value });
    }
    askQuestion(){
        var chatContent = this.state.chatContent;
        if(this.state.askedQuestion) {
            var chatEntry = {
                type: 'human',
                content: this.state.askedQuestion,
                id: chatContent.length
            };
            chatContent.push(chatEntry);
            chatEntry = {
                type: 'bot',
                content: '思考中...',
                id: chatContent.length
            };
            chatContent.push(chatEntry);
            this.setState({
                askedQuestion: '',
                chatContent: chatContent
            });
            REST.postChatContent(this.state.askedQuestion).then((response) => {
                chatEntry = {
                    type: 'bot',
                    content: response.choices[0].text,
                    id: chatContent.length
                };
                chatContent.pop();
                chatContent.push(chatEntry);
                console.log(chatContent);
                this.setState({
                    askedQuestion: '',
                    chatContent: chatContent
                });
                console.log(response);
            }, (error) => {
                console.log('ResponseError', error);
            });
        }
    }

    render() {
        let chatEntries = this.state.chatContent.map((chatEntry) => {
            return <ChatItem key={chatEntry.id} chatEntry={chatEntry}/>
        });
        return (
            <div className="contact">
                <div className="container">
                    <div className="row align-items-center my-3">
                        <div className="col-lg-7" style={{paddingRight:50, overflowX:'hidden',overflowY:'auto',height:'calc(100vh - 150px)'}}>
                            <div>
                            {chatEntries}
                            </div>
                        </div>
                        <div className="col-lg-5" style={{paddingLeft:30}}>
                            <h1 className="font-weight-light">工具</h1>
                            <p>
                                您可以在此发言问ChatGPT问题。
                            </p>
                            <input type="text" value={this.state.askedQuestion} onChange={this.handleQuestionChange} id="inputAskedQuestion" className="form-control " placeholder="请输入您想要问的问题..." required autoFocus />

                            <button type="button"  onClick={this.askQuestion} style={{width:120, padding:5, marginLeft: 0, marginTop:10}}>
                                <a style={{fontWeight: 600, cursor: 'pointer'}}>发言</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ChatItem extends Component {

    render() {
        return (
            <div>
                {this.props.chatEntry.type && this.props.chatEntry.type=="bot"?
                    <div className={"row"} style={{marginTop:10}}>
                        <div className={"col-md-2"}>
                            <img
                                className="img-fluid rounded"
                                src={chatBotImage}
                                alt=""
                            />
                        </div>
                        <div className={"col-md-9"} >
                            <div style={{float:"left", marginTop:5, marginLeft:-15, background:'#ededed',padding:10, borderRadius:10}}>
                                {this.props.chatEntry.content}
                            </div>
                        </div>
                        <div className={"col-md-1"}></div>
                    </div>:null}
                {this.props.chatEntry.type && this.props.chatEntry.type=="human"?
                    <div className={"row"} style={{marginTop:10}}>
                        <div className={"col-md-1"}></div>
                        <div className={"col-md-9"}>
                            <div style={{float:"right", marginTop:5, marginRight:-25, background:'#51b956', color:'#fff', padding:10, borderRadius:10}}>
                                {this.props.chatEntry.content}
                            </div>
                        </div>
                        <div className={"col-md-2"}>
                            <img
                                className="img-fluid rounded"
                                src={humanImage}
                                alt=""
                            />
                        </div>
                    </div>:null}
            </div>
        );
    }
}

export default Tools;
