//styles
import "./style.css";
//context
import Context from "../../../../context/context";
//hooks
import { useContext, useState } from "react";
//react router dom
import { useNavigate } from "react-router-dom";
//config
import configuration from "../../../../config/config";
//utils
import { displayLanguage } from "../../../../utils/displayLanguage";

const ChatInfo = (props) => {
  //hooks
  const [visiblePopup, setVisiblePopup] = useState(false);

  //props
  const chatID = props.chatID;
  const username = props.username;
  const setIsLeftOpened = props.setIsLeftOpened;
  const isLeftOpened = props.isLeftOpened;

  //context
  const context = useContext(Context);
  const socket = context.socket;
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  //navigation
  const navigate = useNavigate();

  async function removeChat(chatID) {
    socket.disconnect();

    const response = await fetch(configuration.apiEndpoints.removeChat, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        },
      credentials: "include",
      body: JSON.stringify({chatID})
    })
    await response.json();

    socket.connect()
    setVisiblePopup(false);
    setIsLeftOpened(true);
    navigate("/home");
  }

  function goBackHome() {
    setIsLeftOpened(true);
    navigate("/home");
  }

  return (
    <div className="chat-info" style={ theme == "light" ? {"backgroundColor": "rgb(191, 174, 212)"} : {"backgroundColor": "#313131"} } >
      {visiblePopup ?
        <div className="popup-wrapper" onClick={ () => setVisiblePopup(false) } >
          <div className="remove-chat-popup" onClick={ (e) => e.stopPropagation() }  >
            <p>
            {
              displayLanguage(language, {
                english: "Are you sure you want to remove the current chat ?",
                ukrainian: "Ви впевнені, що хочете видалити поточний чат?",
                russian: "Вы уверены, что хотите удалить текущий чат?"
              }) 
            }
            </p>
            <p>
              {
                displayLanguage(language, {
                  english: "All messages will be lost!",
                  ukrainian: "Усі повідомлення будуть втрачені!",
                  russian: "Все сообщения будут потеряны!"
                }) 
              }
            </p>
            <button onClick={ () => removeChat(chatID) }  >
              {
                displayLanguage(language, {
                  english: "Leave a chat",
                  ukrainian: "Залишити чат",
                  russian: "Выйти из чата"
                }) 
              }
            </button>
          </div>
        </div>  
        : ""
      }
      <div className="left-group" >

        {!isLeftOpened && <span className="go-back" onClick={goBackHome} >
          <i className="fa-solid fa-arrow-left fa-2x"></i>
        </span> } 
        <p className="username">{username}</p>
      </div>
      
      <button className="leave-chat" onClick={ () => setVisiblePopup(true) } > 
        {
          displayLanguage(language, {
            english: "Leave a chat",
            ukrainian: "Залишити чат",
            russian: "Выйти из чата"
          }) 
        }
      </button>
    </div>
  )
}

export default ChatInfo;
