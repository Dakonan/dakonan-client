import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { joinRoom } from '../redux/actions'

const RoomCard = ({rooms, username}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleJoin = (username, roomName) => {
      const payload = {
          username,
          roomName
      }
      dispatch(joinRoom(payload))
      history.push(`/game/${roomName}`)
  }
  
  return (
      rooms.map((room, index) => (
        <div key={index} class="card m-1 w-100" >
          <div class="row no-gutters text-dark">
            <div class="col-md-12">
            <div class="card-body ">
              <div className="d-flex justify-content-center">
                <h4 class="card-title mr-2">{`${room.name}`}</h4>
                <p class="card-text">{`(by ${room.admin})`}</p>
              </div>
              {
                  room.users.length > 0 ?
                  <div className="d-flex justify-content-center">
                    <div className="m-3">
                      <p className="card-text m-0">{`player1`}</p>
                      <p className="card-text m-0">{`${room.users[0]}`}</p>
                    </div>
                      {
                          room.users.length > 1 ?
                          <div className="m-3">
                            <p className="card-text m-0">{`player2`}</p>
                            <p className="card-text m-0">{`${room.users[2]}`}</p>
                          </div>
                          :
                          ""
                      }
                  </div>
                  :
                  ""
              }
              {
                room ?
                <button onClick={() => handleJoin(username, room.name)}>Join</button>
                :
                room.user.length >= 2 ?
                <button className="btn btn-danger" onClick={() => handleJoin(username, room.name)}>Full</button>
                :
                <button onClick={() => handleJoin(username, room.name)}>Join</button>
              }
            </div>
            </div>
          </div>
        </div>
      )
  ))
}

export default RoomCard