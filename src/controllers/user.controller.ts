import { Request, Response } from "express";
import UserService from "../core/service/user/index";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: "Email not found." });
  }

  const isCreated = await UserService.createUser(req.body)

  if (!isCreated) {
    return res
      .status(500)
      .json({ msg: "A problem occurred trying to create the user." });
  }

  return res.status(201).json({ msg: "User created successfully." });
};
