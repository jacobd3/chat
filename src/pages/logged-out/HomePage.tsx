import AuthControlsPanel from "/src/components/logged-out/AuthControlsPanel";
import styles from "./Pages.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <AuthControlsPanel />
    </div>
  );
}
