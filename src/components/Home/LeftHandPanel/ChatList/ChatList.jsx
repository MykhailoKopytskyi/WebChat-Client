//styles
import "./style.css";
//components
import Chat from "./Chat/Chat";
import FoundContact from "./FoundContact/FoundContact";
//hooks
import { useContext} from "react";
//context
import Context from "../../../../context/context";
// react router dom component
import { NavLink } from "react-router-dom";

const ChatList = (props) => {

  //props
  const foundContacts = props.foundContacts;
  const contact = props.contact.trim();
  const setContact = props.setContact;

  //context
  const context = useContext(Context);
  const mainData = context.mainDataHandler.mainData;
  const chats = mainData.chats;
  const messages = mainData.messages;

  if(contact && !foundContacts.error) { // user inputted a value and no error returned
    return (
      <div className="found-contacts" >
        {foundContacts.map( (foundContact) => {
          return <FoundContact foundContact={foundContact} setContact={setContact} />
        })}
      </div>
    )
  }

  let lastMessageInChats = chats.map( (chat) => { // prefill chatsLastMessage Array with null values in case it is a new chat and has no mesages.
    const lastMessageInChat = {
      message: {
        messageText: "",
        username: "",
        sendTime: "",
        messageText: "",
        chatID: chat.chatID
      },
      username: chat.username,
    }
    return lastMessageInChat;
  } )

  for( let i = 0; i < chats.length; i++ ) {
    const chatID = chats[i].chatID;
    for( let j = messages.length - 1; j >=0; j-- ) {
      const messageChatID = messages[j].chatID;
      if( messageChatID == chatID ) {
        const lastMessageInChat = {
          message: messages[j],   // mine or my friend's
          username: chats[i].username // who I have a chat with
        }
        for(let k = 0; k < lastMessageInChats.length; k++ ) {
          if( lastMessageInChats[k].message.chatID == messageChatID ){
            lastMessageInChats[k] = lastMessageInChat;
          }
        }
        break;
      }
    }
  }

  //insertion sort in descending order
  for( let i = 0; i < lastMessageInChats.length; i++ ) {
    const curElement = lastMessageInChats[i];
    const curElementTime = lastMessageInChats[i].message.sendTime;
    let curIndex = i;
    while( curIndex > 0 && lastMessageInChats[curIndex-1].message.sendTime < curElementTime ) {
      lastMessageInChats[curIndex] = lastMessageInChats[curIndex-1];
      curIndex--;
    }
    lastMessageInChats[curIndex] = curElement;
  }

  return (
    <div className='chat-list' >
      
      {lastMessageInChats.map( (el) => {
        const active = window.location.pathname == `/home/${el.username}`; 
        return (
          <NavLink 
            key={el.message.messageID}
            to={`${el.username}`} 
          >
              <Chat 
                lastMessageInChat={el} 
                active={active} 
                key={el.message.messageID}
              />
          </NavLink>
        )
      } )}
    </div>
  )
}

export default ChatList
