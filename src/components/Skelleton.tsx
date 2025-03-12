import { useEffect, useState } from "react";
import { TodoHeader } from "./TodoHeader";
import { TodoInput } from "./TodoInput";
import { TodoStats } from "./TodoStats";
import { TodoItem } from "./TodoItem";
import { TodoEmpty } from "./TodoEmpty";
import { Task } from "./types";
import styles from "./Todo.module.css";
import stylesItem from "./TodoItem.module.css";
import stylesInput from "./TodoInput.module.css";
import stylesStats from "./TodoStats.module.css";

type EmptyTask = {
  id: string;
};

export function SkelletonTodo() {
  const [tasks, setTasks] = useState<EmptyTask[]>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);

  return (
    <main className={styles.todo}>
      <TodoHeader />
      <div className={stylesInput.todo_container}>
        <form className={stylesInput.newTask}>
          <input
            type="text"
            className={stylesInput.input}
            placeholder="Adicione uma nova tarefa"
            aria-label="New task input"
          />
          <div className={stylesInput.datetime}>
            <input
              className={stylesInput.datetime_input}
              type="datetime-local"
              placeholder="Adicione uma data e hora"
              aria-label="New task datetime input"
              name="alarmDateTime"
            />
            <label
              htmlFor="alarmDateTime"
              className={stylesInput.datetime_label}
            >
              Alarme
            </label>
          </div>

          <button type="submit" className={stylesInput.createButton}>
            <span>Criar</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d55abb85c7124e82d0f758971a184a6956a65e9e1b59de5a135c0a47c667dff1?placeholderIfAbsent=true&apiKey=e8734ff1701b4fb0ba1c9c5e61f3823a"
              alt="Create task"
              className={stylesInput.createIcon}
            />
          </button>
        </form>
        <section className={stylesStats.tasks}>
          <header className={stylesStats.stats}>
            <div className={stylesStats.created}>
              <h2 className={stylesStats.createdTitle}>Tarefas criadas</h2>
              <span className={stylesStats.counter}>0</span>
            </div>
            <div className={stylesStats.completed}>
              <h2 className={stylesStats.completedTitle}>Concluídas</h2>
              <span className={stylesStats.counter}>0 de 0</span>
            </div>
          </header>
          <div className={styles.list}>
            {tasks.map((task) => (
              <article
                key={task.id}
                className={`${stylesItem.task} ${stylesItem.skelleton}`}
              >
                <div className={stylesItem.checkButton} />
                <div className={stylesItem.content} />
                <div className={stylesItem.deleteButton} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
