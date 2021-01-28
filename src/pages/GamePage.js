import React, { useEffect, useState } from 'react'
import { Board, StatusBar, NavbarTop } from '../components'
import {useDispatch, useSelector} from 'react-redux'
import { makeMove, emptyHomes } from '../utils'
// import io from 'socket.io-client'
// import Peer from "simple-peer";
import { gameStart, readyToRematch, updateGameDetail } from '../redux/actions'
import {useParams} from 'react-router-dom'
import fullPageImage from '../assets/GameContainer.png'
import FinishAnnouncement from '../components/FinishAnnouncement'
import WaitingRoom from './WaitingRoom'
import Swal from 'sweetalert2'
// import microphone from '../Icons/microphone.svg'
// import microphonestop from '../Icons/microphone-stop.svg'
import VideoCall from '../components/WebRTC'
// import rootServer from '../config'

// const socket = io(rootServer)

const START_AMOUNT = 4

const intialState = {
  player: 0,
  board: emptyHomes(Array(14).fill(START_AMOUNT)),
  isOver: false,
  message: ''
}

// const Video = (props) => {
//   const ref = useRef();

//   useEffect(() => {
//       props.peer.on("stream", stream => {
//           ref.current.srcObject = stream;
//       })
//   }, []);

//   return (
//     <video style={{width: "170px"}} playsInline autoPlay ref={ref}></video>
//       // <StyledVideo playsInline autoPlay ref={ref} />
//   );
// }

