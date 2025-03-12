import styles from "./TodoStats.module.css";

interface TodoStatsProps {
  totalTasks: number;
  completedTasks: number;
}

export const TodoStats = ({ totalTasks, completedTasks }: TodoStatsProps) => {
  return (
    <header className={styles.stats}>
      <div className={styles.created}>
        <h2 className={styles.createdTitle}>Tarefas criadas</h2>
        <span className={styles.counter}>{totalTasks}</span>
      </div>
      <div className={styles.completed}>
        <h2 className={styles.completedTitle}>Concluídas</h2>
        <span className={styles.counter}>
          {completedTasks} de {totalTasks}
        </span>
      </div>
    </header>
  );
};
