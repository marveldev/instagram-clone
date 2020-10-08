const bioForm = () => {
  return `
    <form class="bio-form">
      <input type="text" class="bio-name-input" placeholder="name..." required/>
      <input type="text" class="bio-description" placeholder="description..." required/>
      <button class="submit-button">SUBMIT</button>
      <button class="cancel-button">CANCEL</button>
    </form>
  `
}

export default bioForm;
