import { addEntryToDb, getEntryFromDb  } from '../../dataStorage.js';

const addGalleryEventListeners = () => {
  const addPhotoIcon = document.querySelector('.add-photo');
  const userPostOverlay = document.querySelector('#createPostOverlay');
  const closePostButton = document.querySelector('#closePostButton');
  const galleryPostButton = document.querySelector('#userPostButton');

  const toggleUserPostModal = (value) => {
    document.querySelector('.create-post-modal').style.display = value;
    userPostOverlay.style.display = value;
  }

  addPhotoIcon.addEventListener('click', () => {
    toggleUserPostModal('block');
  })
    
  galleryPostButton.addEventListener('click', () => {
    toggleUserPostModal('none');
  })

  userPostOverlay.addEventListener('click', () => {
    toggleUserPostModal('none');
  })

  closePostButton.addEventListener('click', () => {
    toggleUserPostModal('none');
  })

  const photoInput = document.querySelector('#addPhoto');
  const userPhoto = document.querySelector('#userPhoto');
  photoInput.addEventListener('change', () => {
    const photoReader = new FileReader();
    photoReader.readAsDataURL(photoInput.files[0])
    photoReader.addEventListener('load', () => {
      userPhoto.src = photoReader.result;
    })
  })

  const userPostButton = document.querySelector('#userPostButton');
  userPostButton.addEventListener('click', () => {
    const gallerySection = document.querySelector('.gallery');
    const userPostInput = document.querySelector('#userPostInput').value;
    let galleryItem = `
      <div class="photo-content">
        <a href="#" class="item">
          <img src="${userPhoto.src}" alt="photo">
        </a>
        <div class="about-photo">
          <button id="photoButton">X</button>
          <div id="aboutPhoto">${userPostInput}</div>
        </div>
      </div>
    `
    galleryItem += gallerySection.innerHTML
    gallerySection.innerHTML = galleryItem;

    const item = {
      photoSource: userPhoto.src,
      photoDescription: userPostInput
    } 
    addEntryToDb('gallery', item);
    togglePhotoContent();
  })
}

const togglePhotoContent = () => {
  const photoContents = document.querySelectorAll('.photo-content');
  for (let index = 0; index < photoContents.length; index++) {
    const singleItem = photoContents[index];
    singleItem.addEventListener('mouseover', () => {
      singleItem.lastElementChild.style.display = 'block';
    })
    singleItem.addEventListener('mouseout', () => {
      singleItem.lastElementChild.style.display = 'none';
    })
  }
}

const addImagesToGallery = async () => {
  const gallerySection = document.querySelector('.gallery');
  const galleryData = await getEntryFromDb('gallery');
  const galleryItems = galleryData.reverse().map((singlePhoto) => {
    return `
      <div class="photo-content">
        <a href="#" class="item">
          <img src="${singlePhoto.photoSource}" alt="photo">
        </a>
        <div class="about-photo">
          <button id="photoButton">X</button>
          <div id="aboutPhoto">${singlePhoto.photoDescription}</div>
        </div>
      </div>
    `
  })

  gallerySection.style.display = 'grid';
  gallerySection.innerHTML = galleryItems.join('');
  togglePhotoContent();
}

export { addGalleryEventListeners, addImagesToGallery };
