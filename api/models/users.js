const db = require("../data/db-config")


async function add(newUser) {
	const [user_id] = await db("users").insert(newUser)
	return findById(user_id)
}

function findById(id) {
   return db("users")
   .where("user_id",id)
   .select("user_id","username","password")
}

function findByUserName(username) {
   return db("users")
      .where("username",username)
      .first("user_id","username","password")
}

module.exports = {
   add,
   findById,
   findByUserName
}