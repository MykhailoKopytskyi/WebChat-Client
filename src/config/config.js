const configuration = {
  apiEndpoints: {
    websocket: "ws://13.60.17.115:80/",
    login: "http://13.60.17.115:80/account/session",
    logout: "http://13.60.17.115:80/account/session",
    register: "http://13.60.17.115:80/account",
    deleteAccount: "http://13.60.17.115:80/account",
    createChat: "http://13.60.17.115:80/chats",
    removeChat: "http://13.60.17.115:80/chats",
    searchUser: (username) => {
      return `http://13.60.17.115:80/chats/search?username=${username}`
    } 
  },

  // apiEndpoints: {
  //   websocket: "ws://localhost:80/",
  //   login: "http://localhost:80/account/session",
  //   logout: "http://localhost:80/account/session",
  //   register: "http://localhost:80/account",
  //   deleteAccount: "http://localhost:80/account",
  //   createChat: "http://localhost:80/chats",
  //   removeChat: "http://localhost:80/chats",
  //   searchUser: (username) => {
  //     return `http://localhost:80/chats/search?username=${username}`
  //   } 
  // },

  // apiEndpoints: {
  //   websocket: "ws://192.168.1.46:80/",
  //   login: "http://192.168.1.46:80/account/session",
  //   logout: "http://192.168.1.46:80/account/session",
  //   register: "http://192.168.1.46:80/account",
  //   deleteAccount: "http://192.168.1.46:80/account",
  //   createChat: "http://192.168.1.46:80/chats",
  //   removeChat: "http://192.168.1.46:80/chats",
  //   searchUser: (username) => {
  //     return `http://192.168.1.46:80/chats/search?username=${username}`
  //   } 
  // },

  validation: {
    emailRegExp: new RegExp(/^(?=.{1,320}$)[A-Za-z0-9_.+-]{1,64}@[A-Za-z0-9-]{1,255}(?:\.[A-Za-z]{2,6}){0,2}.*$/),
    passwordRegExp: new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{8,40}$/),
    usernameRegExp:  new RegExp(/^[A-Za-z].{7,29}$/)
  },
}

export default configuration;