import { addEntryToDb, clearAllEntries } from '../../dataStorage.js';

const addBioEventListeners = () => {
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
    
    bioNameOutput.innerText = bioName;
    bioDescriptionOutput.innerText = bioDescription;

    clearAllEntries('bio');
    addEntryToDb('bio', { bioName, bioDescription })
    
    bioForm.style.display = 'none';
  })

  const closeEditBioModal = () => {
    bioForm.style.display = 'none';
  }
  
  cancelButton.addEventListener('click', closeEditBioModal);
}

export default addBioEventListeners;

