const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')

const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(routes)

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
