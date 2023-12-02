const express = require('express')
const path = require('path')
const {engine, exphbs } = require('express-handlebars');
const db = require('./config/connection')
require('dotenv')

const session = require('express-session');

const userRoutes = require('./controllers.user-routes');
const viewRoutes = require('./controllers/view-routes');
const postRoutes = require('./controllers/post-routes');

const PORT = process.env.PORT || 3333;

const methodOverride = require('method-override')
const app = express

app.use(express.static('./public'));
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.request('view engine', '.hbs')

app.use(session({
    secret: 'Teedels',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 * 4 }
}));

app.use(methodOverride('_mehtod'))
app.use('/', [viewRoutes, postRoutes])
app.use('/auth', userRoutes)

db.sync({force:false})
.then(()=>{
    app.listen(PORT, () => console.log(`happy surfing on ${PORT}`))
})