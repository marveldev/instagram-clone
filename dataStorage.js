const request = indexedDB.open('instagram', 2);


request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['bio'], 'readwrite')
  const store = transaction.objectStore('bio');
  store.add({name: 'Jane Doe', description: 'Hey, I am Jane!'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('bio', { autoIncrement: true});
  database.createObjectStore('bioPhoto', { autoIncrement: true })
  database.createObjectStore('gallery', { keyPath: 'galleryId' });
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
    const message = document.querySelector('#message');
    message.style.display = 'block';
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

const updateEntry = (storeName, itemId, newPhotoText) => {
  const database = request.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  const getData = store.get(itemId);
  
  getData.onsuccess = () => {
    const data = getData.result;
    data.photoText = newPhotoText;
    store.put(data);
    const message = document.querySelector('#message');
    message.style.display = 'block';
  }

  getData.onerror = () => {
    console.log('error accessing getdata');
  }
}

const clearAllEntries = (storeName) => {
  const database = request.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.clear();
}

const deleteEntry = (storeName, entryId) => {
  const database = request.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.delete(entryId)
}

export { request, addEntryToDb , getEntryFromDb, clearAllEntries, deleteEntry, updateEntry };
