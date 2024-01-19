const express=require('express')
const router=express.Router()
const conexion=require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')

})
router.get('/registrar', (req, res) => {

       
        // Si no hay un valor, muestra todos los empleados
        conexion.query('SELECT * FROM empleados', (err, resultados) => {
            if (err) {
                throw err;
            } else {
                res.render('registrar', { resultados: resultados });
            }
        });
    }
)
const crud=require('./controllers/crud')
router.post('/guardar',crud.save)

module.exports=router