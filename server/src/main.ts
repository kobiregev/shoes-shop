import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./constants";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import productRoute from "./modules/product/product.route";
import categoryRoute from "./modules/category/category.route";
import cartRoute from "./modules/cart/cart.route";
import deserializeUser from "./middleware/deserializeUser";
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);
// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cart", cartRoute);

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
