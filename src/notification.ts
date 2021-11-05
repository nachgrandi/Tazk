import NotificationService from './core/service/notifications';
import app from './app';
import './database/mongodb.database';


const sentNotificationAsync = async () => {
  await NotificationService.fetchAndSentNotifications();
}

sentNotificationAsync();