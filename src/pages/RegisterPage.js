import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPlayer, register } from '../redux/actions'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const allPlayer = useSelector(state => state.players.allPlayer)
  const [formInput, setFormInput] = useState({
    email: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    console.log(allPlayer, 'di use effect')
  }, [])

  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false
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
    let errorsMessage = false
    let newError = {
      title: false,
      overview: false,
      poster_path: false,
      popularity: false,
      tags: false
  }

    if(formInput.email.length === 0 || formInput.email.trim().length === 0) {
      errorsMessage = true
      newError.email = 'email is required and valid email'
    }
    if(!formInput.username.length === 0 || formInput.username.trim().length === 0) {
      errorsMessage = true
      newError.username = 'username is required'
    }
    if(formInput.password.length < 6 || formInput.password.trim().length < 6) {
      errorsMessage = true
      newError.password = 'password is required and minimum 6 character'
    }    
    if(errorsMessage) {
      errorsMessage = false
      setErrors(newError)
    }

    if (formInput.email && formInput.username && formInput.password.length >= 6) {
      console.log('sukses regis')
      const payload = {
        email: formInput.email,
        username: formInput.username,
        password: formInput.password
      }
      dispatch(register(payload))
    }


  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div class="form-group">
                <label >Email</label>
                <input name="email" onChange={handleChange} type="email" class="form-control" placeholder="Enter Your Username"/>
                {
                  errors.email ?
                  <div className="error-email">
                    <span>{errors.email}</span>
                  </div>
                  :
                  ''
                }
            </div>
            <div class="form-group">
                <label >USERNAME</label>
                <input name="username" onChange={handleChange} type="text" class="form-control" placeholder="Enter Your Username"/>
                {
                  errors.username ?
                  <div className="error-username">
                    <span>{errors.username}</span>
                  </div>
                  :
                  ''
                }
            </div>
            <div class="form-group">
                <label >PASSWORD</label>
                <input name="password" onChange={handleChange} type="password" class="form-control" placeholder="Enter Your Username"/>
                {
                  errors.password ?
                  <div className="error-password">
                    <span>{errors.password}</span>
                  </div>
                  :
                  ''
                }
            </div>
            <div className="form-group">
                <button className="btn btn-dark mt-2" type="submit">
                    Register
                </button>
            </div>
        </form>
      </div>
    </div>
  )

}

export default RegisterPage