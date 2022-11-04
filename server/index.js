import express from 'express'
import { createDBConnection } from '../db'
import routes from '../routes'

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.middlewares()
    this.routes()
    this.dbConnection()
  }

  middlewares () {
    this.app.use(express.json())
  }

  routes () {
    this.app.use('/api', routes)
  }

  dbConnection () {
    createDBConnection()
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
