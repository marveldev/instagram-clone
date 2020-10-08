import { addEntryToDb  } from '../../dataStorage.js';

const addGalleryEventListeners = () => {
  const photoInput = document.querySelector('#addPhoto');
  photoInput.addEventListener('change', () => {
    const reader = new FileReader();
    reader.readAsDataURL(photoInput.files[0])

    reader.addEventListener('load', () => {
      addEntryToDb('gallery', reader.result);
    })
  })
}

export default addGalleryEventListeners;