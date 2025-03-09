import styles from "./UserCard.module.scss";
import User from "/src/types/user";
import Avatar from "./Avatar";
import { db } from "/src/firebase/firestore";
import Message from "/src/types/message";
import { getDoc, doc } from "firebase/firestore";
import { PickedFriendContext } from "/src/providers/PickedFriendProvider";
import { useContext } from "react";
import { useLocation } from "wouter";

interface Props {
  user: User;
  lastMessage?: Message;
  clickable?: boolean;
}

export default function UserCard({ user, lastMessage, clickable }: Props) {
  const [, setPickedFriend] = useContext(PickedFriendContext);
  const [location, setLocation] = useLocation();

  async function pickedFriendHandler() {
    if (!clickable) return;
    const docRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPickedFriend(docSnap.data() as User);
      }
      if (location != "/conversation") setLocation("conversation");
    } catch (error) {
      console.error("couldn't fetch picked friend", error);
    }
  }

  return (
    <div className={styles.container} onClick={pickedFriendHandler}>
      <div className={styles.avatar_wrapper}>
        <Avatar uid={user.uid} />
      </div>
      <div className={styles.card_details_wrapper}>
        <div className={styles.name_wrapper}>
          {user.firstName} {user.lastName}
        </div>
        {lastMessage ? (
          <div className={styles.message_wrapper}>
            <p>
              {lastMessage?.sender == user.uid ? null : "You: "}
              {lastMessage?.value}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
