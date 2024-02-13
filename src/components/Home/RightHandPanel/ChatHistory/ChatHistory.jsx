//hooks
import { useContext, useEffect, useRef} from "react";
//components
import Message from "./Message/Message"
//context
import Context from "../../../../context/context";
//styles
import "./style.css";

const ChatHistory = (props) => {
  //props
  const chatID = props.chatID;

  //context
  const context = useContext(Context);
  const socket = context.socket;
  const userID = context.mainDataHandler.mainData.userID;
  const messages = context.mainDataHandler.mainData.messages;

  const divRef = useRef();

  const currentChatMessages = messages.filter( (message) => message.chatID == chatID )

  useEffect( () => {
    const chatHistory = divRef.current;
    const lastMessage = chatHistory.querySelector("#last");
    if(lastMessage) {
      lastMessage.scrollIntoView({"behavior": "smooth"})
    }
  })

  return (
    <div className='chat-history' ref={divRef} >
      {currentChatMessages.map( (message,index) =>  {
        const isLast = index == currentChatMessages.length - 1;
        if(message.status == "sent" && message.senderID != userID ) { // if the message has not been viewed and it was sent TO ME
          socket.emit("update-message", JSON.stringify(message));
        }
        return <Message message={message} key={message.messageID} isLast={isLast} />
      } )}
    </div>
  )
}

export default ChatHistory
