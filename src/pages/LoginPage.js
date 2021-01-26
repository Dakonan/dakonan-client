import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createPlayer } from '../redux/actions'
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const obj = {...formInput}
    obj[name] = value
    setFormInput(obj)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
        username: formInput.username,
        password: formInput.password
    }
    axios({
      url: `/login`,
      method: 'POST',
      data: payload
    })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('username', payload.username)
        dispatch(createPlayer(payload))
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        })
        setInterval(() => {
          history.push('/room')
        }, 1000);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      })
  }
  return (
      <div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label >USERNAME</label>
              <input name="username" type="text" className="form-control" placeholder="Enter Your Username"
              onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label >PASSWORD</label>
              <input name="password" type="password" className="form-control" placeholder="Enter Your Username"
              onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button className="btn-dark mt-2" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default LoginPage