import { addEntryToDb } from '../../dataStorage.js';

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
    const nameOutput = document.querySelector('.bio-name');
    const bioName = document.querySelector('.bio-name-input').value;
    const bioDescription = document.querySelector('.bio-description').value;
    nameOutput.innerText = bioName.value;
  
    addEntryToDb('bio', { bioName, bioDescription })
  })

  const closeEditBioModal = () => {
    bioForm.style.display = 'none';
  }
  
  cancelButton.addEventListener('click', closeEditBioModal);
}

export default addBioEventListeners;

