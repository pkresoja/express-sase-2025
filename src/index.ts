import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { FlightRoute } from './routes/flight.route'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { AirlineRoute } from './routes/airline.route'
import { UserRoute } from './routes/user.route'
import { UserService } from './services/user.service'
import { TicketRoute } from './routes/ticket.route'
import https from 'https'
import fs from 'fs'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(UserService.verifyToken)
app.use('/api/flight', FlightRoute)
app.use('/api/airline', AirlineRoute)
app.use('/api/user', UserRoute)
app.use('/api/ticket', TicketRoute)

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'NOT_FOUND',
        timestamp: new Date()
    })
})

const sslOptions = {
    key: fs.readFileSync('./src/crypto/key.pem'),
    cert: fs.readFileSync('./src/crypto/cert.pem')
}

configDotenv()
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        const port = process.env.SERVER_PORT || 3000

        https.createServer(sslOptions, app)
            .listen(port, () =>
                console.log(`Application started on port ${port}`)
            )
    })
    .catch(e => {
        console.log('Database server connection failed')
        console.log(e)
    })