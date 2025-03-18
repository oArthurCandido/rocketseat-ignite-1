self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");
    return self.clients.claim();
  });
  
  // Ouve mensagens enviadas pelo app
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SET_ALARM") {
      const { task } = event.data;
  
      const alarmTime = new Date(task.alarmDateTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = alarmTime - currentTime;
  
      if (timeDifference > 0) {
        setTimeout(() => {
          self.registration.showNotification("Lembrete", {
            body: `É hora de: ${task.content}`,
            data: { url: task.url },
          });
        }, timeDifference);
      }
    }
  });
  
  // Abrir a URL da tarefa quando o usuário clicar na notificação
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    if (event.notification.data.url) {
      event.waitUntil(clients.openWindow(event.notification.data.url));
    }
  });
  