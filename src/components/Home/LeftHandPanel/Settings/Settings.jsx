//styles
import "./style.css";
//hooks
import { useContext } from "react";
//context
import Context from "../../../../context/context";
//components
import Language from "./Language/Language";
import Theme from "./Theme/Theme";
import MessageTextSize from "./MessageTextSize/MessageTextSize";
import Logout from "./Logout/Logout";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
//utils
import { displayLanguage } from "../../../../utils/displayLanguage";


const Settings = (props) => {

  //props
  const setSettingsOpened = props.setSettingsOpened;

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  return (
    <div className="settings"  >
      <div className="go-back" onClick={ () => setSettingsOpened(false) } >
        <i className="fa-solid fa-arrow-left fa-2x" style={ theme == "light" ? {"color": "#fff"} :  {"color": "#afa5dd"} } ></i>
      </div>
      
      <h2 style={ theme == "light" ? {"color": "#715d74"} : {"color": "#fff"} } >
        {
          displayLanguage(language, {
            english: "Settings",
            ukrainian: "Налаштування",
            russian: "Настройки"
          }) 
        }
      </h2>

      <div className="settings-list">
        <Language/>
        <Theme/>
        <MessageTextSize/>
        <Logout/>
        <DeleteAccount/>
      </div>

    </div>
  )
}

export default Settings
