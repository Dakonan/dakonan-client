import React from 'react'
import {Link} from 'react-router-dom'
const LoginPage = () => {
    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto">
                    <div className="col-7">
                    <img src='' className="login-image card-img-top img-login rounded-circle" alt="register"/>
                    </div>
                    <div className="col-5">
                    <h2>Login</h2>
                    <form>
                        <div class="form-group">
                            <label >USERNAME</label>
                            <input type="text" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="form-group">
                            <label >PASSWORD</label>
                            <input type="password" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div className="form-group">
                            <Link to="/room">
                                <button className="btn-login mt-2 " variant="dark" type="submit">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage