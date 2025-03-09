import JoinPanel from "/src/components/logged-out/JoinPanel";
import styles from "./Pages.module.scss";

export default function JoinPage() {
  return (
    <div className={styles.container}>
      <JoinPanel />
    </div>
  );
}
