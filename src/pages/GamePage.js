import React from 'react'
import { useSelector } from 'react-redux'

const GamePage = () => {
    const roomDetail = useSelector(state => state.rooms.detail)
    return (
        <h1>{JSON.stringify(roomDetail)}</h1>
    )
}

export default GamePage