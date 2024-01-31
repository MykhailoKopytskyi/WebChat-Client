// react router dom
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
//context
import Context from '../context/context';
import { useContext } from 'react';
//utils
import { displayLanguage } from '../utils/displayLanguage';

const ConfirmRemoval = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;


  const message = () => {
    if(success == "true") {
      return displayLanguage(language, {
        english: "Account has been removed successfully",
        ukrainian: "Обліковий запис успішно видалено",
        russian: "Аккаунт успешно удален"
      }) 
    }
    else {
      return displayLanguage(language, {
        english: "Account has not been removed",
        ukrainian: "Обліковий запис не видалено",
        russian: "Аккаунт не удален"
      }) 
    }
  }

  return (
    <div className={`action-confirmation ${theme == "light" ? "action-confirmation-light" : "action-confirmation-dark"}`} >
      <h2>
        {message()}
      </h2>
      <div>
        { success == "true" ?     
          <Link to="/registration" >
            <button className='btn' >  
              { 
                displayLanguage(language, {
                  english: "Back to a registration page",
                  ukrainian: "Повернутися до сторінки входу",
                  russian: "Вернуться на страницу регистрации"
                }) 
              }
            </button>
          </Link> : 

          <Link to="/home" >
            <button className='btn' >  
            { 
              displayLanguage(language, {
                english: "Back to a home page",
                ukrainian: "Повернутися на домашню сторінку",
                russian: "Вернуться на домашнюю страницу"
              }) 
            }
            </button>
          </Link>
          }
      </div>
    </div>
  )
}

export default ConfirmRemoval;
