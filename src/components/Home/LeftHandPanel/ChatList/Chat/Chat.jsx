//styles
import "./style.css";
//context
import Context from "../../../../../context/context";
//hooks
import { useContext } from "react";
//utils
import { displayLanguage } from "../../../../../utils/displayLanguage";

const Chat = (props) => {
  //context
  const context = useContext(Context);
  const userID = context.mainDataHandler.mainData.userID;
  const language = context.languageHandler.language;

  //props
  const active = props.active;
  const username = props.lastMessageInChat.username;
  const senderID = props.lastMessageInChat.message.senderID;  // in order to identify the message sender
  let messageText = props.lastMessageInChat.message.messageText;
  let sendTime = props.lastMessageInChat.message.sendTime;

  if(messageText.length >= 11) {
    messageText = messageText.substr(0,11) + "...";
  }
 
  let date;
  let month;
  let year;
  let concatDate;

  let hours;
  let minutes;
  let concatTime;

  if(senderID) {
    sendTime = new Date(sendTime);
    date = `${sendTime.getDate()}`.padStart(2, "0");
    month = `${sendTime.getMonth() + 1}`.padStart(2,"0");
    year = sendTime.getFullYear();
    concatDate = `${date}/${month}/${year}`;

    hours = `${sendTime.getHours()}`.padStart(2,"0");
    minutes = `${sendTime.getMinutes()}`.padStart(2,"0");
    concatTime = `${hours}:${minutes}`;
  }

  return (
    <div className={`chat ${active ? "active-link" : ""}`} >
      <div className="left-block" >
        <p className="username" >{username}</p>
        { senderID ? <p className="sender-message-text" > 
          <span className="sender" >
            {!senderID ? "" : (senderID === userID ?   
              displayLanguage(language, {
                english: "You: ",
                ukrainian: "Ви: ",
                russian: "Вы: "
              }) 
              : 
              `${username}: `)
            }
          </span> 
          <span className="message-text" >
            {messageText}
          </span>
        </p> : ""}
      </div>
      { senderID ? <div className="send-date" >
        <span>{concatDate}</span>
        <span>{concatTime}</span>
      </div> : "" }
    </div>
  )
}

export default Chat
