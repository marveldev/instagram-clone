import { addEntryToDb, getEntryFromDb, deleteEntry  } from '../../dataStorage.js';

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
    const editModals = document.querySelectorAll('.edit-text-modal')
    for (let index = 0; index < editModals.length; index++) {
      const editModal = editModals[index];
      editModal.style.display = 'none';
    }
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
    const photoText = document.querySelector('#userPostInput').value;
    const itemId = 'id' + Math.random().toString(36).substring(7);
    const modalId = 'id' + Math.random().toString(36).substring(7);
    console.log(itemId);
    console.log(modalId);

    let galleryItem = `
      <div id=${itemId}>
        <div class="photo-container">
          <a href="#" class="item">
            <img src="${userPhoto.src}" alt="photo">
          </a>
          <div class="about-photo">
            <button class="edit-text button" title=${modalId}>EDIT</button>
            <button class="photo-button button" title=${itemId}>X</button>
            <div class=${modalId} id="aboutPhoto">${photoText}</div>
          </div>
        </div>
        <div class="edit-text-modal" id=${modalId}>
          <strong>EDIT PHOTO DESCRIPTION</strong>
          <div id="editEntry">
            <textarea id="editPostInput" placeholder="Image Description..."></textarea>
            <button class="confirm-edit button" title=${modalId}>OK</button>
            <button class="cancel-edit button">CANCEL</button>
          </div> 
        </div>
      </div>
    `
    galleryItem += gallerySection.innerHTML
    gallerySection.innerHTML = galleryItem;

    const addItemToIndexDb = {
      galleryId: itemId,
      modalId: modalId,
      photoSource: userPhoto.src,
      photoText: photoText
    } 
    addEntryToDb('gallery', addItemToIndexDb);
    togglePhotoContent();
    editItemText();
    deleteItem();
  })
}

const togglePhotoContent = () => {
  const photoContents = document.querySelectorAll('.photo-container');
  for (let index = 0; index < photoContents.length; index++) {
    const singleItem = photoContents[index];
    singleItem.addEventListener('mouseover', () => {
     singleItem.lastElementChild.style.display = 'block'
    })
    singleItem.addEventListener('mouseout', () => {
      singleItem.lastElementChild.style.display = 'none'
    })
  }
}

const editItemText = () => {
  const editButtons = document.querySelectorAll('.edit-text')
  const userPostOverlay = document.querySelector('#createPostOverlay');
  for (let index = 0; index < editButtons.length; index++) {
    const editButton = editButtons[index];
    editButton.addEventListener('click', () => {
      const editModal = editButton.parentElement.parentElement.nextElementSibling;
      editModal.style.display = 'block';
      userPostOverlay.style.display = 'block';
    })
  }

  const confirmEditButtons = document.querySelectorAll('.confirm-edit');
  for (let index = 0; index < confirmEditButtons.length; index++) {
    const confirmEditButton = confirmEditButtons[index];
    confirmEditButton.addEventListener('click', () => {
      const textValue = confirmEditButton.previousElementSibling;
      const modal = confirmEditButton.parentElement.parentElement
      const parentElement = confirmEditButton.parentElement.parentElement.parentElement;
      const aboutPhoto = document.querySelector(`#${parentElement.className}`);
      aboutPhoto.innerHTML = textValue.value;
      modal.style.display = 'none';
      userPostOverlay.style.display = 'none';
    })
  }

  const cancelButtons = document.querySelectorAll('.cancel-edit')
  for (let index = 0; index < cancelButtons.length; index++) {
    const cancelButton = cancelButtons[index];
    cancelButton.addEventListener('click', () => {
      const closeModal = cancelButton.parentElement.parentElement;
      closeModal.style.display = 'none';
      userPostOverlay.style.display = 'none';
    })
  }
}

const deleteItem = () => {
  const deleteButtons = document.querySelectorAll('.photo-button')
  const gallerySection = document.querySelector('.gallery');
  for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', () => {
      const parentItem = deleteButton.parentElement.parentElement.parentElement;
      gallerySection.removeChild(parentItem);
      deleteEntry('gallery', parentItem.id);
    })
  }
}

const addImagesToGallery = async () => {
  const gallerySection = document.querySelector('.gallery');
  const galleryData = await getEntryFromDb('gallery');
  let galleryItems = galleryData.map((singlePhoto) => {
    return `
      <div id=${singlePhoto.galleryId}>
        <div class="photo-container">
          <a href="#" class="item">
            <img src="${singlePhoto.photoSource}" alt="photo">
          </a>
          <div class="about-photo">
            <button class="edit-text button" title=${singlePhoto.modalId}>EDIT</button>
            <button class="photo-button button" title=${singlePhoto.galleryId}>X</button>
            <div class=${singlePhoto.modalId} id="aboutPhoto">${singlePhoto.photoText}</div>
          </div>
        </div>
        <div class="edit-text-modal" id=${singlePhoto.modalId}>
          <strong>EDIT PHOTO DESCRIPTION</strong>
          <div id="editEntry">
            <textarea id="editPostInput" placeholder="Image Description..."></textarea>
            <button class="confirm-edit button" title=${singlePhoto.modalId}>OK</button>
            <button class="cancel-edit button">CANCEL</button>
          </div> 
        </div>
      </div>
    `
  })
  gallerySection.style.display = 'grid';
  gallerySection.innerHTML = galleryItems.join('');
  togglePhotoContent();
  deleteItem();
  editItemText();
}

export { addGalleryEventListeners, addImagesToGallery };
