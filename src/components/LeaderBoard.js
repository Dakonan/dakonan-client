import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'


const LeaderBoard = () => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

return (
  <>
  <div className="btn-leaderboard" onClick={handleShow}>
      <i class="fas fa-medal"></i>
      <span>leaderboard</span>
  </div>
  {/* <Button variant="primary">
      LeaderBoard
  </Button> */}

  <Modal show={show} onHide={handleClose}>
    <div class="leaderboard">
    <header>
      <h1><strong>Leader Board</strong></h1>
      {/* <img src="https://i.imgur.com/xUSrEpd.png" alt=""></img> */}
    </header>
    <table>
      <thead>
        <tr>
          <th class="rank"></th>
          <th class="username">Username</th>
          <th class="match">Match</th>
          <th class="winrate">Winrate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rank">1</td>
          <td class="username">Bagus</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">2</td>
          <td class="username">Temon</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">4</td>
          <td class="username">Ucup</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">5</td>
          <td class="username">Ucup</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">6</td>
          <td class="username">Ucup</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">7</td>
          <td class="username">Ucup</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
        <tr>
          <td class="rank">8</td>
          <td class="username">Ucup</td>
          <td class="match">testMatch</td>
          <td class="winrate">70%</td>
        </tr>
      </tbody>
    </table>
  </div>
  </Modal>
 
</>
)
}

export default LeaderBoard