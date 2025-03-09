import styles from "./MessagesContainer.module.scss";
import MessageCard from "./MessageCard";
import Message from "/src/types/message";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface Props {
  messages: Message[];
  forwardRef?: React.ForwardedRef<HTMLInputElement>;
}

export default function MessagesContainer({ messages, forwardRef }: Props) {
  return (
    <div className={styles.container}>
      {messages.map((msg: Message, idx) => {
        if (idx === messages.length - 1) {
          return <MessageCard msg={msg} key={msg.id} forwardRef={forwardRef} />;
        }
        return <MessageCard msg={msg} key={msg.id} />;
      })}
    </div>
  );
}
