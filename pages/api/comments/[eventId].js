// /api/comments/some-event-id wiecej sensu w takiej ścieżce
import {MongoClient } from 'mongodb';

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

    const result = await db.collection("comments").insertOne(newComment); //zwraca promisa gdzi ejest Id stworzonego obiektu
    console.log(result) //result zw

    //możemy dodać id do obiektu
    newComment.id = result.insertedId;
  
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    //   lista komentarzy
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment" },
      { id: "c2", name: "Manuel", text: "A second comment" },
    ];
    res.status(201).json({comments: dummyList});
  }

  // pamietać o zamykaniu połaczenia z bazą
  client.close();

  //dla innych metod nie ma zwrotki, bo nie planuję obsługi innych metod
}

export default handler;
