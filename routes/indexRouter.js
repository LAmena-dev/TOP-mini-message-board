import { Router } from "express";
import * as msgController from "../controllers/messageController.js";

const indexRouter = Router();

indexRouter.get("/", msgController.messagesGet);
indexRouter.get("/new", msgController.messageCreateGet);
indexRouter.post("/new", msgController.messageCreatePost);
indexRouter.get("/messages/:id", msgController.messageGet);
indexRouter.get("/:id/update", msgController.messageUpdateGet);
indexRouter.post("/:id/update", msgController.messageUpdatePost);
indexRouter.post("/messages/:id/delete", msgController.messageDelete);

export default indexRouter;
