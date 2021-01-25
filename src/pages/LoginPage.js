import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createPlayer } from '../redux/actions'
import {Modal, Button} from 'react-bootstrap'
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
    dispatch(createPlayer(payload))
    history.push('/room')
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