import { Request, Response } from 'express';
import TaskDto from '../core/dto/task.dto';
import TaskService from '../core/service/task';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  if (!isBodyValid(req.body)) {
    return res
      .status(400)
      .json({ msg: 'The field email, title and date are necesary.' });
  }

  try {
    await TaskService.createTask(req.body);

    return res.status(201).json({ msg: 'Task created successfully.' });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to create the task.' });
  }
};

export const getByDateRange = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params = req.query;
  if (!params || !params.email || !params.startDate || !params.endDate)
    return res
      .status(400)
      .json({ msg: 'The params email, start date and end date are necesary.' });

  
  try {
    const email: string = params.email as string;
    const startDate: Date = params.startDate as unknown as Date;
    const endDate: Date = params.endDate as unknown as Date;
    const data = await TaskService.getByDateRange(email, startDate, endDate);

    return res
      .status(201)
      .json({ 
        data: data
      });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to get tasks.' });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if ( !req.body || !isBodyValid(req.body) || !req.body._id ) {
    return res
      .status(400)
      .json({ msg: 'The field _id, email, title and dateCreated are necesary.' });
  }

  try {
    await TaskService.updateTask(req.body, req.body._id);

    return res.status(201).json({ msg: 'Task updated successfully.' });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to update the task.' });
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
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to delete the task.' });
  }
};

const isBodyValid = (tazk: TaskDto) => {

  if (!tazk.email || !tazk.title || !tazk.dateCreated) {
    return false;
  }

  return true;
};


