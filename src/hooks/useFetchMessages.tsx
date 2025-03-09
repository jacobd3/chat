import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Message from "../types/message";
import {
  and,
  where,
  query,
  orderBy,
  collection,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import User from "../types/user";

function useFetchMessages(currentUser: User | null, pickedFriend: User | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    setMessages([]);
  }, [pickedFriend]);

  useEffect(() => {
    async function fetchMessages() {
      if (!pickedFriend || !currentUser) return null;
      const messagesRef = collection(db, "messages");
      const q = query(
        messagesRef,
        and(
          where("receiver", "in", [pickedFriend.uid, currentUser.uid]),
          where("sender", "in", [pickedFriend.uid, currentUser.uid])
        ),
        orderBy("timestamp", "desc"),
        limit(10)
      );
      try {
        console.log("fetch");
        const messagesSnap = await getDocs(q);

        const results: Message[] = messagesSnap.docs.map((doc) => {
          return doc.data() as Message;
        });
        setMessages(results);
      } catch (error) {
        console.error("An error with fetching messages occured", error);
      }
    }
    async function fetchMoreMessages() {
      if (!pickedFriend || !currentUser) return null;
      const messagesRef = collection(db, "messages");
      const q = query(
        messagesRef,
        and(
          where("receiver", "in", [pickedFriend.uid, currentUser.uid]),
          where("sender", "in", [pickedFriend.uid, currentUser.uid])
        ),
        orderBy("timestamp", "desc"),
        startAfter(messages[messages.length - 1]?.timestamp),
        limit(10)
      );
      try {
        const messagesSnap = await getDocs(q);
        console.log("fetch more");
        const results: Message[] = messagesSnap.docs.map((doc) => {
          return doc.data() as Message;
        });

        setMessages((prev) => {
          return [...prev, ...results];
        });
      } catch (error) {
        console.error("An error with fetching more messages occured", error);
      }
    }

    if (!inView && messages.length == 0) {
      fetchMessages();
    }

    if (inView && messages.length > 0) {
      fetchMoreMessages();
    }
  }, [currentUser, pickedFriend, inView]);

  return { messages, setMessages, ref };
}

export default useFetchMessages;
