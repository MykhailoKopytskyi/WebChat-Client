//components
import ChatInfo from "./ChatInfo/ChatInfo"
import ChatHistory from "./ChatHistory/ChatHistory"
import ChatInput from "./ChatInput/ChatInput";
//react router dom
import { useParams } from "react-router-dom";
//styles
import "./style.css"
//context
import Context from "../../../context/context";
//hooks
import { useContext, useEffect } from "react";

import { useOutletContext } from "react-router-dom";

const RightHandPanel = () => {

  // outlet context (props)
  const props = useOutletContext()[0];
  const windowWidth = props.windowWidth;
  const isRightOpened = props.isRightOpened;
  const setIsRightOpened = props.setIsRightOpened;
  const isLeftOpened = props.isLeftOpened;
  const setIsLeftOpened = props.setIsLeftOpened;

  //URL
  const params = useParams();
  const username = params.username;

  //context
  const context = useContext(Context);
  const chats = context.mainDataHandler.mainData.chats;

  let chatID;
  for(let i = 0; i < chats.length; i++) {
    if( chats[i].username == username ) {
      chatID = chats[i].chatID;
    }
  }

  useEffect( () => {
    if( windowWidth <= 800  ) {
      setIsLeftOpened(false);
    }
    else {
      setIsLeftOpened(true)
    }
  } , [windowWidth])


  return (
    <div className="right-hand-panel" >
      <div>
        <ChatInfo username={username} chatID={chatID} setIsRightOpened={setIsRightOpened} setIsLeftOpened={setIsLeftOpened} isLeftOpened={isLeftOpened} />
        <ChatHistory chatID={chatID} username={username}  />
      </div>
   
      <ChatInput chatID={chatID} />
    </div>
  )
}

export default RightHandPanel
