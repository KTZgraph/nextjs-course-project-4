import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, //potem obiekt {title, message, status}
  showNotification: function () {}, //metoda domyslnie nic nie robi
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
//ma nie tylko opakowaywac komponenty dzieci, ale ma zarządzać allt he context related states 
// żeby zarządzać stanami, pokazywać i chować je wewntąrz tego komponentu 167 5:10


  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
