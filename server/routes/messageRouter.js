import { Router } from "express";
import * as msgController from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", msgController.messagesGet);
messageRouter.post("/", msgController.messagePost);
messageRouter.get("/:id", msgController.messageGet);
messageRouter.put("/:id", msgController.messageUpdate);
messageRouter.delete("/:id", msgController.messageDelete);

export default messageRouter;
