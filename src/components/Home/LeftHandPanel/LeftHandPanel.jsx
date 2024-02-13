//components
import Search from "./Search/Search";
import ChatList from "./ChatList/ChatList";
import Settings from "./Settings/Settings";
//hooks
import { useState } from "react";
//styles
import "./style.css";
//context
import Context from "../../../context/context";
//hooks
import { useContext } from "react";

const LeftHandPanel = () => {
  //hooks
  const [contact, setContact] = useState("");
  const [foundContacts, setFoundContacts] = useState([]);
  const [settingsOpened, setSettingsOpened] = useState(false);

  //context
  const context = useContext(Context);
  const theme = context.themeHandler.theme;

  if(settingsOpened) {
    return (
    <div className="left-hand-panel" style={ theme == "light" ? {"background": "#bfaed4"} : {"background": "#313131"} } >
      <Settings settingsOpened={settingsOpened} setSettingsOpened={setSettingsOpened} />
    </div>
    )
  }

  return (
    <div className="left-hand-panel" style={ theme == "light" ? {"background": "#bfaed4"} : {"background": "#313131"} } >
      <Search contact={contact} setContact={setContact} setFoundContacts={setFoundContacts} setSettingsOpened={setSettingsOpened} />
      <ChatList foundContacts={foundContacts} contact={contact} setContact={setContact} />
    </div>
  )
}

export default LeftHandPanel;
