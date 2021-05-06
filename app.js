const express = require('express')
const exphbs = require('express-handlebars')
const login = require('./login')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = login(email, password)
  if (user) {
    res.render('login', { name: user.firstName })
  } else {
    let warning = 'Wrong Email or Password!'
    res.render('index', { warning })
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})