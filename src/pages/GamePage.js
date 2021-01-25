import React, { Component } from 'react'
import Header from '../components/Header'
import Board from '../components/Board'
import StatusBar from '../components/StatusBar'

import { makeMove, emptyHomes } from '../utils'

import fullPageImage from '../assets/GameContainer.png'
import decoration from '../assets/decoration.png'



const START_AMOUNT = 4

const intialState = {
  player: 0,
  board: emptyHomes(Array(14).fill(START_AMOUNT)),
  isOver: false,
  message: ''
}

class GamePage extends Component {

  constructor () {
    super()
    this.state = Object.assign({}, intialState)
    this.clickHandler = this.clickHandler.bind(this)
    this.resetHandler = this.resetHandler.bind(this)
  }

  resetHandler () {
    this.setState(intialState)
  }

  clickHandler (i) {
    const newState = makeMove(i)(this.state)
    this.setState(newState)
  }

  render () {
    return (
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'blue',
        height: '100vh'
      }}>

        <StatusBar
          player={this.state.player}
          isOver={this.state.isOver}
          message={this.state.message}
        />

        <div className="decoration">
          <img src={decoration} />
        </div>

        <div className="fullPageImage" style={{
          // backgroundColor: 'red'
        }}>
          <img src={fullPageImage} style={{
            maxWidth: '1095px'
          }}/>
        </div>

        <Board
          board={this.state.board}
          clickHandler={this.clickHandler}
        />

        <button onClick={this.resetHandler} style={{
          position: 'absolute',
          bottom: '57px',
          zIndex: '5'
        }}>
          Reset
        </button>

      </div>
    );
  }
}

export default GamePage;
