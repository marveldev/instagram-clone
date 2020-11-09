import { addEntryToDb, getEntryFromDb, deleteEntry, updateEntry  } from '../../dataStorage.js';

const addGalleryItemsToDb = () => {
  const gallerySection = document.querySelector('.gallery');
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
    const photoText = document.querySelector('#userPostInput').value;
    const itemId = 'id' + Date.parse(new Date()).toString();
    const modalId = 'id' + Math.random().toString(36).substring(7);

    let galleryItem = `
      <div class=${modalId}>
        <div class="photo-container">
          <a href="#" class="item">
            <img src="${userPhoto.src}" alt="photo">
          </a>
          <div class="about-photo">
            <button class="edit-text button" title=${modalId}>EDIT</button>
            <button class="delete-photoBtn button" title=${itemId}>X</button>
            <div class=${itemId} id="aboutPhoto">${photoText}</div>
          </div>
        </div>
        <div class="edit-text-modal" id=${modalId}>
          <strong>EDIT PHOTO DESCRIPTION</strong>
          <div id="editEntry">
            <textarea id="editPostInput" placeholder="Image Description..."></textarea>
            <button class="confirm-edit button" title=${itemId}>OK</button>
            <button class="cancel-edit button">CANCEL</button>
          </div>
        </div>
        <div class="delete-modal" id=${itemId}>
          <h3>Delete Tweet?</h3>
          <p>This can't be undone and it will be removed from your gallery.</p>
          <button class="cancel-button">Cancel</button>
          <button class="confirm-button" title="${modalId}">Delete</button>
        </div>
      </div>
    `
    document.querySelector('.gallery-info').style.display = 'none';

    galleryItem += gallerySection.innerHTML
    gallerySection.innerHTML = galleryItem;

    togglePhotoContent();
    editItemText();
    deleteItemText();

    const addItemToIndexDb = {
      galleryId: itemId,
      modalId: modalId,
      photoSource: userPhoto.src,
      photoText: photoText
    }

    addEntryToDb('gallery', addItemToIndexDb);
  })
}

const togglePhotoContent = () => {
  const photoContents = document.querySelectorAll('.photo-container');
  for (let index = 0; index < photoContents.length; index++) {
    const photoContent = photoContents[index];
    photoContent.addEventListener('click', (event) => {
      event.preventDefault();
      photoContent.lastElementChild.style.display = 'block'
    })
    photoContent.addEventListener('mouseleave', () => {
      photoContent.lastElementChild.style.display = 'none'
    })
  }
}

const editItemText = () => {
  const editButtons = document.querySelectorAll('.edit-text')
  const userPostOverlay = document.querySelector('#createPostOverlay');
  for (let index = 0; index < editButtons.length; index++) {
    const editButton = editButtons[index];
    editButton.addEventListener('click', () => {
      const modalId = editButton.title;
      const editModal = document.querySelector(`#${modalId}`);
      editModal.style.display = 'block';
      userPostOverlay.style.display = 'block';
    })
  }

  const confirmEditButtons = document.querySelectorAll('.confirm-edit');
  for (let index = 0; index < confirmEditButtons.length; index++) {
    const confirmEditButton = confirmEditButtons[index];
    confirmEditButton.addEventListener('click', () => {
      const text = confirmEditButton.previousElementSibling;
      const editModal = confirmEditButton.parentElement.parentElement;
      const elementClass = confirmEditButton.title;
      const aboutPhoto = document.querySelector(`.${elementClass}`);
      const galleryItem = document.querySelector(`#${elementClass}`);
      aboutPhoto.innerHTML = text.value;
      const newEntry = aboutPhoto.innerHTML;
      editModal.style.display = 'none';
      userPostOverlay.style.display = 'none';

      updateEntry('gallery', galleryItem.id, newEntry)
    })
  }

  const cancelButtons = document.querySelectorAll('.cancel-edit')
  for (let index = 0; index < cancelButtons.length; index++) {
    const cancelButton = cancelButtons[index];
    cancelButton.addEventListener('click', () => {
      const editModal = cancelButton.parentElement.parentElement;
      editModal.style.display = 'none';
      userPostOverlay.style.display = 'none';
    })
  }
}

const deleteItemText = () => {
  const deleteButtons = document.querySelectorAll('.delete-photoBtn');
  const userPostOverlay = document.querySelector('#createPostOverlay');
  const gallerySection = document.querySelector('.gallery');

  for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', () => {
      const element = deleteButton.title;
      const deleteModal = document.querySelector(`#${element}`);
      deleteModal.style.display = 'block';
      userPostOverlay.style.display = 'block';
    })
  }

  const cancelButtons = document.querySelectorAll('.cancel-button')
  for (let index = 0; index < cancelButtons.length; index++) {
    const cancelButton = cancelButtons[index];
    cancelButton.addEventListener('click', () => {
      const deleteModal = cancelButton.parentElement;
      deleteModal.style.display = 'none';
      userPostOverlay.style.display = 'none';
    })
  }

  const modalDeleteButtons = document.querySelectorAll('.confirm-button')
  for (let index = 0; index < modalDeleteButtons.length; index++) {
    const modalDeleteButton = modalDeleteButtons[index];
    modalDeleteButton.addEventListener('click', () => {
      const element = modalDeleteButton.title;
      const galleryItem = document.querySelector(`.${element}`);
      const deleteModal = modalDeleteButton.parentElement;
      gallerySection.removeChild(galleryItem);
      const entryKey = deleteModal.id;
      deleteModal.style.display = 'none';
      userPostOverlay.style.display = 'none';
      deleteEntry('gallery', entryKey);
    })
  }
}

const getGalleryItemsFromDb = async () => {
  const gallerySection = document.querySelector('.gallery');
  const galleryData = await getEntryFromDb('gallery');
  const galleryItems = galleryData.reverse().map((singlePhoto) => {
    return `
    <div class=${singlePhoto.modalId}>
        <div class="photo-container">
          <a href="#" class="item">
            <img src="${singlePhoto.photoSource}" alt="photo">
          </a>
          <div class="about-photo">
            <button class="edit-text button" title=${singlePhoto.modalId}>EDIT</button>
            <button class="delete-photoBtn button" title=${singlePhoto.galleryId}>X</button>
            <div class=${singlePhoto.galleryId} id="aboutPhoto">${singlePhoto.photoText}</div>
          </div>
        </div>
        <div class="edit-text-modal" id=${singlePhoto.modalId}>
          <strong>EDIT PHOTO DESCRIPTION</strong>
          <div id="editEntry">
            <textarea id="editPostInput" placeholder="Image Description..."></textarea>
            <button class="confirm-edit button" title=${singlePhoto.galleryId}>OK</button>
            <button class="cancel-edit button">CANCEL</button>
          </div>
        </div>
        <div class="delete-modal" id=${singlePhoto.galleryId}>
          <h3>Delete Tweet?</h3>
          <p>This can't be undone and it will be removed from your gallery.</p>
          <button class="cancel-button">Cancel</button>
          <button class="confirm-button" title="${singlePhoto.modalId}">Delete</button>
        </div>
      </div>
    `
  })

  const galleryMessage = `<p class="gallery-info">You've not added any photo yet</p>`;

  gallerySection.style.display = 'grid';
  gallerySection.innerHTML = galleryData.length == 0 ? galleryMessage : galleryItems.join('');

  togglePhotoContent();
  editItemText();
  deleteItemText();
}

export { addGalleryItemsToDb, getGalleryItemsFromDb };
