// react router dom
import { useNavigate } from "react-router-dom";
//context
import Context from "../../../../../context/context";
//hooks
import { useContext, useState } from "react";
//styles
import "./style.css"
// config
import configuration from "../../../../../config/config";
//components
import ErrorPopup from "../../../../shared/ErrorPopup";

const FoundContact = (props) => {
  //hooks
  const [error,setError] = useState(false);

  //context
  const context = useContext(Context);
  const chats = context.mainDataHandler.mainData.chats;
  const socket = context.socket;

  //navigate
  const navigate = useNavigate();

  //props
  const username = props.foundContact.username; // found contacts' username
  const userID = props.foundContact.userID; // the ID I want to create a new chat with
  const setContact = props.setContact;  // to clean up the input

  async function createChat(userID) {
    const response = await fetch(configuration.apiEndpoints.createChat, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      credentials: "include",
      body: JSON.stringify({userID})
    })
    const parsedResponse = await response.json();
    if(parsedResponse.error) {
      setError(true);
      setTimeout( () => {
        setError(false);
      },2000 );
    }
    socket.disconnect();
    socket.connect();
    setContact("");
    navigate(`/home/${username}`);
  }

  for( let i = 0; i < chats.length; i++ ) {
    if( username == chats[i].username) { //return nothing if the chat is mine
      return;
    }
  }

  return (
    <div className=" chat new-chat" >
      {error ? <ErrorPopup error={error} /> : ""}
      <p className="username" >{username}</p>
      <button onClick={ () => createChat(userID) } > Create a new chat </button>
    </div>
  )
}

export default FoundContact
