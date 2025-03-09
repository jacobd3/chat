import { useState, useContext } from "react";
import Input from "/src/components/logged-in/input";
import SendBtn from "/src/components/logged-in/SendBtn";
import UserCard from "/src/components/logged-in/UserCard";
import User from "/src/types/user";
import styles from "./AddFriendPage.module.scss";
import { db } from "/src/firebase/firestore";
import { and, query, where, or, getDocs, collection } from "firebase/firestore";
import { AuthUserContext } from "/src/providers/AuthUserProvider";
import AddFriendBtn from "/src/components/logged-in/AddFriendBtn";

export default function AddFriendPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [currentUser] = useContext(AuthUserContext);

  async function searchUsersHandler(e: React.FormEvent) {
    if (currentUser) {
      function capitalize(name: string) {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
      }
      e.preventDefault();
      const usersRef = collection(db, "users");
      let isFullNameProvided;
      if (inputValue.split(" ").length == 2) isFullNameProvided = true;
      let userQuery;
      const noMyselfQuery = where("uid", "!=", currentUser.uid);
      if (isFullNameProvided) {
        userQuery = and(
          where("firstName", "==", capitalize(inputValue.split(" ")[0])),
          where("lastName", "==", capitalize(inputValue.split(" ")[1]))
        );
      } else {
        userQuery = or(
          where("firstName", "==", capitalize(inputValue)),
          where("lastName", "==", capitalize(inputValue))
        );
      }

      const usersSnap = await getDocs(
        query(usersRef, and(userQuery, noMyselfQuery))
      );

      const results: User[] = usersSnap.docs.map((doc) => {
        return doc.data() as User;
      });
      setSearchedUsers(results);
    }
  }

  return (
    <main style={{ backgroundColor: "rgb(25,25,25)" }}>
      <form onSubmit={searchUsersHandler} className={styles.form_wrapper}>
        <Input
          id="addFriend"
          placeholder="Find your friend..."
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <SendBtn />
      </form>
      <div className={styles.friends_wrapper}>
        {searchedUsers.map((user) => {
          if (!user) return null;
          return (
            <span className={styles.friend_wrapper} key={user?.uid}>
              <UserCard user={user} />
              {currentUser?.friends?.includes(user?.uid) ? (
                <></>
              ) : (
                <AddFriendBtn newFriendId={user?.uid} />
              )}
            </span>
          );
        })}
      </div>
    </main>
  );
}
