import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {emitStartGame} from '../redux/actions/index'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

const WaitingRoom = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const roomDetail = useSelector(state => state.rooms.detail)
    const username = useSelector(state => state.players.name)
    const startGame = useSelector(state => state.rooms.start)
    
    useEffect(() => {
        if(startGame === true) {
            history.push(`/game/${roomDetail.name}`)
        }
    }, [startGame])
   
    const start = () => {
        dispatch(emitStartGame(roomDetail.name))
    }

    return (
        <div className="container">
            <h1>lobby</h1>
            <p>{JSON.stringify(roomDetail)}</p>
            <div className="row">
                <div className="col">
                    <button onClick={()=> start()}>Start</button>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom