import styles from "./TodoHeader.module.css";

export const TodoHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8b371d21b9376e8dac01350a6f6571048e4b1bc8c501a9f14e1526979764c1c?placeholderIfAbsent=true&apiKey=e8734ff1701b4fb0ba1c9c5e61f3823a"
          alt="Todo logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>
          <span className={styles.titleTo}>to</span>
          <span className={styles.titleDo}>do</span>
        </h1>
      </div>
    </header>
  );
};
