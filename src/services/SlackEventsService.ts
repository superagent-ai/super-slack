import { generateSlackSignature, slack } from "../utils";
import Express from "express";
// import fetch from "node-fetch";

interface Event {
  ts: string;
  text: string;
  channel: string;
  event_ts: string;
  thread_ts?: string;
}

class SlackEventsService {
  async appMention(req: Express.Request, res: Express.Response) {
    const event = req.body.event as Event;
    const { channel, ts } = event;

    try {
      const message = await slack.chat.postMessage({
        channel,
        thread_ts: ts,
        text: "I'm thinking...",
      });

      const sendMessageEndpointUrl = `${req.protocol}://${req.hostname}/send-message`;

      // send message in background, this is for slack's 3 second response time limit
      const sendMessageBody = JSON.stringify({
        event: {
          channel,
          thread_ts: message.message.thread_ts,
          ts: message.message.ts,
          text: event.text,
        },
      });

      const slackRequestTimestamp = req.headers[
        "x-slack-request-timestamp"
      ] as string;

      const slackSignature = generateSlackSignature(
        slackRequestTimestamp,
        sendMessageBody
      );
      // send acknowledgement request to slack that we recieved the message
      res.status(200).end();

      try {
        await fetch(sendMessageEndpointUrl, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-slack-request-timestamp": slackRequestTimestamp,
            "x-slack-signature": slackSignature,
          },
          body: sendMessageBody,
        });
        console.log("Request sent successfully!");
      } catch (error) {
        console.error("Error sending request:", error);
      }
    } catch (error) {
      if (error instanceof Error) {
        await slack.chat.postMessage({
          channel,
          thread_ts: ts,
          text: `<@${process.env.SLACK_ADMIN_MEMBER_ID}> Error: ${error.message}`,
        });
      }
    }
    return;
  }
}

export { SlackEventsService };
