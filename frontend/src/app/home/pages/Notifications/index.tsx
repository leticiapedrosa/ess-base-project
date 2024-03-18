import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import styles from "./index.module.css";
import Button from '../../../../shared/components/Button';
import 'react-notifications/lib/notifications.css';

interface NotificationItem {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

interface FormData {
  email: string;
}

const Notification: React.FC<{ notification: NotificationItem }> = ({ notification }) => (
  <div className="notification">
    <p>{notification.sender} enviou uma mensagem</p>
    <p>{notification.message}</p>
    <p>Recebido em: {notification.timestamp.toLocaleString()}</p>
  </div>
);

const Home: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showNotification = (type: 'success' | 'error', message: string, sender: string) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, sender);
        break;
      case 'error':
        NotificationManager.error(message, 'Error');
        break;
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`http://localhost:5001/api/notification/get/${data.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (responseData.data === 'No unread messages') {
        // If no notifications, add the fictitious ones
        setNotifications([
          {
            id: '1',
            sender: 'Arthur',
            message: 'Oie! Tudo bem?',
            timestamp: new Date(),
          },
          {
            id: '2',
            sender: 'Ana',
            message: 'Boa tarde!',
            timestamp: new Date(),
          },
          {
            id: '3',
            sender: 'Jon',
            message: 'Não se esquece!',
            timestamp: new Date(),
          },
        ]);
        setMessage(responseData.data);
      } else {
        setNotifications(responseData);
      }
      // exibe todas notificações de uma vez da variavel notifications
      for (let i = 0; i < notifications.length; i++) {
        showNotification('success', notifications[i].message, notifications[i].sender);
      }
      //showNotification('success', 'Notifications loaded successfully');
    } catch (error) {
      console.error(error);
      // showNotification('error', 'Error loading notifications');
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Notifications</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("email")}
            placeholder="Email"
            className={styles.formInput}
          />
          {errors.email && (
            <span data-cy="input-name-error" className={styles.formError}>
              {String(errors.email.message)}
            </span>
          )}
        </div>
        <Button type="submit">Recover</Button>
        {message && <p>{message}</p>}
      </form>
      <div className={styles.formInputContainer}>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
      <NotificationContainer />
    </section>
  );
};

export default Home;
