const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") // 3rd party
const { add, findById, findByUserName } = require('../models/users')
const { restrict } = require('../middleware/restricted')

const router = express.Router()


router.post('/register', async (req, res, next) => {

   try{
      // NOT ALL REQUIRED FIELDS
      if( !req.body.username || !req.body.password ) {
         return res.status(401).json({message:"username and password required"})
      }
      // DUPLICATED USERNAME
      const user = await findByUserName(req.body.username)

      if(user) {
         return res.status(409).json({ message: "username taken" })
      }

      const newUser = await add({
			username: req.body.username,
			password: await bcrypt.hash(req.body.password, 12),
         phone_number: req.body.phone_number
		})

		res.status(201).json(newUser)

   }catch(err){
      next(err)
   }
});

router.post('/login', async (req, res, next) => {

  try{
      // NOT ALL REQUIRED FIELDS
      if( !req.body.username || !req.body.password ) {
         return res.status(401).json({message:"username and password required"})
      }
      // USERNAME NOT FOUND
      const user = await findByUserName(req.body.username)
		
		if (!user) {
			return res.status(401).json({ message: "invalid credentials" })
		}

      // COMPARE PASSWORDS
		const passwordValid = await bcrypt.compare(req.body.password, user.password)

      if (!passwordValid) { 
         return res.status(401).json({ message: "invalid credentials" })
		}

      // jwt.sign( payload, secretOrPrivateKey, [options,callback])
      const token = jwt.sign({ id: user.user_id, username: user.username}, process.env.JWT_SECRET )

      res.json({
         message: `welcome ${user.username}!`, 
         token: token 
		})
     
  }catch(err){
     next(err)
  }
});

module.exports = router;
