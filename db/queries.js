import pool from "./pool.js";

async function selectMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(username, message) {
  await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [
    username,
    message,
  ]);
}

async function selectMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function updateMessage(id, username, message) {
  await pool.query(
    "UPDATE messages SET username = $1, message = $2 WHERE id = $3",
    [username, message, id],
  );
}

async function deleteMessage(id) {
  const row = await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  return row;
}

export {
  selectMessages,
  insertMessage,
  selectMessage,
  updateMessage,
  deleteMessage,
};
