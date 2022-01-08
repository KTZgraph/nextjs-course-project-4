import { useRef, useContext } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  //establish connection
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    // optional: validate input, tutaj walidacja jest po to żeby użytkownikowi szybko pokazać output że ma złe dane

    // POBIERANIE INPUTU DOPIERO W METODZIE
    const enteredEmail = emailInputRef.current.value;

    //pokazanie notyfikacji przed pobraniem danych, ze jest 'pening'
    notificationCtx.showNotification({
      title: "Signin up",
      message: "Registering for newsletter",
      status: "pendind",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }), // req.body.email spodziewa się API endpoit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // trzeba rozbudować, bo kod 500 albo 422 nie spowoduję wywołania błedu obłsuigawanego przeze mnie w catch
        if (response.ok) {
          return response.json();
        }
        //wiem że mam błąd wiec go rzucam, potrzebuję zagnieżdzonego promista bo fetch jest asynchroniczny- nie zwracam response.json()
        // zwracam cały nested Promise chain, to spowoduje ze główny promise chain z fetch zakończy się błędem
        return response.json().then((data) => {
          console.log("data")
          console.log(data)

          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        //pokazanie notyfikacji że udało się pobrać dane
        notificationCtx.showNotification({
          title: "Success!",
          message: "Succesfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something wen wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
