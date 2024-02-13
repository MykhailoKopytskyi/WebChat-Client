//context
import Context from "../../../../../context/context";
//hooks
import { useContext,useEffect,useState } from "react";
//utils
import { displayLanguage } from "../../../../../utils/displayLanguage";

const Language = () => {
  //hooks
  const [isAccordion, setIsAccordion] = useState(false);

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const setLanguage = context.languageHandler.setLanguage;
  const theme = context.themeHandler.theme;

  const setChosenLanguage = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  }

  return (
    <div className={`setting language ${theme == "light" ? "setting-light" : "setting-dark"}`}>
      <div className={`setting-type ${theme == "light" ? "setting-type-light" : "setting-type-dark"}`} onClick={ () => setIsAccordion(!isAccordion) } >
        <h3>  
          {
            displayLanguage(language, {
              english: "Language",
              ukrainian: "Мова",
              russian: "Язык"
            }) 
          } 
        </h3>
        <i className={`fa-solid fa-arrow-${isAccordion ? "up" : "down" }`}></i>
      </div>

      {isAccordion &&   
      <div className="accordion" >
        <div>
          <input type="radio" name="language" value="english" defaultChecked ={language === "english"} id="english" onChange={setChosenLanguage} />
          <label htmlFor="english"> {
              displayLanguage(language, {
                english: "English",
                ukrainian: "Англійська",
                russian: "Английский"
              }) 
            } 
          </label>
        </div>

        <div>
          <input type="radio" name="language" value="ukrainian" defaultChecked={language === "ukrainian"} id="ukrainian"  onChange={setChosenLanguage} />
          <label htmlFor="ukrainian">{
              displayLanguage(language, {
                english: "Ukrainian",
                ukrainian: "Українська",
                russian: "Украинский"
              }) 
            } </label>
        </div>

        <div>
          <input type="radio" name="language" value="russian" defaultChecked={language === "russian"} id="russian" onChange={setChosenLanguage} />
          <label htmlFor="russian">
            {
              displayLanguage(language, {
                english: "Russian",
                ukrainian: "Російська",
                russian: "Русский"
              }) 
            }
          </label>
        </div>

      </div>}
    
    </div>
  )
}

export default Language
