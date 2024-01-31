export const displayLanguage = (chosenLanguage, translation) => {
  switch(chosenLanguage) {
    case "english" : 
      return translation.english;
    case "ukrainian": 
      return translation.ukrainian;
    case "russian": 
      return translation.russian;
    default: 
      return translation.english
  }
}
