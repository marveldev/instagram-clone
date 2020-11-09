const modalEventListeners = () => {
  const addPhotoIcon = document.querySelector('.add-photo');
  const userPostOverlay = document.querySelector('#createPostOverlay');
  const closePostButton = document.querySelector('#closePostButton');
  const galleryPostButton = document.querySelector('#userPostButton');

  const messageButton = document.querySelector('.message-btn');
  messageButton.addEventListener('click', () => {
    const message = document.querySelector('#message');
    message.style.display = 'none';
  })

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
    const editModals = document.querySelectorAll('.edit-text-modal')
    for (let index = 0; index < editModals.length; index++) {
      const editModal = editModals[index];
      editModal.style.display = 'none';
    }

    const deleteModals = document.querySelectorAll('.delete-modal')
    for (let index = 0; index < deleteModals.length; index++) {
      const deleteModal = deleteModals[index];
      deleteModal.style.display = 'none';
    }
    toggleUserPostModal('none');
  })

  closePostButton.addEventListener('click', () => {
    toggleUserPostModal('none');
  })
}
export default modalEventListeners