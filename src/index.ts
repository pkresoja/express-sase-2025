import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(3000, () => console.log('app started'))