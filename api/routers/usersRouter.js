const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") // 3rd party
const { 
   getUsers, 
   add, 
   findById, 
   findByUserName,
   editUserInfo } = require('../models/users')
const { restrict } = require('../middleware/restricted')

const router = express.Router()

router.get('/users', async (req,res,next) => {
   try{
      const users = await getUsers()
      res.status(200).json(users)
   }catch(err){
      next(err)
   }
})

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
			return res.status(401).json({ message: "invalid u credentials" })
		}

      // COMPARE PASSWORDS
		const passwordValid = await bcrypt.compare(req.body.password, user.password)

      if (!passwordValid) { 
         return res.status(401).json({ message: "invalid p credentials" })
		}

      // jwt.sign( payload, secretOrPrivateKey, [options,callback])
      const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET )

      res.json({
         username: user.username, 
         token: token  
		})
     
  }catch(err){
     next(err)
  }
});

// EDIT A PLANT BY ID
router.put("/edit/:id", restrict, async (req,res,next)=> {
   console.log
   const { id } = req.params;
 
   try{
      const [userFromDatabase] = await findById(id)

      if(!userFromDatabase){
         res.status(404).json({ message: "Could not find user with given id" });
      }

      const newUserToUpdate = {
         username: userFromDatabase.username, //INSURE USERNAME DOES NOT CHANGE
         password: await bcrypt.hash(req.body.password, 12),
         phone_number: req.body.phone_number 
      }

      const editedUser = await editUserInfo( newUserToUpdate, userFromDatabase.id )
      res.json(editedUser)

   }catch(err){
      next(err)
   }

})

module.exports = router;
