import styles from "./AuthPanels.module.scss";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "/src/firebase/auth";
import { db } from "/src/firebase/firestore";
import { useLocation } from "wouter";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "wouter";
import { doSendEmailVerification } from "/src/firebase/auth";
import FileBtn from "../logged-in/FileBtn";
import storage from "/src/firebase/storage";
import { uploadBytes, ref } from "firebase/storage";

export default function JoinPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [, setLocation] = useLocation();

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      const imgRef = ref(storage, `${user.uid}/avatar`);
      uploadBytes(imgRef, file);
      alert("Account created! Verify your email before signing in");
      setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName,
      });
      setLocation("/login");
      doSendEmailVerification();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Welcome!</h1>
      <div className={styles.inputs_wrapper}>
        <AuthInput
          id="Email"
          placeholder="Stevie15k@gmail.com"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          id="First Name"
          placeholder="Steve"
          value={firstName}
          onChange={setFirstName}
        />
        <AuthInput
          id="Last Name"
          placeholder="Jones"
          value={lastName}
          onChange={setLastName}
        />
        <AuthInput
          id="Password"
          placeholder="***********"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <AuthInput
          id="Repeat Password"
          placeholder="***********"
          type="password"
          value={repeatPassword}
          onChange={setRepeatPassword}
        />
        <div className={styles.file_wrapper}>
          <FileBtn setFile={setFile} />
        </div>

        <AuthBtn caption="Join" />
      </div>
      <div className={styles.links_wrapper}>
        <p>
          Have an account?{" "}
          <b>
            <Link href="/login">Sign in</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
