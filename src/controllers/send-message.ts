import { SuperAgentService } from "../services";
import { slack } from "../utils";
import Express from "express";

const superagentService = new SuperAgentService();

async function sendMessageController(
  req: Express.Request,
  res: Express.Response
) {
  const body = req.body;
  const event = body.event;

  console.log("RECIEVED REQUEST SEND MESSAGE", req.body);
  const { channel, ts, thread_ts } = event;

  try {
    const response = await superagentService.getAnswer(event.text, thread_ts);
    await slack.chat.update({
      channel,
      ts,
      text: response,
    });
  } catch (error) {
    await slack.chat.postMessage({
      channel,
      thread_ts,
      text: `<@${process.env.SLACK_ADMIN_MEMBER_ID}> Error: ${error}`,
    });
  }
  return res.send("OK").status(200);
}

export { sendMessageController };
