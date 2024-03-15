class SuperAgentService {
  private readonly WORKFLOW_ID = process.env.SUPERAGENT_WORKFLOW_ID;
  private readonly AGENT_ID = process.env.SUPERAGENT_AGENT_ID;
  private readonly BASE_URL = process.env.SUPERAGENT_API_BASE_URL;

  public async getAnswer(input: string, threadId: string): Promise<string> {
    let ENDPOINT_URL = new URL(
      this.WORKFLOW_ID
        ? `${this.BASE_URL}/workflows/${this.WORKFLOW_ID}/invoke`
        : `${this.BASE_URL}/agents/${this.AGENT_ID}/invoke`
    );

    console.log("Retrieving answer:", ENDPOINT_URL.toString());

    const reqBody = JSON.stringify({
      enableStreaming: false,
      input,
      sessionId: `slack-${threadId}`,
    });

    try {
      const res = await fetch(ENDPOINT_URL.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPERAGENT_API_KEY}`,
        },
        body: reqBody,
      });
      const { success, data } = await res.json();

      const output = data?.output;

      if (!res?.ok || !success || !output) {
        console.error("Error:", res, "Body:", reqBody);

        throw new Error(data);
      }

      return output;
    } catch (error) {
      console.error("Error:", error);
      throw new Error(error);
    }
  }
}

export { SuperAgentService };
