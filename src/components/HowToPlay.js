import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import howtoplays from '../assets/howtoplay.png'

const HowToPlay = () => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true)


return (
<>
  <div className="anchor-wrapper" onClick={handleShow}>
    <h5>How To Play</h5>
  </div>

  <Modal show={show} onHide={handleClose}>
  <div class="howtoplay">
      <img src={howtoplays} class="img-fluid" style={{
        margin: '0',
        padding: '0',
        border: '5px solid',
        borderRadius: '1rem',
        height: '90vh',
        width: '2000vh'
      }}/>
  </div>
  </Modal>
</>
)
}

export default HowToPlay