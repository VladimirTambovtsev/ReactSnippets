import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'

// Load API
import users from './routes/api/users'
import products from './routes/api/products'
import categories from './routes/api/categories'

// Use JWT Middleware
import passportMiddleware from './config/passport'

require('dotenv').config()	// reads env file


mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


const app = express()

app.disable('x-powered-by')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())
passportMiddleware(passport)

// set API routes
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/categories', categories)


const port = process.env.PORT || 5000
app.listen(port, console.log(`Server is running on ${port}`))
