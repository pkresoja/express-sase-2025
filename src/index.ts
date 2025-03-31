import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { FlightRoute } from './flight.route'

const app = express()
app.use(cors())
app.use(morgan('tiny'))

app.use('/api/flight', FlightRoute)

app.listen(3000, () => console.log('app started'))