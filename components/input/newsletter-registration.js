import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();


  function registrationHandler(event) {
    event.preventDefault();
    // optional: validate input, tutaj walidacja jest po to żeby użytkownikowi szybko pokazać output że ma złe dane

    // POBIERANIE INPUTU DOPIERO W METODZIE
    const enteredEmail = emailInputRef.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }), // req.body.email spodziewa się API endpoit
      headers: {
        "Content-Type": "application/json",

      },
    })
      .then((response) => response.text())
      .then((data) => console.log(data));
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
