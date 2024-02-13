//context
import Context from "../../../../../context/context";
//hooks
import { useContext,useState } from "react";
//utils
import { displayLanguage } from "../../../../../utils/displayLanguage";

const MessageTextSize = () => {
   //hooks
    const [isAccordion, setIsAccordion] = useState(false);

    //context
    const context = useContext(Context);
    const messageTextSize = context.messageTextSizeHandler.messageTextSize;
    const setMessageTextSize = context.messageTextSizeHandler.setMessageTextSize;
    const language = context.languageHandler.language;
    const theme = context.themeHandler.theme;
    
    const setChosenMessageTextSize = (e) => {
      setMessageTextSize(e.target.value);
      localStorage.setItem("messageTextSize", e.target.value);
    }

  return (
    <div className={`setting message-text-size ${theme == "light" ? "setting-light" : "setting-dark"}`} >
      <div className={`setting-type ${theme == "light" ? "setting-type-light" : "setting-type-dark"}`} onClick={ () => setIsAccordion(!isAccordion) } >
        <h3>{
          displayLanguage(language, {
            english: "Message Text Size",
            ukrainian: "Розмір тексту повідомлення",
            russian: "Размер текста сообщения"
          }) 
        }
        </h3>
        <i className={`fa-solid fa-arrow-${isAccordion ? "up" : "down" }`}></i>
      </div>

      {isAccordion &&   
      <div className="accordion" >
        
        <div>
          <input type="range" id="messageTextSize" min={10} max={30} step={1} value={messageTextSize} onChange={ (e) => setChosenMessageTextSize(e) } />
          <label htmlFor="messageTextSize">{messageTextSize}</label>
        </div>
      </div>}
    </div>
  )
}

export default MessageTextSize
