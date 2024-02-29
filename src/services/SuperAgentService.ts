export class SuperAgentService {
  private readonly WORKFLOW_ID = process.env.SUPERAGENT_WORKFLOW_ID;
  private readonly AGENT_ID = process.env.SUPERAGENT_AGENT_ID;
  private readonly BASE_URL = process.env.SUPERAGENT_API_BASE_URL;

  public async getAnswer(input: string, threadId: string): Promise<string> {
    let ENDPOINT_URL = new URL(
      this.WORKFLOW_ID
        ? `${this.BASE_URL}/workflows/${this.WORKFLOW_ID}/invoke`
        : `${this.BASE_URL}/agents/${this.AGENT_ID}/invoke`
    );

    try {
      const res = await fetch(ENDPOINT_URL.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPERAGENT_API_KEY}`,
        },
        body: JSON.stringify({
          enableStreaming: false,
          input,
          sessionId: `slack-${threadId}`,
        }),
      });
      const { success, data } = await res.json();

      const output = data?.output;

      if (!res?.ok || !success || !output) {
        return "I'm sorry, something went wrong! Please contact support at info@superagent.sh";
      }

      return output;
    } catch (error) {
      console.error("Error:", error);

      return "I'm sorry, something went wrong! Please contact support at info@superagent.sh";
    }
  }
}
