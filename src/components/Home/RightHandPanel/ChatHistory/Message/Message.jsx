//styles
import "./style.css";
//context
import Context from "../../../../../context/context";
import { useContext } from "react";

const Message = (props) => {
  //context
  const context = useContext(Context);
  const myUserID = context.mainDataHandler.mainData.userID;
  const messageTextSize = context.messageTextSizeHandler.messageTextSize;
  const theme = context.themeHandler.theme;

  //props message
  const messageText = props.message.messageText;
  const status = props.message.status;
  const senderID = props.message.senderID;
  const sendTime = new Date(props.message.sendTime);
  const isLast = props.isLast;

  // determine if this client is the sender of this message
  const amIsender =  myUserID == senderID;

  //parse date in a needed format
  const date = `${sendTime.getDate()}`.padStart(2, "0");
  const month = `${sendTime.getMonth() + 1}`.padStart(2,"0");
  const year = sendTime.getFullYear();
  const concatDate = `${date}/${month}/${year}`;

  //parse time in a needed format
  const hours = `${sendTime.getHours()}`.padStart(2,"0");
  const minutes = `${sendTime.getMinutes()}`.padStart(2,"0");
  const concatTime = `${hours}:${minutes}`;

  return (
    <div className="message-wrapper" style={ amIsender? {justifyContent: "flex-end", paddingLeft: "10px"}: {justifyContent:"flex-start", paddingRight: "10px"}} id={ isLast ? "last" : "" } >
      <div className="message"  style={
      theme === "dark"
        ? amIsender
          ? { backgroundColor: "#8774E1" }
          : { backgroundColor: "#373737" }
        : amIsender
        ? { backgroundColor: "rgb(145 126 139)" }
        : { backgroundColor: "rgb(166 211 134)" }
    } >
        <div className="message-text" style={{"fontSize": messageTextSize+ "px"}} >{messageText}</div>
        <div className="status-send-date" >
          <span className="status" >{ !amIsender ? "" : status}</span>
          <div className="send-date" >
            <span>{concatDate}</span>
            <span>{concatTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
