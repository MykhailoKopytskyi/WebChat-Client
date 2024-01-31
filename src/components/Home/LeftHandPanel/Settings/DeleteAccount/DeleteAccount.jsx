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
//components
import Loading from "../../../../shared/Loading";

const DeleteAccount = () => {
  //hooks
  const [isAccordion, setIsAccordion] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [loading,setLoading] = useState(false);

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  const deleteAccount = async () => {
    setLoading(true)
    const response = await fetch(configuration.apiEndpoints.deleteAccount, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        },
      credentials: "include"
    })
    const parsedResponse = await response.json();
    if( !parsedResponse.error ) {
      setLoading(false)
      setUserNote(
        displayLanguage(language, {
          english: "Click on the link we sent you via email",
          ukrainian: "Натисніть на посилання, яке ми надіслали вам електронною поштою",
          russian: "Нажмите на ссылку, которую мы отправили вам по электронной почте."
        }) 
      );
    }
  }

  if(loading) {
    return <Loading/>
  }

  return (
    <div className={`setting delete-account ${theme == "light" ? "setting-light" : "setting-dark"}`} >
      <div className={`setting-type ${theme == "light" ? "setting-type-light" : "setting-type-dark"}`} onClick={ () => setIsAccordion(!isAccordion) } >
        <h3>{
            displayLanguage(language, {
              english: "Delete account",
              ukrainian: "Видалити аккаунт",
              russian: "Удалить аккаунт"
            }) 
          }
          </h3>
        <i className={`fa-solid fa-arrow-${isAccordion ? "up" : "down" }`}></i>
      </div>


      {isAccordion &&   
      <div className="accordion" >
          {userNote ? userNote : 
          <> 
            <p>
              {
                displayLanguage(language, {
                  english: "Are you sure you want to permanently delete your account ?",
                  ukrainian: "Ви впевнені, що бажаєте остаточно видалити свій обліковий запис?",
                  russian: "Вы уверены, что хотите навсегда удалить свою учетную запись?"
                }) 
              }
            </p> 

            <p>
              {
                displayLanguage(language, {
                  english: "All your chats and messages will be permanently removed",
                  ukrainian: "Усі ваші чати та повідомлення буде видалено назавжди",
                  russian: "Все ваши чаты и сообщения будут удалены навсегда."
                }) 
              }
            </p>      
            <button onClick={deleteAccount} >{
              displayLanguage(language, {
                english: "Delete",
                ukrainian: "Видалити",
                russian: "Удалить"
              }) 
            }
            </button> 
          </> 
          }

      </div>}
  </div>
  )
}

export default DeleteAccount
