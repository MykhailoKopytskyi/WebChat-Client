//styles
import "./style.css";
//context
import Context from "../../../../context/context";
//hooks
import { useContext, useState, useEffect } from "react";
//components
import ErrorPopup from "../../../shared/ErrorPopup";
//utils
import { displayLanguage } from "../../../../utils/displayLanguage";
//UUID
import { v4 as uuidv4 } from "uuid"


const ChatInput = (props) => {
  //context
  const context = useContext(Context);
  const socket = context.socket;
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  //props
  const chatID = props.chatID;

  //hooks
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");

  function sendMessage(messageText) {
    const text = messageText.trim();
    if( text.length == 0 || text.length >1024 ) {
      setError({error: "Message was not sent", message: "Message is either null or too long"});
      setTimeout( () => {
        setError(false);
      },2000 )
      return;
    }
    const messageObj = {
      messageID: uuidv4(),
      chatID: chatID,
      messageText: text
    }
    setMessageText("");
    if(socket.connected){
      socket.emit("create-message", JSON.stringify(messageObj) );
    }
  }

  useEffect( () => {
    const enterClick = (e) => {
      if(e.key === "Enter") {
        sendMessage(messageText);
      }
    }
    window.addEventListener( "keydown", enterClick )
    return () => window.removeEventListener("keydown", enterClick);
  } )

  return (
    <>
      { error ? <ErrorPopup error={error} /> : null}

      <div className="chat-input" >
        <input type="text" 
          placeholder={
            displayLanguage(language, {
              english: "Input your message",
              ukrainian: "Введіть своє повідомлення",
              russian: "Введите ваше сообщение"
            }) 
          } 
          value={messageText} onChange={ (e) => setMessageText(e.target.value) } 
          style={ theme == "light" ? {"backgroundColor" : "rgb(184 184 184)"} : {"backgroundColor" : "#313131"} }
        />
        <button className="circle" onClick={ ()=> sendMessage(messageText) }>
          <i className="fa-solid fa-paper-plane fa-2x"></i>
        </button>
      </div>
    </>
  )
}

export default ChatInput
