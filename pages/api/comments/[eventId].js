// /api/comments/some-event-id wiecej sensu w takiej ścieżce
function handler(req, res) {
  //trzeba wiedzieć dla którego eventu dodaję/pobieram komentarze

  const eventId = req.query.eventId; //eventId z nazwy pliku [eventId].js
  if (req.method === "POST") {
    //add serwer-side validation, NIE można UFAĆ walidacji po stronie klienta!
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = {
      id: new Date().toISOString(), //losowe id na potrzeby develompemntu
      email,
      name,
      text,
    };

    console.log(newComment);
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    console.log("TUUUUUUUUU")
    //   lista komentarzy
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment" },
      { id: "c2", name: "Manuel", text: "A second comment" },
    ];
    console.log( dummyList)
    res.status(201).json({comments: dummyList});
  }

  //dla innych metod nie ma zwrotki, bo nie planuję obsługi innych metod
}

export default handler;
