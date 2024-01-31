//context
import Context from "../../../../../context/context";
//hooks
import { useContext,useState } from "react";
//utils
import { displayLanguage } from "../../../../../utils/displayLanguage";


const Theme = () => {
 //hooks
 const [isAccordion, setIsAccordion] = useState(false);

 //context
 const context = useContext(Context);
 const theme = context.themeHandler.theme;
 const setTheme = context.themeHandler.setTheme;
 const language = context.languageHandler.language;

 const setChosenTheme = (e) => {
   setTheme(e.target.value);
   localStorage.setItem("theme", e.target.value);
 }


  return (
    <div className={`setting theme ${theme == "light" ? "setting-light" : "setting-dark"}`} >
      <div className={`setting-type ${theme == "light" ? "setting-type-light" : "setting-type-dark"}`} onClick={ () => setIsAccordion(!isAccordion) } >
        <h3>{
              displayLanguage(language, {
                english: "Theme",
                ukrainian: "Тема",
                russian: "Тема"
              }) 
            }
        </h3>
        <i className={`fa-solid fa-arrow-${isAccordion ? "up" : "down" }`}></i>
      </div>

      {isAccordion &&   
      <div className="accordion" >
        <div>
          <input type="radio" name="theme" value="light" defaultChecked ={theme === "light"} id="light" onChange={setChosenTheme} />
          <label htmlFor="light">
            {
                displayLanguage(language, {
                english: "Light",
                ukrainian: "Світла",
                russian: "Светлая"
              }) 
            }
          </label>
        </div>

        <div>
          <input type="radio" name="theme" value="dark" defaultChecked={theme === "dark"} id="dark"  onChange={setChosenTheme} />
          <label htmlFor="dark">
            {
                displayLanguage(language, {
                english: "Dark",
                ukrainian: "Темна",
                russian: "Темная"
              }) 
            }
          </label>
        </div>

      </div>}
    
    </div>
  )
}

export default Theme
