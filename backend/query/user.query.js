const QUERY = {
  SELECT_USERS: "SELECT * FROM users ORDER BY created_at DESC LIMIT 100",
  SELECT_USER: "SELECT * FROM users WHERE  id = ?",
  CREATE_USER:
    "INSERT INTO users(email, first_name, last_name, image_url, phone) VALUES (?, ?, ?, ?, ?)",
  UPDATE_USER:
    "UPDATE users SET email = ?, first_name = ?, last_name = ?, image_url = ?, phone = ? WHERE id = ?",
  DELETE_USER: "DELETE FROM users WHERE id = ?",
  CREATE_USER_PROCEDURE: "CALL create_and_return(?, ?, ?, ?, ?)"
};

export default QUERY;
