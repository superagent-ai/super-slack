<div align="center">
	<img width="100px" src="https://github.com/homanp/superagent/assets/2464556/eb51fa38-4a2a-4c41-b348-d3c1abc04234" />
	<h1>SuperSlack</h1>
	<p>
		<b>SuperBot for Slack is a powerful Slack bot that integrates with SuperAgent AI..</b>
	</p>
</div>

## Deployment Guide

Follow these step-by-step instructions to deploy SuperBot for Slack:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/superagent-ai/super-slack
   ```

2. **Set Up Environment Variables:**
   Copy the `.env.example` file and rename it to `.env`. Fill in the environment variables:

   - `SUPERAGENT_AGENT_ID` or `SUPERAGENT_WORKFLOW_ID`: ID of your SuperAgent AI agent or workflow.
   - `SUPERAGENT_API_BASE_URL`: Base URL for the SuperAgent API.
   - `SUPERAGENT_API_KEY`: Superagent API Key.
   - `SLACK_SIGNING_SECRET`: Signing secret of your Slack app.
   - `SLACK_BOT_TOKEN`: Bot token of your Slack app.

   #### Superagent Environment Variables:
   - Create a workflow on the [Superagent workflows page](https://beta.superagent.sh/workflows).
   - Add your Workflow ID as `SUPERAGENT_WORKFLOW_ID` in .env
   - Create a new API key on the [Superagent API Keys page](https://beta.superagent.sh/settings/api-keys) and 
   - Add the API Key as `SUPERAGENT_API_KEY` in .env

   #### Slack Environment Variables:
   - Create a Slack app on the [Slack API page](https://api.slack.com/apps?new_app=1) --> `From App Manifest` --> Select your Workspace --> Copy the [manifest.yaml](https://github.com/superagent-ai/super-slack/blob/main/manifest.yaml) and paste it to Slack's code editor
   - Go to `Basic Information` -> Copy & Add the secret as `SLACK_SIGNING_SECRET` to `.env` --> Click `Install To Workspace` button
   - Go to `OAuth & Permissions` --> Copy the `Bot User OAuth Token` and add it as `SLACK_BOT_TOKEN` in .env
   - OPTIONAL: Go Back to Slack --> Click on your Profile picture --> Profile --> Click on 3 dots (in the right panel) --> Copy member ID 
   & add it as `SLACK_ADMIN_MEMBER_ID` in .env

3. **Setting Up Slack Events:**
   - After successful deployment, copy the `https://<your_deployment>/events` endpoint URL.
   - Go to `Event Subscriptions` and set `Request URL` to your deployment URL.
   - Go to `Slash Commands`, click edit button of `/help` command and set `Request URL` to your `https://<your_deployment>/commands` URL. 

## Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/superagent-ai/super-slack)

## Deploy to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/q14UEX)

## Deploy on AWS
<a href="./docs/deploy/aws-lambda.md">
  <img src="./public/assets/aws-lambda.svg" alt="AWS Lambda Icon">
</a>

## Deploy using Docker
Build and deploy the Docker image using the following command:

```bash
docker build -t super-slack .
docker run -p 8000:8000 super-slack
```
