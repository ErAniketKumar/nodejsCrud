const express = require('express')
const app = express()
const port = 3000
const path=require('path');
const router=require('./routes/createRead.js');
// const router=require('./routes/update.js');
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views','./views');
app.set('view engine','ejs');

app.use('/',router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))