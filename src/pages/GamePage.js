import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import StatusBar from "../components/StatusBar";
import { useDispatch, useSelector } from "react-redux";
import { makeMove, emptyHomes } from "../utils";
import io from "socket.io-client";
import { gameStart, updateGameDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// const START_AMOUNT = 4

// const intialState = {
//   player: 0,
//   board: emptyHomes(Array(14).fill(START_AMOUNT)),
//   isOver: false,
//   message: ''
// }

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const GamePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams();
  // const [state, setState] = useState(Object.assign({}, intialState))
  const roomDetail = useSelector((state) => state.rooms.detail);
  const username = useSelector((state) => state.players.name);
  const loading = useSelector((state) => state.rooms.loading);
  const [turn, setTurn] = useState(false);
  const [userID, setUserID] = useState("");

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomName = name;
  const usersS = roomDetail?.users;
  const payload = {
    roomName,
    users: usersS,
  };

  useEffect(() => {
    console.log(username, "ini username")
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("yourID", (id) => {
      setUserID(id);
    });
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("inRoom", roomName);
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
    console.log("test");
    dispatch(updateGameDetail());
  }, [turn]);

  function clickHandler(i) {
    const board = { ...roomDetail.gameState };
    const newState = makeMove(i)(board);
    setTurn(!turn);
    dispatch(gameStart(newState, name));
  }

  const handleMoveRoom = () => {
    console.log("halo");
    socketRef.current.emit("inRoom", { name, userID });
    history.push("/room");
  };

  return (
    <div className="App">
      <h1>{userID}</h1>
      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer) => {
          if (peer.peerID !== userID) {
            return <Video key={peer.peerID} peer={peer.peer} />;
          }
        })}
        {/* <Video p/> */}
      </Container>
      <button onClick={handleMoveRoom}>Home</button>
      {!loading ? (
        <h1>Loading</h1>
      ) : roomDetail.name ? (
        <>
          <Header />

          <StatusBar
            player={roomDetail.gameState.player}
            isOver={roomDetail.gameState.isOver}
            message={roomDetail.gameState.message}
          />

          <Board
            board={roomDetail.gameState.board}
            clickHandler={clickHandler}
          />

          {/* <button onClick={resetHandler}>
          Reset
        </button> */}
        </>
      ) : (
        <h1>waiting for player 2</h1>
      )}
      <p>{JSON.stringify(roomDetail?.users)}</p>
    </div>
  );
};

export default GamePage;
