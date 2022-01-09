import { useContext, useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false); //local state, domyslnie false bo komentarze schowane

  useEffect(() => {
    // można dodac obsługę błędów
    if (showComments) {
      setIsFetchingComments(true); //bo teraz ładuję dane
      fetch("/api/comments/" + eventId, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false); //już dane się pobrały
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    // pobieranie listy komentrzy
    setShowComments((prevStatus) => !prevStatus);

    // if(!showComments) { //showComments flaga true jeśli komentarze są akutalnie wyświetlane
    //   ale najlepiej to wzroibvć use effect
    // }
  }

  function addCommentHandler(commentData) {
    //tutaj mozna się zastanowaić na używaniem custum hooks/refaktorem
    // dodawanie nowego komentarza

    // ustwienie notyfikacji przed realnym dodawaniem do bazy przez API
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your coment is currently being stored into a database",
      status: "pendind",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }) /*********************** LOGIKA OBSLUGI BLEDU ******************************* */
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        //wiem że mam błąd wiec go rzucam, potrzebuję zagnieżdzonego promista bo fetch jest asynchroniczny- nie zwracam response.json()
        // zwracam cały nested Promise chain, to spowoduje ze główny promise chain z fetch zakończy się błędem
        return response.json().then((data) => {
          console.log("data");
          console.log(data);

          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        // tu wiem, że udało się dodac komentarz
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your coment was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        // łapanie blędu w łancuchu promisów
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      
      {/* CommentList items={comments} przekazanie listy komentarzy POBRANYCH TUTAJ do innego komponenru */}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {/* spinner gdy dane sie jeszcze pobierają */}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
