import { io } from "socket.io-client";

export const initsocket = async () => {
    const options = {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
       
    };

    return io("http://localhost:5000", options);
};
