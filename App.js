import Nav from './Modules/nav/Nav.js';
import Profile from './Modules/profile/Profile.js';
import Gallery from './Modules/gallery/Gallery.js';
import { request, addEntryToDb, getEntryFromDb } from './dataStorage.js';
import  addBioEventListeners  from './Modules/profile/event.js'

const app = () => {
  return `
    ${Nav}
    <section class="content">
      ${Profile}
      ${Gallery}
    </section>
  `
}

document.getElementById('root').innerHTML = app();

request.onsuccess = () => {
  // addEntryToDb('bio', {name: 'Jane Doe', description: 'Hey, I am Jane!'}) 
  getEntryFromDb('bio')
  addBioEventListeners();
}
