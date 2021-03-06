const express = require("express")
const { 
   getPlants,
   addPlant, 
   deletePlant,
   updatePlant,
   findById    } = require("../models/plants")

const { restrict } = require('../middleware/restricted')

const router = express.Router()

// GET LIST OF PLANTS
router.get("/plants", restrict, async (req, res, next) => {
   console.log("called")
	try {
		const plantsFromDB = await getPlants()

		res.json(plantsFromDB)
	} catch(err) {
		next(err)
	}
})

// POST A NEW PLANT
router.post("/plants", restrict, async (req,res,next)=> {

   try{
      const returnedPlant = await addPlant(req.body)
      res.json(returnedPlant)
   }catch(err){
      next(err)
   }
})

// EDIT A PLANT BY ID
router.put("/plants/:id", restrict, async (req,res,next)=> {

   const { id } = req.params;
   const updated = req.body;
 
   try{
      const [plantToUpdate] = await findById(id)

      if(!plantToUpdate){
         return res.status(404).json({ message: "Could not find plant with given id" });
      }

      const editedPlant = await updatePlant( updated, plantToUpdate.id )
      res.status(200).json(editedPlant)

   }catch(err){
      next(err)
   }

})

// DELETE A PLANT BY ID
router.delete("/plants/:id", restrict, async (req,res,next)=> {

   const { id } = req.params;
 
   try{
      const [plantToDelete] = await findById(id)

      if(!plantToDelete){
         return res.status(404).json({ message: "Could not find plant with given id" });
      }
      const deletedPlant = await deletePlant( plantToDelete.id )
      res.status(200).json(deletedPlant)

   }catch(err){
      next(err)
   }

})

module.exports = router


/* legacy seed data for user/plant join table================================

exports.seed = async function(knex) {
   await knex('users_plants').insert([
     { user_id: 1, plant_id: 1 },
     { user_id: 1, plant_id: 2 },
     { user_id: 1, plant_id: 3 },
     { user_id: 1, plant_id: 4 },
     { user_id: 1, plant_id: 5 },
     { user_id: 2, plant_id: 2 },
     { user_id: 2, plant_id: 4 },
     { user_id: 2, plant_id: 6 },
     { user_id: 2, plant_id: 8 },
     { user_id: 3, plant_id: 1 },
     { user_id: 3, plant_id: 3 },
     { user_id: 3, plant_id: 5 },
     { user_id: 3, plant_id: 6 },
     { user_id: 3, plant_id: 8 },
   ]);
};

==============================================================================*/
