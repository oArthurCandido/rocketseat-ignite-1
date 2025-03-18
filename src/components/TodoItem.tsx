import { use, useEffect, useState } from "react";
import styles from "./TodoItem.module.css";
import { Task } from "./types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isSkelleton?: boolean;
  expirationDate?: string;
}

export const TodoItem = ({
  task,
  isSkelleton,
  onToggle,
  onDelete,
  expirationDate,
}: TodoItemProps) => {
  const [isExpired, setIsExpired] = useState(false);
  const [alarmIsSet, setAlarmIsSet] = useState(false);

  const checkAlarms = () => {
    if (task.alarmDateTime) {
      const alarmTime = new Date(task.alarmDateTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = alarmTime - currentTime;
      if (timeDifference > 0 && !alarmIsSet) {

        setTimeout(() => {
          setAlarmIsSet(true);
          new Notification("Lembrete", {
            body: `É hora de: ${task.content}`,
          });
        }, timeDifference);
      } else if (timeDifference <= 0 && !task.completed) {
        setIsExpired(true);
      }
    }
  };

  const formattedDate = expirationDate
    ? format(new Date(expirationDate), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: ptBR,
      })
    : "";

  useEffect(() => {
    // check if permission is granted
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    
    checkAlarms();
  }, [alarmIsSet]);


  return (
    <article
      className={`${styles.task} ${task.completed ? styles.completed : ""} ${
        !task.completed && isExpired ? styles.expired : ""
      }`}
    >
      <button
        className={styles.checkButton}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <div className={styles.check} />
      </button>
      <p className={styles.content}>{task.content}</p>
      {task.alarmDateTime && (
        <time
          className={styles.expiration}
          dateTime={task.alarmDateTime}
          title={task.alarmDateTime}
        >
          {isExpired ? "Venceu em: " : "Vence em: "} {formattedDate}
        </time>
      )}
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <div className={styles.trash} />
      </button>
    </article>
  );
};
