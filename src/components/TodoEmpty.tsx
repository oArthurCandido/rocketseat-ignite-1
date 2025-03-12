"use client";
import { TodoHeader } from "./TodoHeader";
import { TodoInput } from "./TodoInput";
import styles from "./TodoEmpty.module.css";

interface TodoEmptyProps {
  onCreateTask: (content: string) => void;
}

export const TodoEmpty = ({ onCreateTask }: TodoEmptyProps) => {
  return (
    <main className={styles.container}>
      <TodoHeader />
      <div className={styles.content}>
        <TodoInput onCreateTask={onCreateTask} />
        <div className={styles.tasks}>
          <header className={styles.header}>
            <div className={styles.created}>
              <h2 className={styles.createdTitle}>Tarefas criadas</h2>
              <span className={styles.counter}>0</span>
            </div>
            <div className={styles.completed}>
              <h2 className={styles.completedTitle}>Concluídas</h2>
              <span className={styles.counter}>0</span>
            </div>
          </header>
          <div className={styles.empty}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/91d8171bbcfaf75d871a6a2bd3aa782548f9e7fb59e1c85b52a2e69f9d43500d?placeholderIfAbsent=true&apiKey=e8734ff1701b4fb0ba1c9c5e61f3823a"
              alt=""
              className={styles.emptyIcon}
              aria-hidden="true"
            />
            <div className={styles.emptyText}>
              <p className={styles.emptyTitle}>
                Você ainda não tem tarefas cadastradas
              </p>
              <p className={styles.emptyDescription}>
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
