import UploadPanel from "@/src/widgets/UploadPanel/UploadPanel";
import styles from "./page.module.css";

export default function Upload() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UploadPanel />
      </main>
    </div>
  );
}
