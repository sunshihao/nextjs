import styles from "./loading.module.css";
// 全局loading
export default function Loading() {
  return (
    <div className={styles.loading_home}>
      <div className={`${styles.loading_home_2} ${styles.loading_home_text}`}>
        AI Chating...
      </div>
    </div>
  );
}
