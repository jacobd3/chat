import LoginPanel from "/src/components/logged-out/LoginPanel";
import styles from "./Pages.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginPanel />
    </div>
  );
}
