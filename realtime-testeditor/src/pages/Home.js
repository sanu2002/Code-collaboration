import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router";

import "../App.css";

export const Home = () => {
  const [roomid, setroomid] = useState();

  const [username, setusername] = useState(null);

  const naviagte = useNavigate();

  const joinbtn = () => {
    if (!roomid || !username) {
      toast.error("Please enter room id and username");
      return;
    }

    naviagte(`/editor/${roomid}`, {
      state: {
        username,
      },
    });

  };

  const createnewroom = (e) => {
    e.preventDefault();

    const id = uuidV4();
    setroomid(id);
    toast.success(`Room created `);

    console.log("createnewroom", id);
  };

  //This will helpo us to join roon wen we click the enter button
  const handleenterkey = (e) => {
    if (e.key === "Enter") {
      joinbtn();
    }
  };

  return (
    <div className="homePage-wrapper">
      <div className="form-wrapper">
        <img
          src="https://plus.unsplash.com/premium_photo-1661914978519-52a11fe159a7?q=40&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="code-sync-logo"
        />
        <h4 className="main-lable">Paste invitation Room Id </h4>
        <div className="inputgrp">
          <input
            type="text"
            className="inputbox"
            onChange={(e) => setroomid(e.target.value)}
            value={roomid}
            placeholder="Enter Room ID"
            onKeyUp={handleenterkey}
          />
          <input
            type="text"
            className="inputbox"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            onKeyUp={handleenterkey}
            placeholder="Username"
          />

          <button className="btn joinbtn" onClick={joinbtn}>
            Join
          </button>
          <span className="createinfo">
            If you dont have an invite then create &nbsp;
            <a onClick={createnewroom} href="/" className="createnewbtn">
              newroom
            </a>
          </span>
        </div>
      </div>

      <footer className="ft">
        <h4 className="fth">
          Built with 💛 by <a href="https://github.com/Sanu2002">@sanu</a>
        </h4>
        <p className="fthh">2025 CodeSync. All rights reserved</p>
      </footer>
    </div>
  );
};
