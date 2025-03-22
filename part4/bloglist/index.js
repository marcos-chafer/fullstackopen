const app = require('./app') // The web server
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {	// Starts the webserver
  logger.info(`Server running on port ${config.PORT}`)
})