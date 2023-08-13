
const express = require('express')

const app = express()

app.listen(8080, () => {
  console.log('Start server at port 8080.')
})
// ดึงข้อมูล json มาเก็บไว้ในตัวแปร

const article = require('./article-db.json')

// กำหนดให้ path blogapi แสดงข้อมูลบทความทั้งหมดในรูปแบบ json

app.get('/news', (req, res) => {
  res.json(article)
})

// กำหนดให้ path blogapi/id แสดงข้อมูลบทความตาม id ที่กำหนด

// app.get('/news/:id', (req, res) => {
//   res.json(article.find(article => article.id === req.params.id))
// })
const path = require('path')

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Config Router
const indexRouter = require('./routes/index')

app.use('/', indexRouter)