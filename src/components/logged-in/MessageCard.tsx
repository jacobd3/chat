import styles from "./MessageCard.module.scss";
import Message from "/src/types/message";
import clsx from "clsx";
import { useContext } from "react";
import { AuthUserContext } from "/src/providers/AuthUserProvider";

interface Props {
  msg: Message;
  forwardRef?: React.ForwardedRef<HTMLInputElement>;
}

export default function MessageCard({ msg, forwardRef }: Props) {
  const [currentUser] = useContext(AuthUserContext);

  const containerStyle = clsx({
    [styles.container]: true,
    [styles.received_container]: msg.receiver == currentUser?.uid,
  });

  return (
    <div className={containerStyle} ref={forwardRef}>
      {msg.value}
    </div>
  );
}
