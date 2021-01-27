import React from 'react'
<<<<<<< HEAD
import { ModalLogin, AnchorWrapper } from '../components'
import { motion } from 'framer-motion'
=======
import ModalLogin from '../components/ModalLogin'
import LeaderBoard from '../components/LeaderBoard'

>>>>>>> 54fa77739c0902ffd411af7ba4cd3986ee2c334a
import man from '../assets/man.png'
import logo from '../assets/logo.png'
import fire from '../assets/fire.gif'


const MainPage = () => {
  return (
<<<<<<< HEAD
  <>
    <section>
      <img src={fire} className="fire" />
      <div className="circle"></div>
      <header className='headerMainPage'>
        <a href="#"><img src={logo} className="logo"/></a>
        <ul>
          <li><AnchorWrapper><a href="#">How to Play</a></AnchorWrapper></li>
          <li><AnchorWrapper><a href="#">Leader Board</a></AnchorWrapper></li>
          <li><AnchorWrapper><a href="#">About Us</a></AnchorWrapper></li>
        </ul>
      </header>
      <div className="content">
        <motion.div
          variants={{
            hover: { scale: 1.1 }
          }}
          whileHover="hover"
          className="textBox"
        >
          <h2>Bukan dakon biasa.<br/>Tapi <span>DAKONAN</span></h2>
          <p>Dakonan adalah board game digital yang cara mainnya terinspirasi dari permainan tradisional nusantara seperti congklak, dakon, dan mancala.</p>
          <ModalLogin></ModalLogin>
        </motion.div>
        <div className="imgBox">
            <img src={man} className="man" />
        </div>            
      </div>
    </section>
  </>
=======
    // <div className="container" style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
    //   <div className="container d-flex justify-content-center align-items-center shadow-lg mx-auto" style={{height: '20vw', width: '30vw'}}>
    //     <div>
    //       <div className="d-flex justify-content-center">
    //         <h1>DAKONAN</h1>
    //       </div>
    //       <div className="d-flex justify-content-center"  >
    //         <button className="btn btn-warning mr-3 w-60">How To Play</button>
    //         <ModalLogin></ModalLogin>
    //           {/* <button onClick={() => history.push('/register')} className="btn btn-dark w-50">Play</button> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <section>
        <img src={fire} class="fire" />
        <div class="circle"></div>
        <header className='headerMainPage'>
            <a href="#"><img src={logo} class="logo"/></a>
            <ul>
                <li><a href="#">How to Play</a></li>
                <li><a href="#"><LeaderBoard></LeaderBoard></a></li>
                <li><a href="#">About Us</a></li>
            </ul>
        </header>
        <div class="content">
            <div class="textBox">
                <h2>Bukan dakon biasa.<br/>Tapi <span>DAKONAN</span></h2>
                <p>Dakonan adalah board game digital yang cara mainnya terinspirasi dari permainan tradisional nusantara seperti congklak, dakon, dan mancala.</p>
                <ModalLogin></ModalLogin>
            </div>
            <div class="imgBox">
                <img src={man} class="man" />
            </div>            
        </div>
      </section>
    </>
>>>>>>> 54fa77739c0902ffd411af7ba4cd3986ee2c334a
  )
}

export default MainPage