const connection = require("../config/database");

const getAllUser = async () => {
  let [results, fields] = await connection.query("Select * from Users");
  return results;
};

const getUserById = async (userId) => {
  let [results, fields] = await connection.query(
    "Select * from Users where USER_ID =?",
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};

  return user;
};

const updateUserById = async (name, email, address, phone, userId) => {
  let [results, fields] = await connection.query(
    `UPDATE Users set USER_NAME = ?, EMAIL = ?, ADDRESS = ?, PHONE = ? 
     WHERE USER_ID = ?`,
    [name, email, address, phone, userId]
  );
};

const deleteUserById = async (id) => {
  let [results, fields] = await connection.query(
    `DELETE FROM Users WHERE USER_ID=?`,
    [id]
  );
};
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
