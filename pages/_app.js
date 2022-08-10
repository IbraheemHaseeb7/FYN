import Navbar from "../components/navbar/navbar";
import useUser from "../hooks/user";
import "../styles/globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import useChat from "../hooks/chat";

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const { username, uid, signedIn, username_set, load } = useUser();
  const { room, notification } = useChat();

  return (
    <UserContext.Provider
      value={{
        uid,
        signedIn,
        username,
        username_set,
        load,
        room,
        notification,
      }}
    >
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
