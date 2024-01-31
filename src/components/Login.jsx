//hooks
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Loading from './shared/Loading';
import ErrorPopup from './shared/ErrorPopup';
//config
import configuration from '../config/config';
//utils
import { emailValidation, passwordValidation } from '../utils/validationManager';
//context
import Context from '../context/context';
//utils
import { displayLanguage } from '../utils/displayLanguage';

const Login = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  // navigate
  const navigate = useNavigate();

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  async function signIn(email, password) {
    const passwordIsValid = passwordValidation(password);
    const emailIsValid = emailValidation(email);

    if( !emailIsValid || !passwordIsValid ) {
      setError({error: "Bad request", message: "Credentials do not meet the format or empty"});
      setTimeout( () => {
        setError(false);
      },2000 );
      return;
    }

    setLoading(true);
    const res = await fetch(configuration.apiEndpoints.login, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData)
      setTimeout(()=> {
        setError("");
      },2000);
    }
    else {
      navigate("/home");
    }
    setLoading(false);
  }


  if(loading) {
    return <Loading/>
  }
  return (
  <>
    { error ? <ErrorPopup error={error} /> : null}
    <div className='page login' >
      <div className="center-block">
        <div className={`title ${ theme == "light" ? "title-subtitle-light" : "title-subtitle-dark" }`}>
          { 
              displayLanguage(language, {
              english: "Log in to your account",
              ukrainian: "Увійдіть до свого облікового запису",
              russian: "Войдите в свой аккаунт"
            }) 
          }
        </div>
        <form className='form' onSubmit={ (e) => { e.preventDefault(); signIn(email,password) } } >
          <input type="text" placeholder={ 
              displayLanguage(language, {
              english: "Email",
              ukrainian: "Email адреса",
              russian: "Email адрес"
            }) 
          }
          
          className={`input ${theme == "light" ? "input-light": "input-dark"}`} onChange={(e)=>setEmail(e.target.value)} />
          <input type="text" placeholder={ 
              displayLanguage(language, {
              english: "Password",
              ukrainian: "Пароль",
              russian: "Пароль"
              }) 
            }
          className={`input ${theme == "light" ? "input-light": "input-dark"}`} onChange={(e)=>setPassword(e.target.value)} />
          <input type="submit" value={ 
              displayLanguage(language, {
              english: "Log in",
              ukrainian: "Авторизуватися",
              russian: "Авторизоваться"
              }) 
            }
          className='btn' />
        </form>
      </div>
    </div>
  </>
)
}

export default Login
