import styles from "./App.module.scss";
import { Route } from "wouter";
import HomePage from "./pages/logged-out/HomePage";
import JoinPage from "./pages/logged-out/JoinPage";
import LoginPage from "./pages/logged-out/LoginPage";
import ConversationPage from "./pages/logged-in/ConversationPage";
import AddFriendPage from "./pages/logged-in/AddFriendPage";
import { useContext } from "react";
import { AuthUserContext } from "./providers/AuthUserProvider";
import Nav from "./components/logged-in/Nav";
import FriendsBar from "./components/logged-in/FriendsBar";
import { PickedFriendProvider } from "./providers/PickedFriendProvider";

function App() {
  const [currentUser] = useContext(AuthUserContext);

  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/login" component={LoginPage} />
      {currentUser != null ? (
        <PickedFriendProvider>
          <div className={styles.container}>
            <Nav /> <FriendsBar />
            <Route path="/conversation" component={ConversationPage} />
            <Route path="/add-friend" component={AddFriendPage} />
          </div>
        </PickedFriendProvider>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
