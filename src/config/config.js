const configuration = {
 
  apiEndpoints: {
    login: "http://localhost:5000/account/session",
    logout: "http://localhost:5000/account/session",
    register: "http://localhost:5000/account",
    deleteAccount: "http://localhost:5000/account",
    createChat: "http://localhost:5000/chats",
    removeChat: "http://localhost:5000/chats"
  },
  validation: {
    emailRegExp: new RegExp(/^(?=.{1,320}$)[A-Za-z0-9_.+-]{1,64}@[A-Za-z0-9-]{1,255}(?:\.[A-Za-z]{2,6}){0,2}.*$/),
    passwordRegExp: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,40}$/),
    usernameRegExp:  new RegExp(/^[A-Za-z][A-Za-z\d]{7,29}$/)
  },
 
}


export default configuration;