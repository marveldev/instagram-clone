import Nav from './Modules/nav/Nav.js';
import Profile from './Modules/profile/Profile.js';
import Gallery from './Modules/gallery/Gallery.js';
import addGalleryEventListeners from './Modules/gallery/events.js';
import { request, addEntryToDb, getEntryFromDb } from './dataStorage.js';
import  addBioEventListeners  from './Modules/profile/events.js';

const app = async () => {
  return `
    ${Nav}
    <section class="content">
      ${await Profile()}
      ${await Gallery()}
    </section>
  `
}


request.onsuccess = async () => { 
  document.getElementById('root').innerHTML = await app();
  // addEntryToDb('bio', {name: 'Jane Doe', description: 'Hey, I am Jane!'}) 
  // getEntryFromDb('bio')
  addBioEventListeners();
  addGalleryEventListeners();
}

request.onerror = () => {
  console.log('error accessing indexDb');
}
