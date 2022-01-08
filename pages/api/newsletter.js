// ZAWSZE ustawiać res dla NIeudanych i Udanych akcji

function handler(req, res) {
    if(req.method === 'POST'){
        // zapisywanie do newslettera, POST ma req.body a GET NIE
        const userEmail = req.body.email;

        // prosta walidacja adresu email
        if(!userEmail || !userEmail.includes('@')){
            // lpeiej zrobić walidację na backendzie niż na froncie, bo tam, też może user grzebac w kodzie klienta
            // HTTP status 442 - dane od usera są złe
            res.status(422).json({message: 'Invalid email address.'});
            return; //cancel function execution 
        }

        console.log(userEmail);
        // HTTP 201 success resource was added
        res.status(201).json({message: 'Signed up'});

    }else{
        res.status(200).json({message: 'GET method'});

    }

}

export default handler;