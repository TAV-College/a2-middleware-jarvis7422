const { db } = require("./db_base");

const createUser = async ({ username, password }) => {
  const stmnt = db.prepare(
    "INSERT INTO users (username, password) VALUES (@username, @password)",
  );

  let result;

  try {
    result = await stmnt.run({ username, password });
  } catch (err) {
    console.error(err);
    return null;
  }

  return result;
};

const getUserByUsername = async (username) => {

  const stmnt = db.prepare("SELECT * FROM users WHERE username=?");
  
  try {
    return await stmnt.get(username);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const grantPermission = async(username) =>{
    const stmnt = db.prepare("UPDATE users SET permissions = 1 WHERE username = ?");
    try {
      await stmnt.run(username); 
      console.log(`${username}'s permissions updated to 1`);
    } catch (err) {
      console.error("Error updating permissions:", err);
    }
}
module.exports = {
  createUser,
  getUserByUsername,
  grantPermission
};
