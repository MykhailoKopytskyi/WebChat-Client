// react router dom
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
//context
import Context from '../context/context';
import { useContext } from 'react';
//utils
import { displayLanguage } from '../utils/displayLanguage';

const ConfirmCreation = () => {
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
        english: "Account has been created successfully",
        ukrainian: "Обліковий запис успішно створено",
        russian: "Аккаунт успешно создан"
      }) 
    }
    else {
      return displayLanguage(language, {
        english: "Account has not been created",
        ukrainian: "Обліковий запис не створено",
        russian: "Аккаунт не создан"
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
          <Link to="/login" >
            <button className='btn' >  
            { 
              displayLanguage(language, {
                english: "Back to a login page",
                ukrainian: "Повернутися до сторінки входу",
                russian: "Вернуться на страницу входа"
              }) 
            }
            </button>
          </Link> :

          <Link to="/registration" >
            <button className='btn' >  
            { 
              displayLanguage(language, {
                english: "Back to a register page",
                ukrainian: "Повернутися до сторінки реєстрації",
                russian: "Вернуться на страницу регистрации"
              }) 
            }
            </button>
          </Link>
          }
      </div>
    </div>
  )
}

export default ConfirmCreation
