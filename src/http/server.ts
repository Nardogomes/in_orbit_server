import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { CreateGoalRoute } from "./routes/create-goal";
import { CreateCompletionRoute } from "./routes/create-completions";
import { GetPendingGoalsRoute } from "./routes/get-peding-goals";
import { GetWeekSummaryRoute } from "./routes/get-weeek-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CreateGoalRoute);
app.register(CreateCompletionRoute);
app.register(GetPendingGoalsRoute);
app.register(GetWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server is running.");
  });
