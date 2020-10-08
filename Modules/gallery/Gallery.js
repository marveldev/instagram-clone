const gallery = () => {
  return `
    <div class="gallery-nav"></div>
    <input type="file" id="addPhoto">
    <label for="addPhoto">
      <i class="add-photo fa fa-plus-square"></i>
    </label>
    <section class="gallery">
      <div class="loader">
        <img src="../../assets/loader.svg" alt="loading"/>
      </div>
    </section>
  `
}

export default gallery;
