import { useState, useEffect } from 'react'
import bus from '../../utils/bus'
import styles from './Message.module.css'

// component of flash messages in login, logout etc
function Message() {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibility(false)
      }, 2500)
    })
  }, [])

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  )
}

export default Message
