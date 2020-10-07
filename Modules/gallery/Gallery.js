const gallery = () => {
  return `
    <div class="gallery-nav"></div>
    <input type="file" id="addPhoto">
    <label for="addPhoto">
      <i class="add-photo fa fa-plus-square"></i>
    </label>
    <section class="gallery">
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/4926666/pexels-photo-4926666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/5085237/pexels-photo-5085237.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/3226462/pexels-photo-3226462.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/4939074/pexels-photo-4939074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/3728598/pexels-photo-3728598.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
      <a href="#" class="item">
        <img src="https://images.pexels.com/photos/4958609/pexels-photo-4958609.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
      </a>
    </section>
  `
}
export default gallery();
