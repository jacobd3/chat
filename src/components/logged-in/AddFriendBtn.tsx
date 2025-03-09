import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase/firestore";
import { useContext } from "react";
import { AuthUserContext } from "../../providers/AuthUserProvider";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

interface Props {
  newFriendId: string;
}

export default function AddFriendBtn({ newFriendId }: Props) {
  const [currentUser] = useContext(AuthUserContext);

  async function addFriendHandler() {
    if (confirm("Are you sure you want to add new friend?")) {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          friends: arrayUnion(newFriendId),
        });
        alert("Friend has been added!");
      }
    }
  }

  return (
    <IconButton sx={{ color: "inherit" }} onClick={addFriendHandler}>
      <AddIcon />
    </IconButton>
  );
}
