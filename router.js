const express=require('express')
const router=express.Router()
const conexion=require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')

})
router.get('/registrar', (req, res) => {
    const buscar = req.query.buscar;

    if (buscar) {
        conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.render('registrar', { result: result, buscar: buscar });
            }
        });
    } else {
        conexion.query('SELECT * FROM empleados', (err, result) => {
            if (err) {
                throw err;
            } else {
                res.render('registrar', { result: result });
            }
        });
    }
});
const crud=require('./controllers/crud')
router.post('/guardar',crud.save)

router.get('/tareas',(req,res)=>{
    conexion.query('SELECT * FROM empleados',(err,result)=>{
        if(err)
        throw err
    else
    res.render('tareasemp',{result:result})
    })
})

router.post('/tareasguardar',crud.tareas)
router.get('/total', (req, res) => {
    conexion.query( `
    SELECT fechaContratacion, SUM(salario) as totalSalarios
    FROM empleados
    WHERE pagado = 1
    GROUP BY fechaContratacion
    ORDER BY fechaContratacion
  `, (err, empleadosPorFecha) => {
      if (err) {
        console.error('Error al consultar salarios por fecha: ' + err.stack);
        return res.status(500).send('Error en el servidor');
      }
  

      conexion.query(`
      SELECT SUM(salario) as totalSalariosGeneral
      FROM empleados
      WHERE pagado = 1
    `, (err, resultadoTotalSalarios) => {
        if (err) {
          console.error('Error al consultar total general de salarios: ' + err.stack);
          return res.status(500).send('Error en el servidor');
        }
        const totalSalariosGeneral = resultadoTotalSalarios[0].totalSalariosGeneral;
  
        res.render('total', { empleadosPorFecha, totalSalariosGeneral });
      });
    });
  });
  
// Agrega una nueva ruta para actualizar el estado "pagado" de un empleado
router.post('/pagar/:idEmpleado', (req, res) => {
    const idEmpleado = req.params.idEmpleado;

    // Actualiza el estado "pagado" a 1 para el empleado con el ID proporcionado
    conexion.query(
        'UPDATE empleados SET pagado = 1 WHERE id = ?',
        [idEmpleado],
        (err) => {
            if (err) {
                console.error('Error al actualizar el estado "pagado": ' + err.stack);
                return res.status(500).send('Error en el servidor');
            }

            res.redirect('/registrar'); // Redirige a la página de totales después de la actualización
        }
    );
});


module.exports = router;