const galleryModal = () => {
  return `
    <section>
      <div id="createPostOverlay"></div>
      <div class="create-post-modal">
        <div id="createPost">
          <strong>Create Post</strong>
          <button id="closePostButton">X</button>
        </div>
        <div id="previewEntry">
          <textarea id="userPostInput" placeholder="Image Description..."></textarea>
          <button id="previewImageButton">X</button>
          <img src="https://images.pexels.com/photos/4864565/pexels-photo-4864565.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            id="userPhoto" alt="photo">
        </div>
        <div class="post-options">
          <span>Add To Your Post</span>
          <input type="file" id="addPhoto">
          <label for="addPhoto">
            <i class="material-icons" id="photoIcon">&#xe413;</i>
          </label>
          <a href="#"><i class='fas fa-user-tag' id="userTagIcon"></i></a>
          <a href="#"><i class="material-icons" id="smilyFaceIcon">&#xe420;</i></a>
        </div>
        <button id="userPostButton">POST</button>
      </div>
    </section>
  `
}
export default galleryModal;