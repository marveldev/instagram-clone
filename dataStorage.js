const request = indexedDB.open('instagram', 3);

request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['bio'], 'readwrite')
  const store = transaction.objectStore('bio');
  store.add({name: 'Jane Doe', description: 'Hey, I am Jane!'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('bio', { autoIncrement: true});
  database.createObjectStore('gallery', { autoIncrement: true});
}

request.onerror = () => {
  console.log('request unsuccessful');
}

const addEntryToDb = (storeName, entry) => {
  const database = request.result
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName)
  store.add(entry);

  transaction.oncomplete = () => {
    alert (`entry added sucessfully to ${storeName}`)
  }

  transaction.onerror = () => {
    console.log(`error adding to ${storeName}`)
  }
}

const getEntryFromDb = (storeName, id) => {
  const database = request.result
  const transaction = database.transaction([storeName]);
  const store = transaction.objectStore(storeName)
  const getData = id ? store.get(id) : store.getAll();

  getData.onsuccess = () => {
    console.log(getData.result)
  }

  getData.onerror = () => {
    console.log(`error adding to ${storeName}`)
  }
}


export { request, addEntryToDb , getEntryFromDb};