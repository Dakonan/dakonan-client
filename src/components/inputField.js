import { useState } from 'react'
import { CustomButton } from '.'

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
        <input style={{borderRadius: '12px 0 0 12px'}} onChange={handleInputRoomName} type="text" required />
        {
          section === 'join' ?
          <CustomButton type="submit" className="btn-dark" style={{borderRadius: '0px 12px 12px 0px', backgroundColor: '#073b4c'}}>Search</CustomButton>
          :
          <CustomButton type="submit" className="btn-warning" style={{borderRadius: '0px 12px 12px 0px', backgroundColor: '#ffc107'}}>Create Room</CustomButton>
        }
      </form>
    </div>
  )
}

export default InputField