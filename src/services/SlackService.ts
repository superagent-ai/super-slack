import {
  App,
  Middleware,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";
import { StringIndexed } from "@slack/bolt/dist/types/helpers";
import { SuperAgentService } from "./SuperAgentService";

type CommandListener = Middleware<SlackCommandMiddlewareArgs, StringIndexed>;

type EventListener<EventType extends (typeof Events)[keyof typeof Events]> =
  Middleware<SlackEventMiddlewareArgs<EventType>, StringIndexed>;

export const Events = {
  APP_MENTION: "app_mention",
} as const;

export class SlackService {
  private app: App;
  private superAgentService: SuperAgentService;

  constructor(app: App, superAgentService: SuperAgentService) {
    this.app = app;
    this.superAgentService = superAgentService;
  }

  helpCommand: CommandListener = async ({ ack, say, body }) => {
    await ack();
    const authData = await this.app.client.auth.test();

    const bot = await this.app.client.users.profile.get({
      user: authData.user_id,
    });
    const botName = bot.profile.real_name;

    const helpMessage = `Hi there! I'm ${botName}. Just mention me and ask your question. For example: \`\`\`@${botName} What is the capital of United Kingdom?\`\`\``;

    await say({
      text: helpMessage,
      channel: body.channel_id,
    });
  };

  appMention: EventListener<(typeof Events)["APP_MENTION"]> = async ({
    event,
    say,
    client,
  }) => {
    const channelId = event.channel;
    const threadId = event.thread_ts ?? event.ts;
    const userInput = event.text.split(" ").slice(1).join(" ");

    if (!userInput.trim()) {
      await say({
        text: "Sorry, I can't process an empty message. Please provide your question after mentioning me.",
        channel: channelId,
        thread_ts: threadId,
      });
      return;
    }

    const message = await say({
      text: "I'm thinking...",
      channel: channelId,
      thread_ts: threadId,
    });

    const output = await this.superAgentService.getAnswer(userInput, threadId);

    await client.chat.update({
      channel: channelId,
      ts: message.ts,
      text: output,
    });
  };
}
