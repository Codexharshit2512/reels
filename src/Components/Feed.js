import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { AuthContext } from "../Context/AuthProvider";
import { database } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import UploadFile from "./UploadFile";
import "./Feed.css";
import Posts from "./Posts";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
function Feed() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const logout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  useEffect(() => {
    const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
    });
  }, [currentUser]);
  return (
    <div
      style={{
        background: "#ff77ff",
        height: "100vh",
      }}
    >
      {userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <Header userData={userData} />
          <div style={{ height: "1.5vh" }} />
          <UploadFile userData={userData} />

          <Posts userData={userData} />
          <div
            style={{ position: "fixed", top: "20px", right: "2rem" }}
            className="logout_btn"
          >
            <Button onClick={logout} variant="contained" color="primary">
              Logout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feed;
