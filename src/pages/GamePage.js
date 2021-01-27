import React, { useEffect, useState, useRef } from 'react'
import { Board, StatusBar, NavbarTop, FinishAnnouncement } from '../components'
import {useDispatch, useSelector} from 'react-redux'
import { makeMove, emptyHomes } from '../utils'
import io from 'socket.io-client'
import Peer from "simple-peer";
import { gameStart, readyToRematch, updateGameDetail } from '../redux/actions'
import {useParams, useHistory} from 'react-router-dom'
import fullPageImage from '../assets/GameContainer.png'
import WaitingRoom from './WaitingRoom'
import microphone from '../Icons/microphone.svg'
import microphonestop from '../Icons/microphone-stop.svg'

// const socket = io('https://dakonan-server.herokuapp.com')
const socket = io('http://localhost:4000')

const START_AMOUNT = 4

const intialState = {
  player: 0,
  board: emptyHomes(Array(14).fill(START_AMOUNT)),
  isOver: false,
  message: ''
}

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.on("stream", stream => {
          ref.current.srcObject = stream;
      })
  }, []);

  return (
    <video style={{width: "170px"}} playsInline autoPlay ref={ref}></video>
      // <StyledVideo playsInline autoPlay ref={ref} />
  );
}

const GamePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {name} = useParams()
  const username = localStorage.username
  const roomDetail = useSelector(state => state.rooms.detail)
  const loading = useSelector(state => state.rooms.loading)
  const [turn, setTurn] = useState(false)
  const [userID, setUserID] = useState("");
  const [audioMuted, setAudioMuted] = useState(false)
  const [stream, setStream] = useState();

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomName = name;

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("yourID", (id) => {
      setUserID(id);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)
        userVideo.current.srcObject = stream;
        let id
        socketRef.current.emit("inRoom", ({roomName, id}));
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("leave-room-client", payload => {
          setPeers(payload)
          console.log(payload, "leave room client")
        })

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user-disconnected", (id) => {
          console.log(id, "disconnected")
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (inComingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(inComingSignal);

    return peer;
  };

  useEffect(() => {
    dispatch(updateGameDetail())
  }, [turn])

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

  const handleMoveRoom = () => {
    let newUsers = peers.filter(peer => peer.peerID !== userID)
    const payload = {
      roomName,
      newUsers
    }
    socketRef.current.emit("leave-room", payload)
    history.push("/room")
    // console.log("haloo")
  };

  function toggleMuteAudio(){
    if(stream){
      setAudioMuted(!audioMuted)
      stream.getAudioTracks()[0].enabled = audioMuted
    }
  }

  let audioControl;
  if(audioMuted){
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img style={{width: "25px", position: "absolute", left: 0, bottom: 7}} src={microphonestop} alt="Unmute audio"/>
    </span>
  } else {
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img style={{width: "25px", position: "absolute", left: 0, bottom: 7}} src={microphone} alt="Mute audio"/>
    </span>
  }

  return (
    <>
    <NavbarTop username={username}></NavbarTop>
    <div className="App" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      // top: '4vh',
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
          <img src={fullPageImage} style={{
            maxWidth: '1095px',
            height: '90vh',
            width: '200vw '
          }}/>
        </div>

        <Board
          board={roomDetail.gameState.board}
          clickHandler={clickHandler}
          roomDetail={roomDetail}
        />
        {/* <p>{JSON.stringify(roomDetail)}</p> */}
        {/* <button onClick={resetHandler}>
          Reset
        </button> */}
        </>
        :
        <WaitingRoom></WaitingRoom>
      }
    </div>
    <div style={{position: "absolute", zIndex: 100, top: "-15px", width: "700px", display: "flex", justifyContent: "space-between"}}>
      <div>
        <video style={{width: "170px", marginRight: "300px"}} muted ref={userVideo} autoPlay playsInline></video>
        {audioControl}
      </div>
      {peers.map((peer) => {
        if (peer.peerID !== userID) {
          return <Video key={peer.peerID} peer={peer.peer} />;
        }
      })}
      {/* <Video p/> */}
    </div>
      {
        roomDetail.name && roomDetail.gameState.isOver == true ?
        <div className="d-flex justify-content-center">
          <FinishAnnouncement handleRematch={HandleRematch} message={roomDetail.gameState.message}></FinishAnnouncement>
        </div>
        :
        ""
      }
    </>
  );
}

export default GamePage;