import express from "express";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT", "SIGHUP"] as const;

async function gracefulShutdown(signal: typeof signals[number]) {
  logger.info(`Got signal:"${signal}", My works here is done.`);
  server.close();

  await disconnectFromDatabase();

  process.exit(0);
}

signals.forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});
