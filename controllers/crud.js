const conexion=require('../database/db')

exports.save=(req,res)=>{
    const nombre=req.body.nombre
    const fechaContratacion=req.body.fechaContratacion
    const salario=req.body.salario
    const horasTrabajadas=req.body.horasTrabajadas
    const departamento=req.body.departamento
const pagado= Math.round(Math.random())
if (!nombre || !fechaContratacion || !salario || !horasTrabajadas || !departamento) {
    return res.status(400).send('Todos los campos son obligatorios.');
}
    conexion.query('INSERT INTO empleados SET ?',{nombre:nombre,fechaContratacion:fechaContratacion,salario:salario,horasTrabajadas:horasTrabajadas,departamento:departamento},(err,results)=>{
        if(err)
        throw err
    else
    res.redirect('/registrar')
    })
}




exports.tareas = (req, res) => {
    const { id_empleado, horas } = req.body;

     

    conexion.query( 'SELECT horasTrabajadas FROM empleados WHERE id = ?', [id_empleado], (err, resultadosEmpleado) => {
        if (err) {
            console.log(err);
        }

        const horasTrabajadas = resultadosEmpleado[0].horasTrabajadas;

        if (horasTrabajadas < horas) {
          const mensaje='Las horas de la tarea son mayores a las del empleado trabajando';
            return res.render('tareasmensaje',{mensaje});
        } else {
            const newTarea = {
                nombre: req.body.nombre,
                horas: req.body.horas,
                id_empleado: req.body.id_empleado
            };

            conexion.query('INSERT INTO tareas SET ?', newTarea, (err) => {
                if (err) {
                   // console.log(err);
                    return res.status(500).send('Error interno del servidor');
                }

                const mensaje2 = 'Tareas Guardadas exitosamente';
                return res.render('tareasmensaje2', { mensaje2 });
            });
    }
    });



    exports.tareas = (req, res) => {
        const { id_empleado, horas } = req.body;
    
        conexion.query('SELECT horasTrabajadas FROM empleados WHERE id = ?', [id_empleado], (err, resultadosEmpleado) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error interno del servidor');
            }
    
            const horasTrabajadas = resultadosEmpleado[0].horasTrabajadas;
    
            if (horasTrabajadas < horas) {
                const mensaje = 'El tiempo invertido en la tarea supera las horas trabajadas del empleado :(';
                return res.render('tareasmensaje', { mensaje });
            } else {
                const newTarea = {
                    nombre: req.body.nombre,
                    horas: req.body.horas,
                    id_empleado: req.body.id_empleado
                };
    
                conexion.query('INSERT INTO tareas SET ?', newTarea, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error interno del servidor');
                    }
    
                    const mensajes = 'Tareas Guardadas exitosamente';
                    return res.render('tareamensaje2', { mensajes });
                });
            }
        });
    };
};