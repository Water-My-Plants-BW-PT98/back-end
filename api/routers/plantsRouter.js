const express = require("express")
const { 
   addPlant, 
   deletePlant,
   updatePlant,
   findById, 
   findPlantsByUserId  } = require("../models/plants")

const { restrict } = require('../middleware/restricted')

const router = express.Router()

// GET ALL PLANTS BY USER ID
router.get("/plants/:user_id", restrict, async (req, res, next) => {
   
	try {
		const plantsFromDB = await findPlantsByUserId(req.params.user_id)

		res.json(plantsFromDB)
	} catch(err) {
		next(err)
	}
})

// POST A NEW PLANT
router.post("/plants", restrict, async (req,res,next)=> {

   try{
      const returnedPlant = await addPlant(req.body, req.token.id)
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
         res.status(404).json({ message: "Could not find plant with given id" });
      }

      const editedPlant = await updatePlant( updated, plantToUpdate.id )
      res.json(editedPlant)

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
         res.status(404).json({ message: "Could not find plant with given id" });
      }
      const deletedPlant = await deletePlant( plantToDelete.id )
      res.json(deletedPlant)

   }catch(err){
      next(err)
   }

})

module.exports = router
