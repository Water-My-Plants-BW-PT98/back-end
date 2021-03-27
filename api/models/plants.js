const db = require("../data/db-config")

// THIS FUNCTION TAKES IN A NEW PLANT OBJECT AND ALSO A USER ID
// ONCE THE PLANT IS CREATE, A SECOND CALL IS MADE WHERE
// A NEW OBJECT IS ADDED IN THE JOIN TABLE WITH THE NEW PLANT ID
// AND THE USER ID ( FROM THE JSON WEB TOKEN )
async function addPlant(newPlant, userId) {
   console.log(newPlant)
	const [id] = await db("plants").insert(newPlant,"id")

   updateJoinTable(id,userId) // not working 3/26/21

	return findById(id)
}

function updatePlant(plant, id) {
   return db("plants").update(plant).where("id", id)
}

function deletePlant(id) {
   return db("plants").where("id",id).del()
}

async function updateJoinTable( plantId, userId ){
   const newEntry = { user_id: userId, plant_id: plantId }
   console.log(newEntry)
   db("users_plants").insert(newEntry)
}

function findById(id){
   return db("plants")
   .where("id",id)
   .select("id","nickname","species","h2o_frequency")
}

function findPlantsByUserId(user_id) {
   return db("users_plants as UP") // IN MANY-TO-MANY - JOIN TABLE AS THE MAIN TABLE
      .select(["U.username","P.*"])
      .innerJoin("users as U", "U.id", "UP.user_id") 
      .innerJoin("plants as P", "P.id", "UP.plant_id") 
      .where("U.id", user_id) // dynamic aspect ( user input )
}

module.exports = {
   addPlant,
   findById,
   findPlantsByUserId,
   updatePlant,
   deletePlant
}