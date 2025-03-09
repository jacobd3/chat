import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firestore";
import User from "../types/user";
import Message from "../types/message";

export default function useFetchUser(currentUser: User | null, msg: Message) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    uid: "",
    email: "",
  });

  useEffect(() => {
    let userRef;
    async function getUser() {
      if (currentUser?.uid == msg.sender) {
        userRef = doc(db, "users", msg.receiver);
      } else {
        userRef = doc(db, "users", msg.sender);
      }

      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    }
    getUser();
  }, [currentUser, msg]);

  return user;
}
