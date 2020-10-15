import Nav from './Modules/nav/Nav.js';
import Profile from './Modules/profile/Profile.js';
import Gallery from './Modules/gallery/Gallery.js';
import { request, addEntryToDb, getEntryFromDb } from './dataStorage.js';
import  addBioEventListeners  from './Modules/profile/events.js';
import { addGalleryEventListeners, addImagesToGallery} from './Modules/gallery/events.js';

const app = async () => {
  return `
    ${Nav()}
    <section class="content">
      ${await Profile()}
      ${Gallery()}
    </section>
  `
}


request.onsuccess = async () => { 
  document.getElementById('root').innerHTML = await app();
  // addEntryToDb('bio', {name: 'Jane Doe', description: 'Hey, I am Jane!'}) 
  // getEntryFromDb('bio')
  addBioEventListeners();
  addGalleryEventListeners();
  addImagesToGallery();
}

request.onerror = () => {
  console.log('error accessing indexDb');
}
