//hooks
import { useState } from "react";
//socket io client
import {io} from "socket.io-client";
//react router dom hooks and components
import {Routes, Route} from "react-router-dom";
// CSS
import "./App.css";
//components
import Landing from "./components/Landing";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home/Home";
import ConfirmCreation from "./components/ConfirmCreation";
import ConfirmRemoval from "./components/ConfirmRemoval";
//context
import Context from "./context/context";
import RightHandPanel from "./components/Home/RightHandPanel/RightHandPanel";
//config
import configuration from "./config/config";

const socket = io(configuration.apiEndpoints.websocket , {
  withCredentials: true,
  autoConnect: false,
})

function App() {

  if(!localStorage.getItem("language")) {
    localStorage.setItem("language", "english");
  }

  if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }

  if(!localStorage.getItem("messageTextSize")) {
    localStorage.setItem("messageTextSize", 16)
  }

  // Global hooks
  const [mainData, setMainData] = useState({ username:null,chats:null,messages:null,userID:null });
  const [language,setLanguage] = useState(localStorage.getItem("language"));
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [messageTextSize, setMessageTextSize] = useState(localStorage.getItem("messageTextSize"));

  const contextObject = {
    mainDataHandler: {
      mainData,
      setMainData
    },
    socket,
    languageHandler:{
      language,
      setLanguage
    },
    themeHandler: {
      theme,
      setTheme
    },
    messageTextSizeHandler: {
      messageTextSize,
      setMessageTextSize
    }
  }

  return (
    <Context.Provider value={contextObject} >
      <div className="App" style={ theme == "light" ? {"backgroundColor": "rgb(239 230 230)"} : {"backgroundColor": "#212121"} } >
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="login" element={<Login/>} />
          <Route path="registration" element={<CreateAccount/>} />
          <Route path="registration-confirmation" element={<ConfirmCreation/>}/>
          <Route path="removal-confirmation" element={<ConfirmRemoval/>}/>
          <Route path="home" element={<Home />}>
            <Route path=":username" element={<RightHandPanel/>} ></Route>
          </Route>
          <Route path="*" element={<Landing/>}/>
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App;