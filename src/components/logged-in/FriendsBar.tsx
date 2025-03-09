import styles from "./FriendsBar.module.scss";
import { AuthUserContext } from "/src/providers/AuthUserProvider";
import Avatar from "./Avatar";
import ConversationCard from "./ConversationCard";
import { useContext } from "react";
import useFetchMessages from "/src/hooks/useFetchLastMessages";

export default function FriendsBar() {
  const [currentUser] = useContext(AuthUserContext);
  let { lastMessages } = useFetchMessages(currentUser);
  lastMessages = Object.values(lastMessages);

  return (
    <div className={styles.container}>
      <div className={styles.heading_wrapper}>
        <h1>Chats</h1>
      </div>
      <div className={styles.active_friends_wrapper}>
        {currentUser?.friends?.map((friendId: string) => {
          return <Avatar uid={friendId} clickable key={friendId} />;
        })}
      </div>
      <div className={styles.recent_friends_wrapper}>
        {lastMessages.map((msg) => {
          return <ConversationCard msg={msg} key={msg.id} />;
        })}
      </div>
    </div>
  );
}
