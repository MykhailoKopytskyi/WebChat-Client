//hooks
import { useContext } from "react";
//styles
import "./style.css";
//context
import Context from "../../../../context/context";
//utils
import { displayLanguage } from "../../../../utils/displayLanguage";
//config
import configuration from "../../../../config/config";

const Search = (props) => {
  //props
  const contact = props.contact;
  const setContact = props.setContact;
  const setSettingsOpened = props.setSettingsOpened;
  const setFoundContacts = props.setFoundContacts;

  //context
  const context = useContext(Context);
  const language = context.languageHandler.language;
  const theme = context.themeHandler.theme;

  async function searchContacts(value) {
    if(!value.trim()) {
      return;
    }
    const response = await fetch(configuration.apiEndpoints.searchUser(value), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
      credentials: "include"
    })
    const parsedResponse = await response.json();
    setFoundContacts(parsedResponse);
  }

  return (
    <div className="search-wrapper" >
      <div onClick={ () => setSettingsOpened(true) } >
        <i className="fa-solid fa-2x fa-gear" style={ theme == "light" ? {"color" : "#fff"} : {"color" : "#BDBDBD"} } ></i>
      </div>
      <input type="text" 
        placeholder={
          displayLanguage(language, {
            english: "Search new users",
            ukrainian: "Пошук нових користувачів",
            russian: "Поиск новых пользователей"
          }) 
        }
        className="input-search" value={contact}  onChange={ (e) => {setContact(e.target.value); searchContacts(contact) }}  
        style={ theme == "light" ? {"backgroundColor" : "#fff", "color":"#4b6194"} : {"backgroundColor": "#1E1E1E"} }
      />
    </div>
  )
}

export default Search
