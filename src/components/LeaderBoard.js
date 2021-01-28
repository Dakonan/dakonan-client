import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getLeaderBoard } from '../redux/actions'
import { Modal } from 'react-bootstrap'

const LeaderBoard = () => {
const dispatch = useDispatch()
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true)
const leaderBoard = useSelector(state => state.rooms.leaderBoard)

useEffect(() => {
  dispatch(getLeaderBoard())
}, [show, dispatch])

return (
<>
  <div className="btn-leaderboard anchor-wrapper" onClick={handleShow}>
    <i className="fas fa-medal"></i>
    <span>leaderboard</span>
  </div>

  <Modal show={show} onHide={handleClose}>
    <div className="leaderboard">
    <header>
      <h1><strong>Leader Board</strong></h1>
    </header>
    <table>
      <thead>
        <tr>
          <th className="rank"></th>
          <th className="username">Username</th>
          <th className="match">Match</th>
          <th className="winrate">Winrate</th>
        </tr>
      </thead>
      <tbody>
      {
        leaderBoard.map((data, index) => {
          return (
            <tr key={index + "leaderboard"}>
              <td className="rank">{index+1}</td>
              <td className="username">{data.username}</td>
              <td className="match">{data.matchCount}</td>
              <td className="winrate">{data.winRate}%</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  </div>
  </Modal>
</>
)
}

export default LeaderBoard