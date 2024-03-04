import { slack } from "../utils";
import Express from "express";
class SlackCommandsService {
  async help(req: Express.Request, res: Express.Response) {
    const authData = await slack.auth.test({
      token: process.env.SLACK_BOT_TOKEN,
    });
    const bot = await slack.users.profile.get({
      user: authData.user_id,
    });
    const botName = bot.profile.real_name;

    const helpMessage = `Hi there! I'm ${botName}. Just mention me and ask your question. For example: \`\`\`@${botName} What is the capital of United Kingdom?\`\`\``;

    return res.send(helpMessage).status(200);
  }
}

export { SlackCommandsService };
