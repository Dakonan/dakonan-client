import React from 'react'
// import {useHistory} from 'react-router-dom'

const RegisterPage = () => {
    // const history = useHistory()
    return (
        <div>
            <div className="container">
                    <form>
                    <div class="form-group">
                            <label >Email</label>
                            <input type="email" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="form-group">
                            <label >USERNAME</label>
                            <input type="text" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="form-group">
                            <label >PASSWORD</label>
                            <input type="password" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div className="form-group">
                            <button className="btn-login mt-2" variant="dark" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )

}

export default RegisterPage