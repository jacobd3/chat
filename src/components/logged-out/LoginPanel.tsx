import styles from "./AuthPanels.module.scss";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { doSignInWithEmailAndPassword, doSignOut } from "/src/firebase/auth";
import auth from "/src/firebase/auth";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword({ email, password });
      if (!auth.currentUser?.emailVerified) {
        doSignOut();
        alert("Verify your email!");
      } else {
        setLocation("/conversation");
      }
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Login</h1>
      <div className={styles.inputs_wrapper}>
        <AuthInput
          id="Email"
          placeholder="Stevie15k@gmail.com"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          id="Password"
          placeholder="***********"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <AuthBtn caption="submit"></AuthBtn>
      </div>
      <div className={styles.links_wrapper}>
        <p>
          Don't have an account?{" "}
          <Link href="/join">
            <b>Join now</b>
          </Link>
        </p>
        <p style={{ marginTop: 0 }}>
          Forgot password? <Link href=""></Link>Reset
        </p>
      </div>
    </form>
  );
}
