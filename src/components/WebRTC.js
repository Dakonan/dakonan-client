import React, {useEffect,useRef, useState} from 'react'
import io from 'socket.io-client'
import Peer from "simple-peer";
import microphone from '../Icons/microphone.svg'
import microphonestop from '../Icons/microphone-stop.svg'
import { useHistory, useParams } from 'react-router-dom';


const socket = io('https://dakonan-server.herokuapp.com')
// const socket = io('http://localhost:4000')

const Video = (props) => {
  const ref = useRef();
  const username = localStorage.username

  useEffect(() => {
      props.peer.on("stream", stream => {
          ref.current.srcObject = stream;
      })
  }, []);

  return (
      <video playsInline autoPlay ref={ref}></video>
      // <StyledVideo playsInline autoPlay ref={ref} />
  );
}


const VideoCall = () => {
  const {name} = useParams()
  const history = useHistory()
  const [userID, setUserID] = useState("");
  const [audioMuted, setAudioMuted] = useState(false)
  const [stream, setStream] = useState();

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomName = name;
  useEffect(() => {
      socketRef.current = io.connect("https://dakonan-server.herokuapp.com");
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
        config: {
          iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
        ]},
        stream
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
        stream
      });
  
      peer.on("signal", (signal) => {
        socketRef.current.emit("returning signal", { signal, callerID });
      });
  
      peer.signal(inComingSignal);
  
      return peer;
    };
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
      <div className="vid-player">
        <video muted ref={userVideo} autoPlay playsInline></video>
        {audioControl}
      </div>
      <div className="vid-enemy">
      {peers.map((peer) => {
        if (peer.peerID !== userID) {
          return <Video key={peer.peerID} peer={peer.peer} />;
        }
      })}
      </div>
    </>
    )
}

export default VideoCall
