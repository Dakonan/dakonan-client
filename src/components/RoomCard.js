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
        history.push(`/lobby/${roomName}`)
    }
    
    return (
        rooms.map((room, index) => (
            <div key={index} class="card mb-3" >
                <div class="row no-gutters">
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{`Room Name: ${room.name}`}</h5>
                        <p class="card-text">{`admin ${room.admin}`}</p>
                        {
                            room.users.length > 0 ?
                            <div>
                                <p className="card-text">{`player1: ${room.users[0]}`}</p>
                                {
                                    room.users.lengt > 1 ?
                                    <p className="card-text">{`player2: ${room.users[1]}`}</p>
                                    :
                                    ""
                                }
                            </div>
                            :
                            ""
                        }
                        <button onClick={() => handleJoin(username, room.name)}>Join</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    ))
}

export default RoomCard