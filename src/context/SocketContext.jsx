import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Reemplaza con la URL de tu servidor Express/Node
    const newSocket = io('http://localhost:5000', {
      autoConnect: true,
    });

    setSocket(newSocket);

    // Limpieza al desmontar la app
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
