import api from '../utils/api'
import useFlashMessage from './useFlashMessage'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  // setting the authentication to true, taking the token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  // register is used to register the user, send the flash message, and use api to post the user in to the database
  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  // function used in register and login sending the token to localStorage
  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  // also using api to send to the route that check the user by token, that is taken by localStorage
  async function login(user) {
    let msgText = 'Login realizado com sucesso'
    let msgType = 'success'

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })
      await authUser(data)

    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  // this function delete the token from localStorage and put the setAuthenticated in false
  function logout() {
    const msgText = 'Logout realizado com sucesso!'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')

    setFlashMessage(msgText, msgType)
  }

  return { authenticated, register, logout, login }
}
