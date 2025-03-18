"use client";
import { useState } from "react";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
  onCreateTask: (content: string, dateTime: string) => void;
}

export const TodoInput = ({ onCreateTask }: TodoInputProps) => {
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDateTime, setNewTaskDateTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      onCreateTask(newTaskContent, newTaskDateTime ?  new Date(newTaskDateTime).toISOString() : '');
      setNewTaskContent("");
      setNewTaskDateTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newTask}>
      <input
        type="text"
        className={styles.input}
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
        placeholder="Adicione uma nova tarefa"
        aria-label="New task input"
      />
      <div className={styles.datetime}>
        <input
          className={styles.datetime_input}
          type="datetime-local"
          value={newTaskDateTime}
          onChange={(e) => setNewTaskDateTime(e.target.value)}
          placeholder="Adicione uma data e hora"
          aria-label="New task datetime input"
          name="alarmDateTime"
        />
        <label htmlFor="alarmDateTime" className={styles.datetime_label}>
          Alarme
        </label>
      </div>

      <button type="submit" className={styles.createButton}>
        <span>Criar</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d55abb85c7124e82d0f758971a184a6956a65e9e1b59de5a135c0a47c667dff1?placeholderIfAbsent=true&apiKey=e8734ff1701b4fb0ba1c9c5e61f3823a"
          alt="Create task"
          className={styles.createIcon}
        />
      </button>
    </form>
  );
};
