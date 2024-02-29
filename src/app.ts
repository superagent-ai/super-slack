import { App, LogLevel } from "@slack/bolt";
import { Events, SlackService } from "./services/SlackService";
import { SuperAgentService } from "./services/SuperAgentService";
import { isProduction } from "./utils/constants";
import "./utils/env";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,

  logLevel: isProduction ? LogLevel.ERROR : LogLevel.DEBUG,
  socketMode: true,
});

app.use(async ({ next }) => {
  await next();
});

const superAgentService = new SuperAgentService();
const slackService = new SlackService(app, superAgentService);

app.command("/help", slackService.helpCommand);
app.event(Events["APP_MENTION"], slackService.appMention);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
