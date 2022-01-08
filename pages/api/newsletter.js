// ZAWSZE ustawiać res dla NIeudanych i Udanych akcji
import {connectDatabase, insertDocument} from '../../helpers/db-util'


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
    let client;

    try {
      client = await connectDatabase();
          console.log(userEmail)
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database failed!'})
      return; // żeby zapobiec dalszemu wykonywaniu kodu
    }

    try {
      await insertDocument(client, 'newsletters', { email: userEmail });
      client.close(); // żeby też próbował zamknąć połaczenie

      console.log(userEmail)


    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: 'Inserting data failed'})
      return; // żeby zapobiec dalszemu wykonywaniu kodu
    }

    console.log(userEmail);
    // HTTP 201 success resource was added
    res.status(201).json({ message: "Signed up" });
  } else {
    res.status(200).json({ message: "GET method" });
  }
}

export default handler;
