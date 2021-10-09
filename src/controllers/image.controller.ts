import { Request, Response } from 'express';
import { ImageService } from '../core/service/image/image.service';

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  if (!req.file?.path) {
    return res
      .status(400)
      .json({ msg: 'The image is necesary.' });
  }

  try {
    const data = await ImageService.uploadImage(req.file?.path);

    return res.status(201).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to upload the image.' });
  }
};

export const deleteImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  if (!req.body.publicId) {
    return res
      .status(400)
      .json({ msg: 'The image id is necesary.' });
  }

  try {
    const data = await ImageService.deleteImage(req.body.publicId);
    return res.status(201).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to delete the image.' });
  }
};