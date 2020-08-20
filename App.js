import Nav from './Modules/Nav.js';
import Profile from './Modules/profile.js';
import Gallery from './Modules/gallery.js';

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