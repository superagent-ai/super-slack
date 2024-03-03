import { SlackCommandsService } from "../services";

import Express from "express";

const commandsService = new SlackCommandsService();

async function commandsController(req: Express.Request, res: Express.Response) {
  const body = req.body;

  if (body.command === "/help") {
    await commandsService.help(req, res);
  }

  return res.send("OK").status(200);
}

export { commandsController };
