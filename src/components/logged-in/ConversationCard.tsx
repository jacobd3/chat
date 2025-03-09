import Message from "../../types/message";
import UserCard from "./UserCard";
import { AuthUserContext } from "../../providers/AuthUserProvider";
import { useContext } from "react";
import useFetchUser from "/src/hooks/useFetchUser";

interface Props {
  msg: Message;
}

export default function ConversationCard({ msg }: Props) {
  const [currentUser] = useContext(AuthUserContext);

  const user = useFetchUser(currentUser, msg);

  return (
    <div>
      <UserCard user={user} lastMessage={msg} clickable={true} />
    </div>
  );
}
