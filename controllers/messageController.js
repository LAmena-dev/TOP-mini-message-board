import * as db from "../db/queries.js";

const messagesGet = async (req, res) => {
  const messages = await db.selectMessages();

  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
};

const messageCreateGet = async (req, res) => {
  res.render("form", {
    title: "Add a New Message",
  });
};

const messageCreatePost = async (req, res) => {
  const { msgUser, msgText } = req.body;

  await db.insertMessage(msgUser, msgText);

  res.redirect("/");
};

const messageGet = async (req, res) => {
  const id = parseInt(req.params.id);
  const message = await db.selectMessage(id);

  if (!message) {
    return res.statusCode(404).send("Message not found!");
  }

  res.render("messageDetails", {
    title: "Message Details",
    message: message,
  });
};

const messageUpdateGet = async (req, res) => {
  const id = parseInt(req.params.id);
  const message = await db.selectMessage(id);

  if (!message) {
    return res.statusCode(404).send("Message not found!");
  }

  res.render("messageUpdate", {
    title: "Update Message",
    message: message,
  });
};

const messageUpdatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { msgUser, msgText } = req.body;

  await db.updateMessage(id, msgUser, msgText);

  res.redirect(`/messages/${id}`);
};

const messageDelete = async (req, res) => {
  const id = parseInt(req.params.id);
  const message = await db.deleteMessage(id);

  if (message.rowCount === 0) {
    return res.statusCode(404).send("Message not found!");
  }

  res.redirect("/");
};

export {
  messagesGet,
  messageCreateGet,
  messageCreatePost,
  messageGet,
  messageUpdateGet,
  messageUpdatePost,
  messageDelete,
};
