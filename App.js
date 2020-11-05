import Nav from './Modules/nav/Nav.js';
import Profile from './Modules/profile/Profile.js';
import Gallery from './Modules/gallery/Gallery.js';
import { request } from './dataStorage.js';
import  { addBioEventListeners, addBioPhotoEventListeners } from './Modules/profile/events.js';
import { addGalleryItemsToDb, getGalleryItemsFromDb } from './Modules/gallery/events.js';
import GalleryModal from './Modules/modals/galleryModal.js';
import modalEventListeners from './Modules/modals/events.js';

const app = async () => {
  return `
    ${Nav()}
    <section class="content">
      ${await Profile()}
      ${Gallery()}
      ${GalleryModal()}
    </section>
  `
}


request.onsuccess = async () => { 
  document.getElementById('root').innerHTML = await app();
  modalEventListeners();
  addBioPhotoEventListeners();
  addBioEventListeners();
  addGalleryItemsToDb();
  getGalleryItemsFromDb();
}

request.onerror = () => {
  console.log('error accessing indexDb');
}
