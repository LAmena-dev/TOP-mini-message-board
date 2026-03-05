import { Router, text } from "express";

const indexRouter = Router();

const messages = [
  { id: 0, text: "Hi there!", user: "Amando", added: new Date() },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    user: "Test",
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

indexRouter.post("/messages/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);

  if (index === -1) {
    return res.statusCode(404).send("Message not found!");
  }
  messages.splice(index, 1);

  res.redirect("/");
});

export default indexRouter;
