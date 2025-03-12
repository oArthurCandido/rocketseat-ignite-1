"use client";
import { useEffect, useState } from "react";
import { TodoHeader } from "./TodoHeader";
import { TodoInput } from "./TodoInput";
import { TodoStats } from "./TodoStats";
import { TodoItem } from "./TodoItem";
import { TodoEmpty } from "./TodoEmpty";
import { SkelletonTodo } from "./Skelleton";
import { Task } from "./types";
import styles from "./Todo.module.css";

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [areTasksGetted, setAreTasksGetted] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    setTasks(parsedTasks);
    setAreTasksGetted(true);
  }, []);

  const saveTasks = (tasks: Task[]) => {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const createTask = (content: string, alarmDateTime: string | null = null) => {
    const newTasks = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        content,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        alarmDateTime,
      },
    ];
    saveTasks(newTasks);
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            updatedAt: new Date().toISOString(),
          }
        : task
    );
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    saveTasks(newTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const expiredTasks = tasks.filter(
    (task) =>
      task.alarmDateTime &&
      new Date(task.alarmDateTime).getTime() < new Date().getTime()
  );

  if (!areTasksGetted) {
    return <SkelletonTodo />;
  }

  if (tasks.length === 0) {
    return <TodoEmpty onCreateTask={createTask} />;
  }

  return (
    <main className={styles.todo}>
      <TodoHeader />
      <div className={styles.todo_container}>
        <TodoInput onCreateTask={createTask} />
        <section className={styles.tasks}>
          <TodoStats
            totalTasks={tasks.length}
            completedTasks={completedTasks}
          />
          <div className={styles.list}>
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                expirationDate={task.alarmDateTime ? task.alarmDateTime : ""}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Todo;
