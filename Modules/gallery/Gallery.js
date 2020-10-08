import { getEntryFromDb } from "../../dataStorage.js";

const gallery = async () => {
  const galleryData = await getEntryFromDb('gallery');
  const galleryItems = galleryData.map(singlePhoto => {
    return `
      <a href="#" class="item">
        <img src="${singlePhoto}" alt="image">
      </a>
    `
  })

  return `
    <div class="gallery-nav"></div>
    <input type="file" id="addPhoto">
    <label for="addPhoto">
      <i class="add-photo fa fa-plus-square"></i>
    </label>
    <section class="gallery">
      ${galleryItems}
    </section>
  `
}
export default gallery;
