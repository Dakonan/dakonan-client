import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import logo from '../assets/logo.png'

const HowToPlay = () => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true)


return (
<>
  <div className="anchor-wrapper" style={{
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: '1vw'
    }} 
    onClick={handleShow}>
    <h5>How To Play</h5>
  </div>

  <Modal show={show} onHide={handleClose}>
  <div class="howtoplay row" style={{textAlign: 'center'}}>
    <div className="col-12 mt-4">
      <div className="col-12 mb-3">
        <img src={logo} className="logo" style={{width: '3rem'}} alt="how To play"  />
      </div>
      <div className="col-12" >
        <h1 className="mb-4" style={{color: '#e9c46a', webkitTextStroke: '1.5px black', fontSize: '70px'}}><strong>How to Play</strong></h1>
        <h4 style={{color: '#e9c46a', webkitTextStroke: '1px black', fontSize: '30px'}}><strong>For 2 Players</strong></h4>
        <p className="mb-4">Dakon (also known as Dhakon, Cangklok, Mancala, etc) is an ancient family of board games, and there are numerous variants.</p>
        <h4 style={{color: '#e9c46a', webkitTextStroke: '1px black', fontSize: '30px'}}><strong>Gameplay</strong></h4>
        <table className="mb-5">
          <tbody>
            <tr className="odd">
              <td style={{textAlign: 'left', minWidth: '2em'}} >1</td>
              <td style={{textAlign: 'left'}} className="username">The game begins with one player picking up all of the pieces in any one of the pockets on his/her side.</td>
            </tr>
            <tr className="even">
              <td style={{textAlign: 'left', minWidth: '2em'}} >2</td>
              <td style={{textAlign: 'left'}} className="username">Moving counter-clockwise, the player deposits one of the stones in each pocket until the stones run out.</td>
            </tr>
            <tr className="odd">
              <td style={{textAlign: 'left', minWidth: '2em'}}>3</td>
              <td style={{textAlign: 'left'}} className="username">If you run into your own Dakon (store), deposit one piece in it. If you run into your opponent's Dakon, skip it and continue moving to the next pocket.</td>
            </tr>
            <tr className="even">
              <td style={{textAlign: 'left', minWidth: '2em'}} >4</td>
              <td style={{textAlign: 'left'}} className="username">If the last piece you drop is in your own Dakon, you take another turn.</td>
            </tr>
            <tr className="odd">
              <td style={{textAlign: 'left', minWidth: '2em'}}>5</td>
              <td style={{textAlign: 'left'}} className="username">If the last piece you drop is in an empty pocket on your side, you capture that piece and any pieces in the pocket directly opposite.</td>
            </tr>
            <tr className="even">
              <td style={{textAlign: 'left', minWidth: '2em'}} >6</td>
              <td style={{textAlign: 'left'}} className="username">Always place all captured pieces in your Dakon (store).</td>
            </tr>
            <tr className="odd">
              <td style={{textAlign: 'left', minWidth: '2em'}}>7</td>
              <td style={{textAlign: 'left'}} className="username">The game ends when all six pockets on one side of the Dakon board are empty.</td>
            </tr>
            <tr className="even">
              <td style={{textAlign: 'left', minWidth: '2em'}} >8</td>
              <td style={{textAlign: 'left'}} className="username">The player who still has pieces on his/her side of the board when the game ends capture all of those pieces.</td>
            </tr>
            <tr className="odd">
              <td style={{textAlign: 'left', minWidth: '2em'}}>9</td>
              <td style={{textAlign: 'left'}} className="username">Count all the pieces in each Dakon. The winner is the player with the most pieces.</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
  </Modal>
</>
)
}

export default HowToPlay