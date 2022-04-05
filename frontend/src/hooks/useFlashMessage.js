import bus from '../utils/bus'

// function to send flash messages in an easier way
export default function useFlashMessage() {
  function setFlashMessage(msg, type) {
    bus.emit('flash', {
      message: msg,
      type: type,
    })
  }

  return { setFlashMessage }
}
