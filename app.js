const express=require('express')
const app=express()
const path=require('path')
const expressLayouts=require('express-ejs-layouts')
const bodyParser = require('body-parser');

//settings
app.set('view engine','ejs')
app.set('port',process.env.PORT||3000)
//agregar flash msg

//middlewares

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())



app.use('/',require('./router'))

app.listen(app.get('port'),()=>{
    console.log(`conexion exitosa con http://localhost:${app.get('port')}`)
})