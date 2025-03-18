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

// export const TodoItem = ({
//   task,
//   isSkelleton,
//   onToggle,
//   onDelete,
//   expirationDate,
// }: TodoItemProps) => {
//   const [isExpired, setIsExpired] = useState(false);
//   const [alarmIsSet, setAlarmIsSet] = useState(false);

//   const checkAlarms = () => {
//     if (task.alarmDateTime) {
//       const alarmTime = new Date(task.alarmDateTime).getTime();
//       const currentTime = new Date().getTime();
//       const timeDifference = alarmTime - currentTime;
//       if (timeDifference > 0 && !alarmIsSet) {

//         setTimeout(() => {
//           setAlarmIsSet(true);
//             new Notification("Lembrete", {
//             body: `É hora de: ${task.content}`,
//             data: { url: window.location.href },
//             }).onclick = function(event) {
//             event.preventDefault(); // prevent the browser from focusing the Notification's tab
//             window.open(this.data.url, "_blank");
//             };
//         }, timeDifference);
//       } else if (timeDifference <= 0 && !task.completed) {
//         setIsExpired(true);
//       }
//     }
//   };

//   const formattedDate = expirationDate
//     ? format(new Date(expirationDate), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
//         locale: ptBR,
//       })
//     : "";

//   useEffect(() => {
//     // check if permission is granted
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
    
//     checkAlarms();
//   }, [alarmIsSet]);

export const TodoItem = ({
  task,
  isSkelleton,
  onToggle,
  onDelete,
  expirationDate,
}: TodoItemProps) => {
  const [isExpired, setIsExpired] = useState(false);
  const [alarmIsSet, setAlarmIsSet] = useState(false);

  useEffect(() => {
    // ✅ Registra o Service Worker se ainda não estiver registrado
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registrado:", registration))
        .catch((error) => console.error("Erro ao registrar o Service Worker:", error));
    }

    // ✅ Solicita permissão para notificações se ainda não tiver sido concedida
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permissão concedida para notificações.");
        }
      });
    }
  }, []);

  useEffect(() => {
    const checkAlarms = () => {
      if (task.alarmDateTime) {
        const alarmTime = new Date(task.alarmDateTime).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = alarmTime - currentTime;

        if (timeDifference > 0 && !alarmIsSet) {
          navigator.serviceWorker.ready.then((registration) => {
            if (registration.active) {
              registration.active.postMessage({
                type: "SET_ALARM",
                task: {
                  content: task.content,
                  alarmDateTime: task.alarmDateTime,
                  url: window.location.href,
                },
              });
            }
            setAlarmIsSet(true);
          });
        } else if (timeDifference <= 0 && !task.completed) {
          setIsExpired(true);
        }
      }
    };

    checkAlarms();
  }, [task, alarmIsSet]);

  const formattedDate = expirationDate
    ? format(new Date(expirationDate), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: ptBR,
      })
    : "";


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
