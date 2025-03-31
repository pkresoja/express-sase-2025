import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { FlightRoute } from './routes/flight.route'
import { configDotenv } from 'dotenv'

const app = express()
app.use(cors())
app.use(morgan('tiny'))

app.use('/api/flight', FlightRoute)

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'NOT_FOUND',
        timestamp: new Date()
    })
})

configDotenv()
const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Application started on port ${port}`))