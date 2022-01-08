/*If you build an application where your MongoDB-related code will execute frequently (e.g. the API route will be hit frequently), you might want to take advantage of MongoDB's "connection pooling" though.

For this, simply remove all client.close() calls from your code. The connection will then NOT be closed and will be re-used across requests. */
import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // popmocnicza
  const client = await MongoClient.connect(
    "credential-string do bazy"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  //pomocnicza
  const db = client.db(); //nie trzeb apodawać nazwy bazy bo jest już ona w connecting string

  const result = await db.collection(collection).insertOne(document); //zwraca promisa
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  // domyslnie pusty filtr i wzraca wszystko
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();

  return documents;
}
