import { useContext } from "react";
import PickedFriendHeader from "../../components/logged-in/PickedFriendHeader";
import MessageForm from "/src/components/logged-in/MessageForm";
import MessagesContainer from "/src/components/logged-in/MessagesContainer";
import { PickedFriendContext } from "/src/providers/PickedFriendProvider";
import { AuthUserContext } from "/src/providers/AuthUserProvider";
import useFetchMessages from "/src/hooks/useFetchMessages";

export default function ConversationPage() {
  const [pickedFriend] = useContext(PickedFriendContext);
  const [currentUser] = useContext(AuthUserContext);

  const { messages, setMessages, ref } = useFetchMessages(
    currentUser,
    pickedFriend
  );

  return (
    <>
      <main>
        <PickedFriendHeader />
        <MessagesContainer messages={messages} forwardRef={ref} />
        <MessageForm setMessages={setMessages} />
      </main>
    </>
  );
}
