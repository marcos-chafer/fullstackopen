// Imports
const config = require('./utils/config') // Environment constants, import them ASAP so they can be used
const express = require('express')	// Library used to create and manage a web server more efficiently
const logger = require('./utils/logger')	// Custom logger (replaces console.log)
const mongoose = require('mongoose')	// MongoDB ODM (Object Data Modeling) / Library to manage more efficiently a MongoDB database
const middleware = require('./utils/middleware')	// Various middleware
const cors = require('cors')	// Enable CORS petitions

// Server creation
const app = express()	// Express application instance

// Middleware (order matters!)	Software that sits between the backend and the petitions received by the server
app.use(cors())	// Enable CORS for all routes
app.use(express.json())	// Parse JSON request bodies
app.use(middleware.requestLogger)	// Log requests (order FIRST to log all the requests!)
app.use(express.static('dist'))	// Serve static frontend files from 'dist' directory
app.use(middleware.tokenExtractor)	// Get token from header and puts it in the request

// Routes
const blogsRouter = require('./controllers/blogs')	// Router that manages petitions to redirect them to correct API endpoints
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use("/api/blogs",
	middleware.userExtractor,	// Get user from token and puts it in the request
	blogsRouter)	// Indicate the endpoint that the controller will manage
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Error handling middleware (order matters: these go last!)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// MongoDB connection
logger.info("Connecting to", config.MONGODB_URI)

mongoose.set('strictQuery', false)	// Disable strict query mode for MongoDB driver flexibility
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("Successfully connected to MongoDB")
	})
	.catch((error) => {
		logger.error("Error connecting to MongoDB", error.message)
	})


module.exports = app	// Export the webserver for other files to access it