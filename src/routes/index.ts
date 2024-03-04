import express from "express";
import {
  eventsController,
  commandsController,
  sendMessageController,
} from "../controllers";

const router = express.Router();

router.post("/events", eventsController);
router.post("/commands", commandsController);
router.post("/send-message", sendMessageController);

export { router };
