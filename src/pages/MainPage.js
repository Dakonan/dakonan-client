import React from 'react'
import ModalLogin from '../components/ModalLogin'


const MainPage = () => {
  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
      <div className="container d-flex justify-content-center align-items-center shadow-lg mx-auto" style={{height: '20vw', width: '30vw'}}>
        <div>
          <div className="d-flex justify-content-center">
            <h1>DAKONAN</h1>
          </div>
          <div className="d-flex justify-content-center"  >
            <button className="btn btn-warning mr-3 w-60">How To Play</button>
            <ModalLogin></ModalLogin>
              {/* <button onClick={() => history.push('/register')} className="btn btn-dark w-50">Play</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage