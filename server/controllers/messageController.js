import * as db from "../db/queries.js";

const messagesGet = async (req, res) => {
  try {
    const messages = await db.selectMessages();

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const messagePost = async (req, res) => {
  try {
    const { msgUser, msgText } = req.body;
    if (!msgUser || !msgText) {
      return res.status(400).json({ error: "User and message text required" });
    }

    const newMessage = await db.insertMessage(msgUser, msgText);

    res.status(201).json({
      message: "Message created",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

const messageGet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = await db.selectMessage(id);

    if (!message) {
      return res.status(404).json({ error: "Message not found!" });
    }

    res.json(message);
  } catch (error) {}
};

const messageUpdate = async (req, res) => {
  console.log("Updating message id:", req.params.id);
  console.log("Body:", req.body);
  try {
    const id = parseInt(req.params.id);
    const { msgUser, msgText } = req.body;

    const updatedMessage = await db.updateMessage(id, msgUser, msgText);
    console.log("DB update result:", updatedMessage);

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({
      message: "Message updated",
      data: updatedMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
};

const messageDelete = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = await db.deleteMessage(id);

    if (message.rowCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({
      message: "Message deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};

export { messagesGet, messagePost, messageGet, messageUpdate, messageDelete };
