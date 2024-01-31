// hooks
import { useContext, useState, useEffect } from 'react';
//react router dom hooks
import { useNavigate } from 'react-router-dom';
// react router dom component
import { Link } from 'react-router-dom';
//context
import Context from '../context/context';
//config
import configuration from '../config/config';
//components
import Loading from './shared/Loading';
//utils
import { displayLanguage } from '../utils/displayLanguage';


const Landing = () => {
  // Local hook
  const [loading, setLoading] = useState(false);
  // navigation
  const navigate = useNavigate();
  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  useEffect(() => {
    setLoading(true);
    fetch(configuration.apiEndpoints.login, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      credentials: "include",
      body: ""
    })
    .then( async (res) => {
      const parsedData = await res.json();
      if( !res.ok ) {
        throw new Error(JSON.stringify(parsedData));
      }
      return parsedData;
    } )
    .then( (parsedData) => { 
      navigate("/home"); 
      console.log(parsedData) 
    })
    .catch( (e) => {
      console.log(JSON.parse(e.message)); 
    })
    .finally( () => setLoading(false));
  }, []);

  if( loading ) {
    return <Loading/>
  }

  return (
    <div className='page landing' >
        <div className="center-block">
        <h2 className={`title ${ theme == "light" ? "title-subtitle-light" : "title-subtitle-dark" }`} >
          { displayLanguage(language, {
            english: "Welcome to a Web chat",
            ukrainian: "Ласкаво просимо до веб-чату",
            russian: "Добро пожаловать в веб-чат"
          }) }
        </h2>

          <div className="element">
            <p  className={`subtitle ${ theme == "light" ? "title-subtitle-light" : "title-subtitle-dark" }`} >
              { displayLanguage(language, {
                english: "Have you already got an account?",
                ukrainian: "У вас вже є обліковий запис?",
                russian: "Уже есть аккаунт?"
              }) }
            </p>
            <Link to="/login" >
              <button className='btn' >
                { displayLanguage(language, {
                  english: "Log in",
                  ukrainian: "Увійти в обліковий запис",
                  russian: "Авторизоваться"
                }) }
              </button>
            </Link>
          </div>

          <div className="element">
            <p  className={`subtitle ${ theme == "light" ? "title-subtitle-light" : "title-subtitle-dark" }`} >
              { displayLanguage(language, {
                  english: "New to us?",
                  ukrainian: "Новий для нас?",
                  russian: "Впервые у нас?"
              }) }
            </p>
            <Link to="/registration" >
              <button className='btn' >  
                { displayLanguage(language, {
                    english: "Register a new account",
                    ukrainian: "Зареєструвати новий обліковий запис",
                    russian: "Создать новый аккаунт"
                }) }
            </button>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Landing
