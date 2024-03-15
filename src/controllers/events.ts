import { SlackEventsService } from "../services";
import Express from "express";

const eventsService = new SlackEventsService();

async function eventsController(req: Express.Request, res: Express.Response) {
  const body = req.body;
  const requestType = body?.type;
  console.log("RECIEVED REQUEST EVENTS", req.body);
  if (requestType === "url_verification") {
    return res.send({
      challenge: body.challenge,
    });
  }

  if (requestType === "event_callback") {
    const eventType = body?.event?.type;

    const isFollowUp =
      eventType === "message" && body?.event?.thread_ts && !body?.event?.bot_id;
    const isAppMention = eventType === "app_mention";

    if (isAppMention || isFollowUp)
      return await eventsService.answerQuestion(req, res);
  }

  return res.send("OK").status(200);
}

export { eventsController };
