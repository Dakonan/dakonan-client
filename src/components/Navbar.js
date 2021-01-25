import React from 'react'
import {Link} from 'react-router-dom'
import LeaderBoard from './LeaderBoard'
const NavbarTop = ({username}) => {
  return (
    <nav class="navbar navbar-light bg-light">
      <div>
        <Link to="/room">
          <h5>DAKONAN</h5>
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <LeaderBoard></LeaderBoard>
        <h5>{`Hi ${username.toUpperCase()}`}</h5>
      </div>

    </nav>
  )
}

export default NavbarTop