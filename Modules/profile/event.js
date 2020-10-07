import { addEntryToDb } from '../../dataStorage.js';

const addBioEventListeners = () => {
  const bioForm = document.querySelector('.bio-form');
  bioForm.addEventListener('submit', () => {
    event.preventDefault();
    const nameOutput = document.querySelector('.bio-name');
    const bioName = document.querySelector('.bio-name-input').value;
    const bioDescription = document.querySelector('.bio-description').value;
    nameOutput.innerText = bioName.value;
  
    addEntryToDb('bio', { bioName, bioDescription })
  })
}

export default addBioEventListeners;