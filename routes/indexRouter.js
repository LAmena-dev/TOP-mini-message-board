import { Router } from "express";

const indexRouter = Router();

const messages = [
  { id: 0, text: "Hi there!", user: "Amando", added: new Date() },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {
    title: "Add a New Message",
  });
});

let nextID = messages.length;
indexRouter.post("/new", (req, res) => {
  const { msgUser, msgText } = req.body;
  messages.push({
    id: nextID++,
    user: msgUser,
    text: msgText,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);

  if (!message) {
    return res.statusCode(404).send("Message not found!");
  }

  res.render("messageDetails", { title: "Message Details", message });
});

export default indexRouter;
