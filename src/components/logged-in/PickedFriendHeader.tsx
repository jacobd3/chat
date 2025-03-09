import styles from "./PickedFriendHeader.module.scss";
import { useContext } from "react";
import { PickedFriendContext } from "/src/providers/PickedFriendProvider";
import UserCard from "./UserCard";

export default function PickedFriendHeader() {
  const [pickedFriend] = useContext(PickedFriendContext);

  return (
    <div className={styles.container}>
      {pickedFriend ? <UserCard user={pickedFriend} /> : null}
    </div>
  );
}
