import { Link, useHistory } from 'react-router-dom'
import { LeaderBoard, AnchorWrapper } from '.'
const NavbarTop = ({username}) => {
  const history = useHistory() 
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <AnchorWrapper>
        <Link to="/room"><h5>DAKONAN</h5></Link>
      </AnchorWrapper>
      <div className="d-flex justify-content-between">
        <LeaderBoard />
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