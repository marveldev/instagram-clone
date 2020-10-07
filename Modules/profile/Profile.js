import bioForm from "./BioForm.js";

const profile = () => {
  return `
    <section class="profile">
      <a href="#" class="profile-photo">
        <img src="https://images.pexels.com/photos/4864565/pexels-photo-4864565.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <div class="bio-info">
        <p class="bio-name">MarvelWonders</p>
        <p class="bio-about">Push yourself, because no one else is going to do it for you.</p>
        <button class="bio-button">EDIT BIO</button>
      </div>
      ${bioForm()}
    </section>
  `
}
export default profile();