const GamePage = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const {name} = useParams()
  const username = localStorage.username
  const roomDetail = useSelector(state => state.rooms.detail)
  const loading = useSelector(state => state.rooms.loading)
  const [turn, setTurn] = useState(false)
  // const [userID, setUserID] = useState("");
  // const [audioMuted, setAudioMuted] = useState(false)
  // const [stream, setStream] = useState();

  // const [peers, setPeers] = useState([]);
  // const socketRef = useRef();
  // const userVideo = useRef();
  // const peersRef = useRef([]);
  // const roomName = name;

  // useEffect(() => {
  //   socketRef.current = io.connect("http://localhost:4000");
  //   socketRef.current.on("yourID", (id) => {
  //     setUserID(id);
  //   });
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream)
  //       userVideo.current.srcObject = stream;
  //       let id
  //       socketRef.current.emit("inRoom", ({roomName, id}));
  //       socketRef.current.on("all users", (users) => {
  //         const peers = [];
  //         users.forEach((userID) => {
  //           const peer = createPeer(userID, socketRef.current.id, stream);
  //           peersRef.current.push({
  //             peerID: userID,
  //             peer,
  //           });
  //           peers.push({
  //             peerID: userID,
  //             peer,
  //           });
  //         });
  //         setPeers(peers);
  //       });

  //       socketRef.current.on("user joined", (payload) => {
  //         const peer = addPeer(payload.signal, payload.callerID, stream);
  //         peersRef.current.push({
  //           peerID: payload.callerID,
  //           peer,
  //         });

  //         const peerObj = {
  //           peer,
  //           peerID: payload.callerID,
  //         };

  //         setPeers((users) => [...users, peerObj]);
  //       });

  //       socketRef.current.on("leave-room-client", payload => {
  //         setPeers(payload)
  //         console.log(payload, "leave room client")
  //       })

  //       socketRef.current.on("receiving returned signal", (payload) => {
  //         const item = peersRef.current.find((p) => p.peerID === payload.id);
  //         item.peer.signal(payload.signal);
  //       });

  //       socketRef.current.on("user-disconnected", (id) => {
  //         console.log(id, "disconnected")
  //         const peerObj = peersRef.current.find((p) => p.peerID === id);
  //         if (peerObj) {
  //           peerObj.peer.destroy();
  //         }
  //         const peers = peersRef.current.filter((p) => p.peerID !== id);
  //         peersRef.current = peers;
  //         setPeers(peers);
  //       });
  //     });
  // }, []);

  // const createPeer = (userToSignal, callerID, stream) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socketRef.current.emit("sending signal", {
  //       userToSignal,
  //       callerID,
  //       signal,
  //     });
  //   });

  //   return peer;
  // };

  // const addPeer = (inComingSignal, callerID, stream) => {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socketRef.current.emit("returning signal", { signal, callerID });
  //   });

  //   peer.signal(inComingSignal);

  //   return peer;
  // };

  useEffect(() => {
    dispatch(updateGameDetail())
  }, [turn, dispatch])

  function clickHandler (i) {
    const gameDetail = {...roomDetail.gameState}
    const newState = makeMove(i)(gameDetail)
    setTurn(!turn)
    dispatch(gameStart(newState, name))
  }

  function HandleRematch () {
    dispatch(readyToRematch(intialState, name))
    // dispatch(gameStart(intialState, name))
  }

  function handleSurrender (username) {
    const player = roomDetail.users.findIndex(name => {
      return name === username
    })
    let message
    if(player === 1) {
      message = 'Player 1 wins!'
    } else {
      message = 'Player 2 wins!'
    }

    const newState = {...roomDetail.gameState}
    newState.isOver = true
    newState.message = message
    Swal.fire({
      title: 'Are you sure?',
      text: "You will lose",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(gameStart(newState, name))
      }
    })
  }

  // const handleMoveRoom = () => {
  //   let newUsers = peers.filter(peer => peer.peerID !== userID)
  //   const payload = {
  //     roomName,
  //     newUsers
  //   }
  //   socketRef.current.emit("leave-room", payload)
  //   history.push("/room")
  //   // console.log("haloo")
  // };

  // function toggleMuteAudio(){
  //   if(stream){
  //     setAudioMuted(!audioMuted)
  //     stream.getAudioTracks()[0].enabled = audioMuted
  //   }
  // }

  // let audioControl;
  // if(audioMuted){
  //   audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
  //     <img style={{width: "25px", position: "absolute", left: 0, bottom: 7}} src={microphonestop} alt="Unmute audio"/>
  //   </span>
  // } else {
  //   audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
  //     <img style={{width: "25px", position: "absolute", left: 0, bottom: 7}} src={microphone} alt="Mute audio"/>
  //   </span>
  // }

  return (
    <div className="bg-warning h-100" style={{  height: '170vh'}}>
    <NavbarTop username={username}></NavbarTop>
    <div className="App bg-warning h-100" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: '11vh',
      // backgroundColor:'blue',
      height: '100vh'
    }}>
      {
        !loading ?
        <h1>Loading</h1>
        :
        roomDetail.name && roomDetail.ready[0] === true && roomDetail.ready[1] === true  ?
        <>
        {/* <Header /> */}

        <StatusBar
          player={roomDetail.gameState.player}
          isOver={roomDetail.gameState.isOver}
          message={roomDetail.gameState.message}
        />
        <div className="fullPageImage">
          <img src={fullPageImage} alt="game-page" style={{
            maxWidth: '200vw',
            height: '90vh',
            width: '70vw'
          }}/>
        </div>

        <Board
          board={roomDetail.gameState.board}
          clickHandler={clickHandler}
          roomDetail={roomDetail}
        />

        <VideoCall></VideoCall>
        <button 
        onClick={() => handleSurrender(username)} 
        className="btn btn-dark text-warning" 
        style={{
          textAlign: 'center',
          fontFamily:"monospace",
          fontWeight: 'bold',
          fontSize: '1.2vw',
          position: 'absolute', 
          zIndex: 5,
          right: '18vw',
          bottom: '8vh',
          height: '8vw',
          width: '8vw',
          borderRadius: '100%',
          borderStyle: 'solid'
        }}>
          surrender
        </button>
        </>
        :
        <>
        <WaitingRoom></WaitingRoom>
        </>
      }
    </div>
      {
        roomDetail.name && roomDetail.gameState.isOver === true ?
        <div className="d-flex justify-content-center">
          <FinishAnnouncement handleRematch={HandleRematch} message={roomDetail.gameState.message}></FinishAnnouncement>
        </div>
        :
        ""
      }
    </div>
  );
}

export default GamePage;