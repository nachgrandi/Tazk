import { Request, Response } from 'express';
//import NotificationService from '../core/service/notifications';
import BaseError from '../errors/baseError';

export const sentNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    
    //await NotificationService.fetchAndSentNotifications();
  
    return res.status(201).json({ msg: 'All notifications were sent.' });
  } catch (error) {
    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });
    
    return res
        .status(500)
        .json({ msg: 'Internal error occurred trying to sent notifications.' });
  }

};