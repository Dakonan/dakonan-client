import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createRoom, updateRoom } from '../redux/actions'
import RoomList from '../components/RoomList'
import JoinBox from '../components/JoinBox'
import { useHistory } from 'react-router-dom'
const Room = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const username = useSelector(state => state.players.name)
    // let rooms = useSelector(state => state.rooms.data)
    useEffect(() => {
        dispatch(updateRoom())
    },[dispatch])

    const handleCreateRoom = (roomName) => {
        let payload = {
            roomName,
            username
        }
        dispatch(createRoom(payload))
        history.push(`/game/${roomName}`)
    }

    return (
        <div className="container">
            <h4>{`hi ${username}`}</h4>

            <div className="container room-body">
                <div className="row">
                    <div className='col-4'>
                        <JoinBox></JoinBox>
                    </div>
                    <div className="col-8">
                        <RoomList handleCreateRoom={handleCreateRoom}></RoomList>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Room