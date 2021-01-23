import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import io from "socket.io-client";
const socket = io("http://localhost:4000");

const WaitingRoom = () => {
  const history = useHistory();
  const roomDetail = useSelector((state) => state.rooms.detail);
  const username = useSelector((state) => state.players.name);
  const [startGame, setStartGame] = useState("false");

  const refVideo = useRef(HTMLVideoElement, document.createElement("video"));
  const startStreaming = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    refVideo.current.srcObject = stream;
  };

  const stopStreaming = async () => {
    refVideo.current.srcObject = null;
  };

  useEffect(() => {
    console.log("tet");
    socket.on("start-game", (data) => {
      console.log(data);
      history.push(`/game/`);
    });
  }, [startGame]);

  const start = async () => {
    socket.emit("startGame", roomDetail);
    setStartGame(true);
    history.push(`/game/${roomDetail.name}`);
  };

  return (
    <div className="container">
      <h1>lobby</h1>
      <h1>Hello World</h1>
      <button onClick={startStreaming}>Start Streaming</button>
      <button onClick={stopStreaming}>Stop Streaming</button>
      <video ref={refVideo} autoPlay playsInline></video>
      <p>{JSON.stringify(roomDetail)}</p>
      <div className="row">
        <div className="col">
          {/* <h1>{roomDetail.users[0]}</h1> */}
          {username === roomDetail.admin ? (
            <button onClick={() => start()}>Start</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
