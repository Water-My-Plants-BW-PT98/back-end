const db = require("../data/db-config")


async function addPlant(newPlant) {
	const [plant_id] = await db("plants").insert(newPlant)
	return findById(plant_id)
}

function findPlantsByUserId(user_id) {
   return db("users_plants as UP") // IN MANY-TO-MANY - JOIN TABLE AS THE MAIN TABLE
      .select(["U.username","P.*"])
      .innerJoin("users as U", "U.user_id", "UP.user_id") 
      .innerJoin("plants as P", "P.plant_id", "UP.plant_id") 
      .where("U.user_id", user_id) // dynamic aspect ( user input )
}

module.exports = {
   addPlant,
   findPlantsByUserId
}