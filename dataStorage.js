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

const getEntryFromDb = async (storeName, id) => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction([storeName]);
    const store = transaction.objectStore(storeName)
    const getData = id ? store.get(id) : store.getAll();
  
    getData.onsuccess = () => {
      resolve(getData.result)
    }
  
    getData.onerror = () => {
      console.log(`error adding to ${storeName}`)
      reject(getData.error);
    }
  })

  return Promise.resolve(data);
}


const clearAllEntries = (storeName) => {
  const database = request.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.clear();
}


export { request, addEntryToDb , getEntryFromDb, clearAllEntries };
