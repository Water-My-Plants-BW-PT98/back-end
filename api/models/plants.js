const db = require("../data/db-config")

async function getPlants(){
   return db("plants")
}

async function addPlant(newPlant) {
   console.log(newPlant)
	const [id] = await db("plants").insert(newPlant,"id")
   //updateJoinTable(id,userId) // not working 3/26/21
	return findById(id)
}

async function updatePlant(plant, id) {

   let updated = await db("plants").update(plant).where("id", id)
   if(updated){
      updated = findById(id)
   }
   return updated
}

async function deletePlant(id) {
   return await db("plants").where("id",id).del()
}

function findById(id){
   return db("plants")
   .where("id",id)
   .select("id","nickname","species","h2o_frequency")
}

// ******DEPRECATED*********
// function findPlantsByUserId(user_id) {
//    return db("users_plants as UP") // IN MANY-TO-MANY - JOIN TABLE AS THE MAIN TABLE
//       .select(["U.username","P.*"])
//       .innerJoin("users as U", "U.id", "UP.user_id") 
//       .innerJoin("plants as P", "P.id", "UP.plant_id") 
//       .where("U.id", user_id) // dynamic aspect ( user input )
// }

// async function updateJoinTable( plantId, userId ){
//    const newEntry = { user_id: userId, plant_id: plantId }
//    console.log(newEntry)
//    db("users_plants").insert(newEntry)
// }

module.exports = {
   getPlants,
   addPlant,
   findById,
   updatePlant,
   deletePlant
}