import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Editor } from "../Components/Editor";
import "../App.css";
import CopyToClipboard from "../Components/copyclip";
import { Clients } from "../Components/clients";
import { initsocket } from "../socket";
import toast from "react-hot-toast";

export const Editorpage = () => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef();
  const { roomid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Guest";

  const codeRef = useRef(""); // Store latest code

  
  const handlecallback=(e)=>{
    // console.log("latest coderef->>>>>>>>>>>>>>>>>>>>>>>>>>>",e);
    codeRef.current=e;


  }

  

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initsocket();


     


  
        socketRef.current.on("connect", () => {

        
        // console.log("Connected to server:", socketRef.current.id);
        socketRef.current.emit("join", { roomid, username });

        // Handle when a user joins
        socketRef.current.on("joined", ({ clients, username }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined.`);

            //required for syncing the code 
            socketRef.current.emit('sync-code',{
              code: codeRef.current,
              socketid:socketRef.current.id
            })

            



          }
          setClients(clients);
        
         
        });

        // Handle when a user leaves
        socketRef.current.on("disconnected", ({ socketid, username }) => {
          toast.success(`${username} left.`);
          setClients((prev) => prev.filter((client) => client.socketid !== socketid));
        });
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
      }
    };
  }, [roomid, username]);

  if (!location.state) {
    return navigate("/");
  }

  const leaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="editor-container">
      <div className="left-pannel">
        <div className="header-log">
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/92/55/15/1000_F_492551542_UiAoH0DyhL1ZHH9T24masCQZBa95DyW1.jpg"
            alt="logo"
          />
        </div>

        <div className="header-log">
          <hr style={{marginTop:"-200px"}}  />
          <h4 >Members</h4>
          {clients.map((client) => (
            <Clients key={client.socketid} initial={client.username.charAt(0)} username={client.username} />
          ))}
        </div>

        <div className="header-log footer">
          <CopyToClipboard roomid={roomid} />
          <button onClick={leaveRoom} className="edit-btn leave-btn">
            Leave
          </button>
        </div>
      </div>

      <div className="right-pannel">
        <Editor socketRef={socketRef} roomid={roomid} handlecallback={handlecallback} codeRef={codeRef}/>
      </div>
    </div>
  );
};
