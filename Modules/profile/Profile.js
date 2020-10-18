import bioForm from './BioForm.js';
import { getEntryFromDb } from '../../dataStorage.js';

const profile = async () => {
  const userInfo = await getEntryFromDb('bio');
  return `
    <section class="profile">
      <a href="#" class="profile-photo">
        <img src="https://images.pexels.com/photos/4864565/pexels-photo-4864565.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="photo">
      </a>
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
