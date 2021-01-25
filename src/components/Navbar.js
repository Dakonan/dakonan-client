import React from 'react'

const NavbarTop = ({username}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <h5>DAKONAN</h5>
      </div>
      <div>
        <h5>{`Hi ${username.toUpperCase()}`}</h5>
      </div>

    </nav>
  )
}

export default NavbarTop