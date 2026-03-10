// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import express from "express";
import cors from "cors";
import messageRouter from "./routes/messageRouter.js";

const app = express();

app.use(cors(
  // {origin: ""}
));
app.use(express.json());

app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
  console.log("DATABASE_URL =", process.env.DATABASE_URL);
});
