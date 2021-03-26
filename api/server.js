const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('../api/routers/usersRouter')
const plantsRouter = require('../api/routers/plantsRouter')


const server = express()

server.use(helmet())
server.use(cors())

server.use(express.json())
server.use(usersRouter)
server.use(plantsRouter)

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
