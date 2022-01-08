// /api/comments/some-event-id wiecej sensu w takiej ścieżce
import { MongoClient } from "mongodb";
import { getAllDocuments } from "../../../helpers/db-utils";
async function handler(req, res) {
  //trzeba wiedzieć dla którego eventu dodaję/pobieram komentarze

  const eventId = req.query.eventId; //eventId z nazwy pliku [eventId].js

  //połaczenie z bazą danych
  const client = await MongoClient.connect(
    "url do bazy events"
  );

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
      //mongodb sam generuje unique id
      email,
      name,
      text,
      eventId, //żeby mieć referencję do którego eventu ten komentarz należy
    };

    const db = client.db(); //nie trzeb apodawać nazwy bazy bo jest już ona w connecting string

    const result = await db.collection("comments").insertOne(newComment); //zwraca promisa gdzi ejest Id stworzonego obiektu [insertedId]
    console.log(result); //result zwraca

    //możemy dodać id do obiektu
    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    //   lista komentarzy
    const db = client.db();
    // const documents = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 }) // sortowanie po id czyli od najmłodszych
    //   .toArray(); //domyslnie wszystkie zwraca ale zwraca obiekt cusos gdzie manualnie trzeba szukac danych po dokumentach

    // metoda z pomocniczych TERAZ POBIERA KOMENTARZE TYLKO DLA TEGO wydarzenia
    const documents = await getAllDocuments(
      db,
      "comments",
      { _id: -1 },
      { eventId: eventId }
    );
    console.log("\n\n\n\n\n\n\n");
    console.log(documents);

    res.status(201).json({ comments: documents });
  }

  // pamietać o zamykaniu połaczenia z bazą
  client.close();

  //dla innych metod nie ma zwrotki, bo nie planuję obsługi innych metod
}

export default handler;
