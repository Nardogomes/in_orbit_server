import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { GetWeekPeddingGoals } from "../../functions/get-week-pedding-goals";

export const GetPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/pending-goals", async () => {
    const { pendingGoals } = await GetWeekPeddingGoals();

    return { pendingGoals };
  });
};
