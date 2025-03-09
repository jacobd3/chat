import { Avatar as AvatarMui } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { PickedFriendContext } from "/src/providers/PickedFriendProvider";
import User from "/src/types/user";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "/src/firebase/storage";
import { getDoc, doc } from "firebase/firestore";
import { db } from "/src/firebase/firestore";
import { useLocation } from "wouter";

interface Props {
  uid: string;
  clickable?: boolean;
}

export default function Avatar({ uid, clickable }: Props) {
  const [img, setImg] = useState<string>("");
  const [, setPickedFriend] = useContext(PickedFriendContext);
  const [location, setLocation] = useLocation();

  async function pickedFriendHandler() {
    if (!clickable) return;
    const docRef = doc(db, "users", uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPickedFriend(docSnap.data() as User);
      }
      if (location != "conversation") setLocation("conversation");
    } catch (error) {
      console.error("couldn't fetch picked friend", error);
    }
  }

  useEffect(() => {
    async function getAvatar() {
      try {
        if (!uid) return;
        const url = await getDownloadURL(ref(storage, `${uid}/avatar`));
        setImg(url);
      } catch (error) {
        console.error("couldn't fetch avatar", error);
      }
    }
    getAvatar();
  }, [uid]);

  return (
    <AvatarMui
      onClick={pickedFriendHandler}
      src={img}
      sx={{ height: "70px", width: "70px", borderRadius: "999px" }}
    />
  );
}
