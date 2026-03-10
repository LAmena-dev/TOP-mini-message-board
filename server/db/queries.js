import pool from "./pool.js";

async function selectMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(username, message) {
  const result = await pool.query(
    "INSERT INTO messages (username, message) VALUES ($1, $2)",
    [username, message],
  );
  return result.rows[0];
}

async function selectMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function updateMessage(id, username, message) {
  const result = await pool.query(
    "UPDATE messages SET username = $1, message = $2 WHERE id = $3 RETURNING *",
    [username, message, id],
  );
  return result.rows[0];
}

async function deleteMessage(id) {
  const result = await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  return result;
}

export {
  selectMessages,
  insertMessage,
  selectMessage,
  updateMessage,
  deleteMessage,
};
