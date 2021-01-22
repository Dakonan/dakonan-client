import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createPlayer } from '../redux/actions'
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
                <div className="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto">
                    <div className="col-7">
                    <img src='' className="login-image card-img-top img-login rounded-circle" alt="register"/>
                    </div>
                    <div className="col-5">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label >USERNAME</label>
                            <input name="username" type="text" className="form-control" placeholder="Enter Your Username"
                            onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
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
            </div>
        </div>
    )
}

export default LoginPage