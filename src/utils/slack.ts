import Express from "express";
import crypto from "crypto";
import { WebClient } from "@slack/web-api";

async function isValidSlackRequest(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const timestampString = req.headers["x-slack-request-timestamp"] as string;
  const timestamp = parseInt(timestampString, 10);
  const fiveMinutes = 60 * 5 * 1000; // 5 minutes in milliseconds

  const date = new Date(timestamp * 1000);

  const currentTime = new Date();

  const differenceInMilliseconds = currentTime.getTime() - date.getTime();

  if (differenceInMilliseconds > fiveMinutes) {
    console.log("Timestamp is too old");
    return res.status(400).send("Request is too old");
  }

  const receivedSignature = req.headers["x-slack-signature"];

  const expectedSignature = generateSlackSignature(
    timestampString,
    req.rawBody
  );

  if (expectedSignature !== receivedSignature) {
    console.log("WEBHOOK SIGNATURE MISMATCH");
    return res.status(400);
  }

  // signatures matched, so continue the next step
  console.log("WEBHOOK VERIFIED");
  next();
}

function generateSlackSignature(timestamp: string, body: string) {
  const base = `v0:${timestamp}:${body}`;
  const hash = crypto
    .createHmac("sha256", process.env.SLACK_SIGNING_SECRET!)
    .update(base)
    .digest("hex");

  return `v0=${hash}`;
}

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export { slack, isValidSlackRequest, generateSlackSignature };
