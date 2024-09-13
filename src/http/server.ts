import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoal } from "../functions/create-goal";
import z from "zod";
import { GetWeekPeddingGoals } from "../functions/get-week-pedding-goals";
import { CreateGoalCompletion } from "../functions/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/pending_goals", async () => {
  const { pendingGoals } = await GetWeekPeddingGoals();

  return { pendingGoals };
});

app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (request) => {
    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
      title,
      desiredWeeklyFrequency,
    });
  }
);

app.post(
  "/completions",
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async (request) => {
    const { goalId } = request.body;

    await CreateGoalCompletion({
      goalId,
    });
  }
);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server is running.");
  });
