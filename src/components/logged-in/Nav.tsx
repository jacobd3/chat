import { doSignOut } from "/src/firebase/auth";
import { useLocation } from "wouter";
import { useContext } from "react";
import { AuthUserContext } from "/src/providers/AuthUserProvider";
import Avatar from "./Avatar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Nav.module.scss";

export default function Nav() {
  const [currentUser] = useContext(AuthUserContext);
  const [location, setLocation] = useLocation();

  return (
    <nav>
      <div className={styles.buttons_wrapper}>
        <IconButton
          sx={{ color: "white", justifySelf: "start", padding: "0" }}
          size="large"
          onClick={() => {
            if (location == "/conversation") {
              setLocation("/add-friend");
            } else {
              setLocation("/conversation");
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles.auth_wrapper}>
        {currentUser ? <Avatar uid={currentUser.uid} /> : null}
        <button
          onClick={() => {
            doSignOut();
            setLocation("/");
          }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
