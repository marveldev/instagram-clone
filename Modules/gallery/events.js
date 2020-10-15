import { addEntryToDb, getEntryFromDb  } from '../../dataStorage.js';

const addGalleryEventListeners = () => {
  const photoInput = document.querySelector('#addPhoto');
  photoInput.addEventListener('change', () => {
    const reader = new FileReader();
    reader.readAsDataURL(photoInput.files[0])

    reader.addEventListener('load', () => {
      const gallerySection = document.querySelector('.gallery');
      const galleryItems = `
        <a href="#" class="item">
          <img src="${reader.result}" alt="image">
        </a>
      `
      gallerySection.innerHTML += galleryItems;
      addEntryToDb('gallery', reader.result);
    })
  })
}

const addImagesToGallery = async () => {
  const gallerySection = document.querySelector('.gallery');
  const galleryData = await getEntryFromDb('gallery');
  const galleryItems = galleryData.map((singlePhoto) => {
    return `
      <a href="#" class="item">
        <img src="${singlePhoto}" alt="image">
      </a>
    `
  })

  gallerySection.style.display = 'grid';
  gallerySection.innerHTML = galleryItems.join('');
}

export { addGalleryEventListeners, addImagesToGallery };
