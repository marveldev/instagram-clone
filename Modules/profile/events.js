import { addEntryToDb, clearAllEntries } from '../../dataStorage.js';

const addBioEventListeners = () => {
  const profilePhoto = document.querySelector('#profilePhoto');
  const editPhotoButton = document.querySelector('#editPhotoButton');

  profilePhoto.addEventListener('mouseover', () => {
    // editPhotoButton.style.display = 'block';
  })

  profilePhoto.addEventListener('mouseout', () => {
    // editPhotoButton.style.display = 'none';
  })

  const profilePhotoButton = document.querySelector('#editPhotoButton');
  profilePhotoButton.addEventListener('click', () => {
    console.log('ok');

  })

  const bioForm = document.querySelector('.bio-form');
  const bioButton = document.querySelector('.bio-button');
  const cancelButton = document.querySelector('.cancel-button');
  
  const openEditBioModal = () => {
    bioForm.style.display = 'block';
  }

  bioButton.addEventListener('click', openEditBioModal);

  bioForm.addEventListener('submit', () => {
    event.preventDefault();
    const bioNameOutput = document.querySelector('.bio-name');
    const bioDescriptionOutput = document.querySelector('.bio-about');
    const bioName = document.querySelector('.bio-name-input').value;
    const bioDescription = document.querySelector('.bio-description').value;
    
    clearAllEntries('bio');
    addEntryToDb('bio', { bioName, bioDescription })

    bioNameOutput.innerText = bioName;
    bioDescriptionOutput.innerText = bioDescription;
    
    bioForm.style.display = 'none';
  })

  const closeEditBioModal = () => {
    bioForm.style.display = 'none';
  }

  cancelButton.addEventListener('click', closeEditBioModal);
}
export default addBioEventListeners;
