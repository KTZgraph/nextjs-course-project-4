export async function getAllDocuments(db, collection, sort, filter = {}) { // domyslnie pusty filtr i wzraca wszystko
    const documents = await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();

    return documents;
 }
