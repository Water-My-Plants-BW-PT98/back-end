const db = require("../data/db-config")


// FOR TESTING
function getUsers() {
   return db("users").select("*")
}

async function add(newUser) {
   console.log(newUser)
	const [id] = await db("users").insert(newUser,"id")
	return findById(id)
}

function findById(id) {
   return db("users")
   .where("id",id)
   .select("id","username","password")
}

function findByUserName(username) {
   return db("users")
      .where("username",username)
      .first("id","username","password")
}

function editUserInfo(userInfo, id){
   return db("users").update(userInfo).where("id", id)
}

module.exports = {
   getUsers,
   add,
   findById,
   findByUserName,
   editUserInfo
}