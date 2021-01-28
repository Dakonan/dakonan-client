import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import LeaderBoard from './LeaderBoard'
// import logo from '../assets/logo.png'
import dakonan from '../assets/dakonan.png'

const NavbarTop = ({username}) => {
  const history = useHistory() 
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <nav className="navbar navbar-light" style={{
      padding: '25px 60px',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '1',
      }}>
      <div>
        <Link to="/room">
        <img src={dakonan} class="logo" alt="dakonan" style={{
          maxWidth: '150px'
        }}/>
        </Link>
      </div>
      <div className="d-flex justify-content-between" style={{
        color: 'white'
        }}>
        <LeaderBoard></LeaderBoard>
        <h5>{`${username.toLowerCase()}`}</h5>
        <div onClick={() => logout()} className="btn-logout">
        <i className="fas fa-sign-out-alt"></i>
        <span className="tooltiptext">logout</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarTop