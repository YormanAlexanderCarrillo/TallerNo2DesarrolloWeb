const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const sessionConfig = {
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionConfig));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

//configuracion EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('PORT', process.env.PORT || 3005)
app.set(express.v)
app.listen(app.get('PORT'), ()=>{
    console.log(`Server is running on PORT ${app.get('PORT')}`);
})

app.use('/', require('./routes/index'))


