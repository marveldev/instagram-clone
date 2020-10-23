const navEventListeners = () => {
  const messageButton = document.querySelector('.message-btn');
  messageButton.addEventListener('click', () => {
    const message = document.querySelector('#message');
    message.style.display = 'none';
  })
}
export default navEventListeners;