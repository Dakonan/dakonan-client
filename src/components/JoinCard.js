import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
                <h4 className="card-title mr-2">{`${room.name}`}</h4>
                <p className="card-text">{`(by ${room.admin})`}</p>
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
                            <p className="card-text m-0">{`${room.users[1]}`}</p>
                          </div>
                          :
                          ""
                      }
                  </div>
                  :
                  ""
              }
              {
                room.users.length === 2 ?
                <button style={{
                  backgroundColor: '#red',
                  borderRadius: '20px',
                  width: '80px',
                  height: '40px',
                  color: 'black',
                  border: '3px solid black'
                }} className="btn btn-danger">Full</button>
                :
              <button style={{
                backgroundColor: '#ffc107',
                borderRadius: '20px',
                width: '80px',
                height: '40px',
                color: 'black',
                border: '3px solid black'
              }} onClick={() => handleJoin(username, room.name)}>Join</button>
              }
            </div>
            </div>
          </div>
        </div>
      )
  ))
}

export default RoomCard