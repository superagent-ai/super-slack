## SuperBot for Slack

SuperBot for Slack is a powerful Slack bot that integrates with SuperAgent AI. It's developed using TypeScript and can be easily deployed using AWS Lambda functions or any other containerized environment using Docker.

![SuperBot Example](./public/assets/example-slack.png)

### Deployment Guide

Follow these step-by-step instructions to deploy SuperBot for Slack:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/superagent-ai/slack-bot
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Copy the `.env.example` file and rename it to `.env`. Fill in the following environment variables:

   - `SUPERAGENT_AGENT_ID` or `SUPERAGENT_WORKFLOW_ID`: ID of your SuperAgent AI agent or workflow.
   - `SUPERAGENT_API_BASE_URL`: Base URL for the SuperAgent API.
   - `SLACK_SIGNING_SECRET`: Signing secret of your Slack app.
   - `SLACK_BOT_TOKEN`: Bot token of your Slack app.

   #### Superagent Environment Variables:
   - Create a workflow on the [Superagent workflows page](https://beta.superagent.sh/workflows).
   - Add your Workflow ID as `SUPERAGENT_WORKFLOW_ID` in .env
   - Create a new API key on the [Superagent API Keys page](https://beta.superagent.sh/settings/api-keys) and 
   - Add the API Key as `SUPERAGENT_API_KEY` in .env

  #### Slack Environment Variables:
   - Create the Slack App
      - Create a Slack app on the [Slack API page](https://api.slack.com/apps?new_app=1).
      - `From App Manifest` --> Select your Workspace --> Copy the manifest.yaml file's content in our GitHub repo and paste it to Slack's code editor
   - Go to `Basic Information` -> Copy & Add the secret as `SLACK_SIGNING_SECRET` to `.env`.
   - Install the app to your workspace.
   - Go to `OAuth & Permissions` --> Copy the `Bot User OAuth Token` and add it as `SLACK_BOT_TOKEN` in .env
   - Go back to Slack 
   - Click on your Profile picture --> Profile --> Click on 3 dots (in the right panel) --> Copy member ID 
   - Add the member ID to .env as `SLACK_ADMIN_MEMBER_ID`

4. **Deployment:**
   - Install Serverless:
     ```bash
     npm install -g serverless
     ```
   - Make sure you have configured AWS profile. [See Docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/prerequisites.html)  
   - Deploy:
     ```bash
     serverless deploy
     ```

5. **Setting Up Slack Events:**
   - After successful deployment, copy the `/events` endpoint URL.
   - Enable events in Slack's `Event Subscriptions`.
   - Subscribe to `app_mention` events and set the Request URL to the Lambda URL.
   - Create a new slash command `/help` and set the Request URL to the Lambda URL ending with `/commands`.
