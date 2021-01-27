import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPlayer } from '../redux/actions'
import { CustomButton } from '../components'
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
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('username', payload.username)
        dispatch(createPlayer(payload))
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 1000
        })
        history.push('/room')
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
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <CustomButton className="btn-dark mt-2" type="submit">Login</CustomButton>
          </div>
        </form>
      </div>
    </div>
    )
}

export default LoginPage