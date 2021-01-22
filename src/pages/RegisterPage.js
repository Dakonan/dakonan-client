import React from 'react'
// import {useHistory} from 'react-router-dom'

const RegisterPage = () => {
    // const history = useHistory()
    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto">
                    <div className="col-7">
                    <img src='' className="login-image card-img-top img-login rounded-circle" alt="register"/>
                    </div>
                    <div className="col-5">
                    <h2>Register</h2>
                    <form>
                        <div class="form-group">
                            <label >USERNAME</label>
                            <input type="text" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="form-group">
                            <label >PASSWORD</label>
                            <input type="password" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <span>Already Have Account? <a href="/login" >Sign In</a></span>
                        <div className="form-group">
                            <button className="btn-login mt-2" variant="dark" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RegisterPage