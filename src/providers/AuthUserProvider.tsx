import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firestore";
import User from "../types/user";

type AuthUserContextType = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

export const AuthUserContext = createContext<AuthUserContextType>();

interface Props {
  children: React.ReactNode;
}

export function AuthUserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        const docRef = doc(db, "users", user.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setCurrentUser(doc.data() as User);
          } else {
            console.log("no such document");
          }
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthUserContext.Provider>
  );
}
