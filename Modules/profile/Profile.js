import bioForm from './BioForm.js';
import { getEntryFromDb } from '../../dataStorage.js';

const profile = async () => {
  const userInfo = await getEntryFromDb('bio');
  const userPhoto = await getEntryFromDb('bioPhoto');
  return `
    <section class="profile">
      <section id="profilePhoto">
        <a href="#" class="profile-photo">
          <img src=${userPhoto[0] ? userPhoto :'https://history.ucr.edu/sites/g/files/rcwecm1916/files/styles/form_preview/public/blank-profile-picture-png.png?itok=MQ-iPuNG'}
          id="photo" alt="photo">
        </a>
        <input type="file" id="editBioPhoto">
        <label for="editBioPhoto" id="editPhotoButton">
          <i class="fa fa-edit"></i>EDIT PHOTO
        </label>
      </section>
      <div class="bio-info">
        <p class="bio-name">${userInfo[0] ? userInfo[0].bioName : 'Click here to update your bio'}</p>
        <p class="bio-about">${userInfo[0] ? userInfo[0].bioDescription: ''}</p>
        <button class="bio-button">EDIT BIO</button>
      </div>
      ${bioForm()}
    </section>
  `
}
export default profile;
