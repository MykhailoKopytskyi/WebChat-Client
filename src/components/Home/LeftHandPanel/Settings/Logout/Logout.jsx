//context
import Context from "../../../../../context/context";
//hooks
import { useContext,useState } from "react";
// react router dom
import { useNavigate } from "react-router-dom";
//config
import configuration from "../../../../../config/config";
//utils
import { displayLanguage } from "../../../../../utils/displayLanguage";

const Logout = () => {
  //hooks
  const [isAccordion, setIsAccordion] = useState(false);

  //context
  const context = useContext(Context);
  const socket = context.socket;
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;
  const setMainData = context.mainDataHandler.setMainData;

  //navigation
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch(configuration.apiEndpoints.logout, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        },
      credentials: "include"
    })
    await response.json();
    setMainData("");
    socket.disconnect();
    navigate("/");
  }

  return (
    <div className={`setting logout ${theme == "light" ? "setting-light" : "setting-dark"}`} >
      <div className={`setting-type ${theme == "light" ? "setting-type-light" : "setting-type-dark"}`} onClick={ () => setIsAccordion(!isAccordion) } >
        <h3>{
          displayLanguage(language, {
            english: "Log out",
            ukrainian: "Вийти з облікового запису",
            russian: "Выйти из аккаунта"
          }) 
        }</h3>
        <i className={`fa-solid fa-arrow-${isAccordion ? "up" : "down" }`}></i>
      </div>


      {isAccordion &&   
      <div className="accordion" >
        <div>
          <button onClick={logout} >{
            displayLanguage(language, {
              english: "Log out",
              ukrainian: "Вийти",
              russian: "Выйти"
            }) 
          }
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Logout
