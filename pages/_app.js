import Navbar from "../components/navbar/navbar";
import useUser from "../hooks/user";
import "../styles/globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const { username, uid, signedIn, username_set } = useUser();

  return (
    <UserContext.Provider value={{ uid, signedIn, username, username_set }}>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
