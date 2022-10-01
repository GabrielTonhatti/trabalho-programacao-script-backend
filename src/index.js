import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./configs/logger.js";
import express from "express";
import routes from "./routes.js";

const database = () => {
    logger.info("Connecting to database...");
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => logger.info("MongoDB connected ✅"))
        .catch((error) => {
            logger.error("Error connecting to MongoDB ❌");
            logger.error(error);
            logger.info("MongoDB disconnected");
        });
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
database();

app.listen(process.env.PORT || 3000, () => {
    logger.info("Server started on port 3000");
});
