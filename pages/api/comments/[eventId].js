// /api/comments/some-event-id wiecej sensu w takiej ścieżce
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  //trzeba wiedzieć dla którego eventu dodaję/pobieram komentarze

  const eventId = req.query.eventId; //eventId z nazwy pliku [eventId].js

  //połaczenie z bazą danych
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

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
      client.close(); // zamknąc bazę gdy nieprawidłowy input
      return;
    }
    const newComment = {
      //mongodb sam generuje unique id
      email,
      name,
      text,
      eventId, //żeby mieć referencję do którego eventu ten komentarz należy
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId; //możemy dodać id do obiektu, można dac _id żeby być jak mongoDB
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
      //pewnosć że na dole będzie client.close()
    }
  }

  if (req.method === "GET") {
    //   lista komentarzy
    try {
      const documents = await getAllDocuments(
        // metoda z pomocniczych TERAZ POBIERA KOMENTARZE TYLKO DLA TEGO wydarzenia
        client,
        "comments",
        { _id: -1 }, //od najnowyszch komentarzy
        { eventId: eventId }
      );

      res.status(201).json({ comments: documents });
    } catch (error) {
      // ta zwrotka ciągle się powtarza wiec można zrobić soobną funckję która takie rzeczy ma
      res.status(500).json("Getting comments failed.");
      //bex return żeby na pewno się zamknięło połaczenie
    }
  }

  // pamietać o zamykaniu połaczenia z bazą
  client.close();

  //dla innych metod nie ma zwrotki, bo nie planuję obsługi innych metod
}

export default handler;
