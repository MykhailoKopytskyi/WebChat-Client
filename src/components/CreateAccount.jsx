import React from 'react';
//hooks
import { useState, useContext} from 'react';
//components
import ErrorPopup from './shared/ErrorPopup';
import Loading from './shared/Loading';
// utils
import {usernameValidation, emailValidation, passwordValidation } from '../utils/validationManager';
import { displayLanguage } from '../utils/displayLanguage';
// config
import configuration from '../config/config';
// context
import Context from '../context/context';

const CreateAccount = () => {
  // hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [userAlert, setUserAlert] = useState("");

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  async function register(username, email, password) {
    const usernameIsValid = usernameValidation(username);
    const emailIsValid = emailValidation(email);
    const passwordIsValid = passwordValidation(password);

    if( !usernameIsValid  || !emailIsValid || !passwordIsValid) {
      setError({error: "Bad request", message: "Credentials do not meet the format or empty"});
      setTimeout( () => {
        setError(false);
      },2000 );
      return;
    }

    setLoading(true);
    const res = await fetch(configuration.apiEndpoints.register, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
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
      setUserAlert( () =>  
        displayLanguage(language, {
          english: "Click on the link we sent you via email",
          ukrainian: "Натисніть на посилання яке ми надіслали вам електронною поштою",
          russian: "Нажмите на ссылку, которую мы отправили вам по электронной почте"
      }) 
    )
    }
    setLoading(false);
    setEmail("");
    setPassword("");
    setUsername("");
  }

  if(loading) {
    return <Loading/>
  }
  
  return (
    <>
    { error ? <ErrorPopup error={error} /> : null}

    <div className='page register' >
      <div className="center-block">
      <div className={`title ${ theme == "light" ? "title-subtitle-light" : "title-subtitle-dark" }`}> 
        { displayLanguage(language, {
          english: "Register a new account",
          ukrainian: "Зареєструйте новий обліковий запис",
          russian: "Создайте новый аккаунт"
        }) }
      </div>
      <p className='user-alert' > {userAlert} </p>
      <div className="credentials-rules" >
        <h3>
        { displayLanguage(language, {
          english: "Credentials must meet the following criteria:",
          ukrainian: "Облікові дані мають відповідати таким критеріям:",
          russian: "Учетные данные должны соответствовать следующим критериям:"
        }) }
        </h3>
        <ul className='credentials-list' >
          <li>
              { displayLanguage(language, {
                english: "Username",
                ukrainian: "Ім'я користувача",
                russian: "Имя пользователя"
              }) }
            <ul className='rules-list' >
              <li>

              { displayLanguage(language, {
                english: "Length must be between 8 and 30 characters inclusive",
                ukrainian: "Длина повинна бути від 8 до 30 символів включно.",
                russian: "Длина должна быть от 8 до 30 символов включительно."
              }) }

              </li>
              <li>

              { displayLanguage(language, {
                english: "First character must be a letter and not a number",
                ukrainian: "Перший символ має бути буквою, а не цифрою",
                russian: "Первый символ должен быть буквой, а не цифрой"
              }) }

              </li>
            </ul>
          </li>

          <li>
            { displayLanguage(language, {
                english: "Email",
                ukrainian: "Електронна пошта",
                russian: "Электронная почта"
              }) }
            <ul className='rules-list' >
              <li>

              { displayLanguage(language, {
                english: "Length must be between 3 and 320 characters inclusive",
                ukrainian: "Довжина має бути від 3 до 320 символів включно",
                russian: "Длина должна быть от 3 до 320 символов включительно."
              }) }

              </li>
              <li>

              { displayLanguage(language, {
                english: "Must include @ symbol",
                ukrainian: "Має містити символ @",
                russian: "Должен включать символ @"
              }) }
              </li>
            </ul>
          </li>

            <li>
              { displayLanguage(language, {
                english: "Password",
                ukrainian: "Пароль",
                russian: "Пароль"
              }) }
            <ul className='rules-list' >
              <li>
                { displayLanguage(language, {
                  english: "Length must be between 8 and 40 characters inclusive",
                  ukrainian: "Довжина має бути від 8 до 40 символів включно",
                  russian: "Длина должна быть от 8 до 40 символов включительно."
                }) }
              </li>
              <li>
                { displayLanguage(language, {
                  english: "Must include at least 1 letter, 1 number and 1 symbol",
                  ukrainian: "Має містити принаймні 1 букву, 1 цифру та 1 символ",
                  russian: "Должно содержать как минимум 1 букву, 1 цифру и 1 символ."
                }) }
              </li>
            </ul>
          </li>

        </ul>
      </div>
        <form className='form' onSubmit={ (e) => { e.preventDefault(); register(username, email, password)} } >
          <input type="text" placeholder={ 
              displayLanguage(language, {
                english: "Username",
                ukrainian: "Ім'я користувача",
                russian: "Имя пользователя"
              })
            }
            className={`input ${theme == "light" ? "input-light": "input-dark"}`} onChange={(e)=>setUsername(e.target.value)} 
          />

          <input type="text" placeholder={ 
              displayLanguage(language, {
              english: "Email",
              ukrainian: "Email адреса",
              russian: "Email адрес"
            }) 
          }
            className={`input ${theme == "light" ? "input-light": "input-dark"}`} onChange={(e)=>setEmail(e.target.value)} 
         />

          <input type="text" placeholder={ 
              displayLanguage(language, {
              english: "Password",
              ukrainian: "Пароль",
              russian: "Пароль"
            }) 
          }
          className={`input ${theme == "light" ? "input-light": "input-dark"}`} onChange={(e)=>setPassword(e.target.value)}
         />
          
          <input type="submit" value={ 
              displayLanguage(language, {
              english: "Create account",
              ukrainian: "Створити акаунт",
              russian: "Зарегистрироваться"
            }) 
          }
          className='btn' />
        </form>
      </div>
    </div>
  </>
  )
}

export default CreateAccount;