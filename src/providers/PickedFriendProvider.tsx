import React, { createContext, useState } from "react";
import User from "../types/user";

type PickedFriendContextType = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

export const PickedFriendContext = createContext<PickedFriendContextType>();

interface Props {
  children: React.ReactNode;
}

export function PickedFriendProvider({ children }: Props) {
  const [pickedFriend, setPickedFriend] = useState<User | null>(null);

  return (
    <PickedFriendContext.Provider value={[pickedFriend, setPickedFriend]}>
      {children}
    </PickedFriendContext.Provider>
  );
}
