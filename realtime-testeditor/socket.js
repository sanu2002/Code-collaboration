import { io } from "socket.io-client";

export const initsocket = async () => {
    const options = {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
    };

    return io(process.env.REACT_APP_BACKEND_URL, options);
};
