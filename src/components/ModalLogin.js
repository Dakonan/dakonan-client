import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CustomButton, AnchorWrapper } from '.'
import { LoginPage, RegisterPage }from '../pages';

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
    <CustomButton 
      style={{
        backgroundColor: '#eb8423',
        borderRadius: '20px',
        width: '100px',
        height: '55px',
        color: 'white',
        border: '3px solid black'
    }}
      onClick={handleShow}
    >
        Play
    </CustomButton>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-dark d-flex" style={{borderRadius: '25px 25px 0 0'}}>
        <AnchorWrapper onClick={() => handlePage('login')} className={page === 'login' ? " text-danger w-50 text-center" : "text-white w-50 text-center"}>
          LOGIN
        </AnchorWrapper>
        <AnchorWrapper onClick={() => handlePage('register')} className={page === 'register' ? "text-danger w-50 text-center" : "text-white w-50 text-center"}>
          REGISTER
        </AnchorWrapper>
      </Modal.Header>
      <Modal.Body>
      { page === 'login' ? <LoginPage /> : <RegisterPage />}
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ModalLogin