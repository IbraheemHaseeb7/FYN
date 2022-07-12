import Navbar from "../components/navbar/navbar";
import useUser from "../hooks/user";
import "../styles/globals.css";
import React from "react";
import useUsername from "../hooks/username";

export const UserContext = React.createContext({
  uid: null,
  signedIn: null,
  username: null,
});

function MyApp({ Component, pageProps }) {
  const { username, uid, signedIn } = useUser();
  // const { username } = useUsername();

  return (
    <UserContext.Provider value={{ uid, signedIn, username }}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
