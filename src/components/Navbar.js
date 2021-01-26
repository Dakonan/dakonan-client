import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import LeaderBoard from './LeaderBoard'
const NavbarTop = ({username}) => {
  const history = useHistory() 
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <nav class="navbar navbar-light bg-light">
      <div>
        <Link to="/room">
          <h5>DAKONAN</h5>
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <LeaderBoard></LeaderBoard>
        {/* <h5>{`${username.toLowerCase()}`}</h5> */}
        <div onClick={() => logout()} className="btn-logout">
        <i class="fas fa-sign-out-alt"></i>
        <span className="tooltiptext">logout</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarTop