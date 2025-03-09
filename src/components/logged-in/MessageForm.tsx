import styles from "./MessageForm.module.scss";
import Input from "./input";
import SendBtn from "./SendBtn";
import { useState, useContext, SetStateAction } from "react";
import { PickedFriendContext } from "/src/providers/PickedFriendProvider";
import { AuthUserContext } from "/src/providers/AuthUserProvider";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "/src/firebase/firestore";
import Message from "/src/types/message";

interface Props {
  setMessages: React.Dispatch<SetStateAction<Message[]>>;
}

export default function MessageForm({ setMessages }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [pickedFriend] = useContext(PickedFriendContext);
  const [currentUser] = useContext(AuthUserContext);

  async function sendMessageHandler(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue == "") return null;
    if (!pickedFriend || !currentUser) return null;

    const { uid: pickedFriendId } = pickedFriend;
    const { uid: currentUserId } = currentUser;

    try {
      const newMessageRef = doc(collection(db, "messages"));

      const message: Message = {
        id: newMessageRef.id,
        value: inputValue,
        receiver: pickedFriendId,
        sender: currentUserId,
        timestamp: new Date().getTime(),
      };
      await setDoc(newMessageRef, {
        ...message,
      });

      setMessages((prev) => {
        return [
          {
            id: newMessageRef.id,
            value: inputValue,
            receiver: pickedFriendId,
            sender: currentUserId,
            timestamp: new Date().getTime(),
          },
          ...prev,
        ];
      });
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.form_wrapper} onSubmit={sendMessageHandler}>
      <Input
        id="sendMessage"
        placeholder="Type your message..."
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <SendBtn />
    </form>
  );
}
