import { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import {
  and,
  where,
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Message from "../types/message";
import User from "../types/user";

export default function useFetchMessages(currentUser: User | null) {
  const [lastMessages, setLastMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return null;
      const { friends } = currentUser;
      try {
        if (!friends) return;

        for (let i = 0; i < friends?.length; i++) {
          const q = query(
            collection(db, "messages"),
            and(
              where("sender", "in", [currentUser.uid, friends[i]]),
              where("receiver", "in", [currentUser.uid, friends[i]])
            ),
            orderBy("timestamp", "desc"),
            limit(1)
          );

          onSnapshot(q, (querySnapshot) => {
            let message = {};
            let friend;
            querySnapshot.docs.forEach((msg) => {
              const data = msg.data();
              if (data.sender == currentUser.uid) {
                friend = data.receiver;
              } else {
                friend = data.sender;
              }
              message = { [friend]: data };
            });
            setLastMessages((prev) => {
              return { ...prev, ...message };
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentUser]);
  return { lastMessages, setLastMessages };
}
