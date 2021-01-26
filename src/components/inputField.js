import React, {useState} from 'react'

const InputField = ({handleSubmit, section}) => {
    const [newRoomName, setNewRoomName] = useState('')
    const handleInputRoomName = (e) => {
        const roomName = e.target.value
        setNewRoomName(roomName)
    }

    const handleInputSubmit = (e) => {
        e.preventDefault()
        handleSubmit(newRoomName)
    }
    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleInputSubmit}>
                <input onChange={handleInputRoomName} type="text" required />
                {
                    section === 'join' ?
                    <button type="submit" className="btn-dark">Search</button>
                    :
                    <button type="submit" className="btn-warning">Create Room</button>
                }
            </form>
        </div>
    )
}

export default InputField