// ZAWSZE ustawiać res dla NIeudanych i Udanych akcji
import { MongoClient } from "mongodb";

async function handler(req, res) {
  //handlery mogą być asynchroniczne a troche latwiej potem z mongodb pracowac
  if (req.method === "POST") {
    // zapisywanie do newslettera, POST ma req.body a GET NIE
    const userEmail = req.body.email;

    // prosta walidacja adresu email
    if (!userEmail || !userEmail.includes("@")) {
      // lpeiej zrobić walidację na backendzie niż na froncie, bo tam, też może user grzebac w kodzie klienta
      // HTTP status 442 - dane od usera są złe
      res.status(422).json({ message: "Invalid email address." });
      return; //cancel function execution
    }

    const client = await MongoClient.connect(
      "url do mobngodb"
    );
    const db = client.db(); //nie trzeb apodawać nazwy bazy bo jest już ona w connecting string

    await db.collection("emails").insertOne({ email: userEmail }); //zwraca promisa
    client.close();

    console.log(userEmail);
    // HTTP 201 success resource was added
    res.status(201).json({ message: "Signed up" });
  } else {
    res.status(200).json({ message: "GET method" });
  }
}

export default handler;
