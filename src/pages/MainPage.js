import React from 'react'
import { ModalLogin, AnchorWrapper } from '../components'
import { motion } from 'framer-motion'
import man from '../assets/man.png'
import logo from '../assets/logo.png'
import fire from '../assets/fire.gif'
import HowToPlay from '../components/HowToPlay'


const MainPage = () => {
  return (
  <>
    <section>
      <img src={fire} className="fire" />
      <div className="circle"></div>
      <header className='headerMainPage'>
        <a href="#"><img src={logo} className="logo"/></a>
        <ul>
          <li><AnchorWrapper><a href="#">
            <HowToPlay></HowToPlay>
            </a></AnchorWrapper></li>
          <li><AnchorWrapper><a href="#">Leader Board</a></AnchorWrapper></li>
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
  )
}

export default MainPage