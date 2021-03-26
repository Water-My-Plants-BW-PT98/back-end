const express = require("express")
const { findPlantsByUserId } = require("../models/plants")
const { restrict } = require('../middleware/restricted')

const router = express.Router()

router.get("/plants/:user_id", async (req, res, next) => {
	try {
		const plantsFromDB = await findPlantsByUserId(req.params.user_id)

		res.json(plantsFromDB)
	} catch(err) {
		next(err)
	}
})

module.exports = router
