import Nav from './Modules/nav/Nav.js';
import Profile from './Modules/profile/Profile.js';
import Gallery from './Modules/gallery/Gallery.js';
import { request } from './dataStorage.js';
import  { addBioEventListeners, addBioPhotoEventListeners } from './Modules/profile/events.js';
import { addGalleryEventListeners, addImagesToGallery } from './Modules/gallery/events.js';
import GalleryModal from './Modules/gallery/galleryModal.js';
import navEventListeners from './Modules/nav/events.js';

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
  navEventListeners();
  addBioPhotoEventListeners();
  addBioEventListeners();
  addGalleryEventListeners();
  addImagesToGallery();
}

request.onerror = () => {
  console.log('error accessing indexDb');
}
