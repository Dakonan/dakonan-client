import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
const ModalLogin = () => {

  const [page, setPage] = useState('login')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePage = (input) => {
      setPage(input)
  }
  return (
      <>
      <Button style={{
          backgroundColor: '#eb8423',
          borderRadius: '20px',
          width: '100px',
          height: '55px',
          color: 'white',
          border: '3px solid black'
        }}
          onClick={handleShow}>
          Play
      </Button>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header className="bg-dark d-flex justify-content-">
              <div onClick={() => handlePage('login')} className={page === 'login' ? " text-danger w-50 text-center" : "text-white w-50 text-center"}>
                  LOGIN
              </div>
              <div onClick={() => handlePage('register')} className={page === 'register' ? "text-danger w-50 text-center" : "text-white w-50 text-center"}>
                  REGISTER
              </div>
          </Modal.Header>
          <Modal.Body>
              {
                  page === 'login' ?
                  <LoginPage></LoginPage>
                  :
                  <RegisterPage></RegisterPage>
              }
          </Modal.Body>
      </Modal>
      </>
  )
}

export default ModalLogin