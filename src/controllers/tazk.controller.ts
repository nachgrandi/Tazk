import { Request, Response } from 'express';
import TaskDto from '../core/dto/task.dto';
import TaskService from '../core/service/task';
import BadRequestError from '../errors/badRequestError';
import BaseError from '../errors/baseError';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  if (!isBodyValid(req.body))
    throw new BadRequestError('The field email, title and date are necesary.');

  try {
    await TaskService.createTask(req.body, res.locals.userEmail);

    return res.status(201).json({ msg: 'Task created successfully.' });
  } catch (error) {
    
    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });

    return res
      .status(500)
      .json({ msg: 'Internal error occurred trying to create the task.' });
  }
};

export const getByDateRange = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params = req.query;
  if (!params || !params.startDate || !params.endDate)
    throw new BadRequestError('The params email, start date and end date are necesary.');

  
  try {
    const email: string = res.locals.userEmail;
    const startDate: Date = params.startDate as unknown as Date;
    const endDate: Date = params.endDate as unknown as Date;
    const category: string | null = params.category ? params.category as string : null;
    const data = await TaskService.getByDateRange(email, startDate, endDate, category);

    return res
      .status(201)
      .json({ 
        data
      });
  } catch (error) {
    
    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });
    
    return res
      .status(500)
      .json({ msg: 'Internal error occurred trying to get tasks.' });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if ( !req.body || !isBodyValid(req.body) || !req.body._id ) 
    throw new BadRequestError('The field _id, email, title and dateCreated are necesary.');

  try {
    await TaskService.updateTask(req.body, req.body._id);

    return res.status(201).json({ msg: 'Task updated successfully.' });
  } catch (error) {
    
    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });
    
    return res
      .status(500)
      .json({ msg: 'Internal error occurred trying to update the task.' });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  const params = req.query;
  if (!params || !params.id)
    return res
      .status(400)
      .json({ msg: 'The params id is necesary.' });

  try {
    const id: string = params.id as string;
    await TaskService.deleteTask(id);

    return res.status(201).json({ msg: 'Task deleted successfully.' });
  } catch (error) {
    
    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });
    
    return res
      .status(500)
      .json({ msg: 'Internal error occurred trying to delete the task.' });
  }
};

const isBodyValid = (tazk: TaskDto) => {

  if (!tazk.title || !tazk.date) {
    return false;
  }

  return true;
};


