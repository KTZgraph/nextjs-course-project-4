import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, //potem obiekt {title, message, status}
  showNotification: function (notificationData) {}, //metoda domyslnie nic nie robi
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  //ma nie tylko opakowaywac komponenty dzieci, ale ma zarządzać allt he context related states
  // żeby zarządzać stanami, pokazywać i chować je wewntąrz tego komponentu 167 5:10
  const [activeNotification, setActiveNotification] = useState(); //undefined bo domyslnie nie mam żadnych notifikacji

  function showNotificationHandler(notificationData) {
      setActiveNotification(notificationData) //można na skróty bo obiekty są takie same - te same atrybuty
    // setActiveNotification({
    //     title: notificationData.title, 
    //     message: notificationData.message,
    //     status: notificationData.status
    // });
  }

  function hideNotificationHandler() {
      //żeby zresetować i get rid of it
      setActiveNotification(null);
  }

  //teraz sztuczka żebny dane z useState i powyższe funckje zrobić w obiekt który można redustrybuować w inne miejsca aplikacji
  const context = { //ma strukturę jak u góry NotificationContext
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }
  return (
    //   do wszystkich zainteresowanych komponentów redystrubuję contex przez props value
    // fajne jest to że jak sie coś zmieni, to NotificationContextProvider sie na nowo wyredneruje z zauktualizowanymi danymi
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
