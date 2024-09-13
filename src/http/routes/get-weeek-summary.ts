import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { GetWeekSummary } from "../../functions/get-week-summary";

export const GetWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/summary", async () => {
    const { summary } = await GetWeekSummary();

    return { summary };
  });
};
