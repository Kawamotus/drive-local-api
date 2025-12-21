import { app } from "./app";
import { env } from "./config/env";

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => {
    console.log(`server running on ${env.PORT}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
