const mysql=require('mysql')

const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
})
conexion.connect((err)=>{
    if(err){
    console.log('Error:'+err)
    return
    }else
    console.log('Te has conectado a la base de datos de manera exitosa')
})
module.exports=conexion