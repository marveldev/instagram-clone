import bioForm from './BioForm.js';
import { getEntryFromDb } from '../../dataStorage.js';

const profile = async () => {
  const userInfo = await getEntryFromDb('bio');
  const userPhoto = await getEntryFromDb('bioPhoto');
  return `
    <section class="profile">
      <section id="profilePhoto">
        <a href="#" class="profile-photo">
          <img src=${userPhoto} id="photo" alt="photo">
        </a>
        <input type="file" id="editBioPhoto">
        <label for="editBioPhoto" id="editPhotoButton">
          <i class="fa fa-edit"></i>EDIT PHOTO
        </label>
      </section>
      <div class="bio-info">
        <p class="bio-name">${userInfo[0] ? userInfo[0].bioName : ''}</p>
        <p class="bio-about">${userInfo[0] ? userInfo[0].bioDescription: ''}</p>
        <button class="bio-button">EDIT BIO</button>
      </div>
      ${bioForm()}
    </section>
  `
}
export default profile;
