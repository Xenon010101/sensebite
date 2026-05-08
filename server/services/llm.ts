import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are SenseBite, an AI-native food reasoning assistant. Your role is to help users understand food ingredients through clear, human explanations.

Guidelines:
- Explain ingredients in plain, human language
- Highlight trade-offs, not moral judgments
- Communicate uncertainty honestly
- Focus on what matters, not data dumping
- NEVER provide medical advice
- Keep explanations conversational and calm
- Be proportional in highlighting key concerns

Always start by acknowledging the ingredient list, then provide thoughtful reasoning about what makes this product notable.`;

export async function analyzeIngredients(ingredients: string): Promise<{
  explanation: string;
  confidence: number;
}> {
  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please analyze these ingredients and provide clarity about what matters:\n\n${ingredients}`,
        },
      ],
    });

    const explanation =
      message.content[0].type === "text" ? message.content[0].text : "";
    const confidence = 85; // Base confidence for Claude responses

    return { explanation, confidence };
  } catch (error) {
    console.error("LLM Error:", error);
    throw new Error("Failed to analyze ingredients");
  }
}

export async function answerFollowUp(
  ingredients: string,
  originalExplanation: string,
  followUpQuestion: string
): Promise<string> {
  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Ingredients: ${ingredients}\n\nPrevious analysis: ${originalExplanation}\n\nFollow-up question: ${followUpQuestion}`,
        },
      ],
    });

    return message.content[0].type === "text" ? message.content[0].text : "";
  } catch (error) {
    console.error("LLM Follow-up Error:", error);
    throw new Error("Failed to answer follow-up question");
  }
}
