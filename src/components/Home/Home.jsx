//hooks
import { useEffect, useContext, useState } from 'react';
//react router dom 
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
//context
import Context from '../../context/context';
//components
import LeftHandPanel from './LeftHandPanel/LeftHandPanel';
import Loading from '../shared/Loading';
//styles
import "./style.css";

const Home = () => {
  // Context
  const context = useContext(Context);
  const setMainData = context.mainDataHandler.setMainData;
  const mainData = context.mainDataHandler.mainData;
  const socket = context.socket;
  const messages = mainData.messages;

  // Hooks
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isLeftOpened, setIsLeftOpened ] = useState(true);
  const [isRightOpened, setIsRightOpened] = useState(true);

  //navigation
  const navigate = useNavigate();

  useEffect( () => {
    //window event
    const setLayout = () => {
      setWindowWidth(window.innerWidth);
    }

    //socket events
    const catchInitialSetup = (data) => {
      const parsedData = JSON.parse(data);
      setMainData(parsedData);
      console.log(parsedData);
      setLoading(false);
    }

    const catchError = (err) => {
      console.log(err);
      setLoading(false);
      navigate("/");
    }

    const receiveMessage = (message) => {
      const parsedMessage = JSON.parse(message);
      setMainData( (prevMainData) => { return {
        ...prevMainData,
        messages: [...prevMainData.messages, parsedMessage]
     } } );
    }

    const updateMessage = (message) => {
      const parsedMessage = JSON.parse(message);
      const messageID = parsedMessage.messageID;
    
      setMainData((prevMainData) => {
        const updatedMessages = prevMainData.messages.map((mes) => {
          if (mes.messageID === messageID) {
            return parsedMessage;
          }
          return mes;
        });
        return { ...prevMainData, messages: updatedMessages };
      });
    };

    window.addEventListener("resize", setLayout )
    socket.on("initial-setup", catchInitialSetup);
    socket.on("error", catchError);
    socket.on("create-message", receiveMessage);
    socket.on("update-message", updateMessage);

    if(!socket.connected) {
      socket.connect();
    }
    else {
      setLoading(false);
    }

    return () => {
      window.removeEventListener("resize", setLayout)
      socket.off("initial-setup", catchInitialSetup);
      socket.off("error", catchError);
      socket.off("create-message", receiveMessage);
      socket.off("update-message", updateMessage);
    };
  }, [messages] )

  if(loading) {
    return <Loading/>
  }

  return (
    <div className='home' style={ windowWidth <=800 ? {"gridTemplateColumns": "1fr"} : {"gridTemplateColumns": "4fr 12fr"} }  >
      {isLeftOpened && <LeftHandPanel/> }

      {isRightOpened &&
      <Outlet context={ [ {
        windowWidth:windowWidth ,
        setIsRightOpened:setIsRightOpened,
        isLeftOpened:isLeftOpened,
        setIsLeftOpened:setIsLeftOpened
      } ] }
      /> }   {/* Right Hand Panel */}
    </div>
  )
}

export default Home;
  