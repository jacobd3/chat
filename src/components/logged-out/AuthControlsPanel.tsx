import styles from "./AuthPanels.module.scss";
import AuthBtn from "./AuthBtn";
import { Link } from "wouter";

interface AuthBtn {
  caption: string;
}

export default function AuthControlsPanel() {
  return (
    <div className={styles.container}>
      <h1>Messages</h1>
      <div className={styles.btns_container}>
        <Link href="/login">
          <AuthBtn caption="Login" />
        </Link>
        <Link href="/join">
          <AuthBtn caption="Join" />
        </Link>
      </div>
    </div>
  );
}
