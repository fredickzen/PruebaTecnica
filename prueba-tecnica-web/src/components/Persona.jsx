import React from 'react'
import {Link} from 'react-router-dom'

const Persona = () => {

    const [personas,setPersonas] = React.useState([]);

    React.useEffect(()=>{
        fetchData();

    },[])
    

    const fetchData = async () => {
        const data = await fetch('https://localhost:5001/api/v1/persona/')
        const personas = await data.json()
        console.log(personas);
        setPersonas(personas)
    }

    const eliminarPersona = (item) =>{
        console.log(item);
        fetchEliminarPersona(item.id);
        fetchData();
    }

    const fetchEliminarPersona = (id) => {
        console.log(id);
        const url = `https://localhost:5001/api/v1/persona/${id}`;
        console.log(url);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type':  'application/json',
                'Access-Control-Allow-Credentials' : 'true',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
		      },
        })
        .then((resp) => resp.json())
        .then(function(data) {
            if(Object.keys(data).length === 0){ 
                console.log(data);
                console.log('Regitro Eliminado..!!');
            }else{
                console.log('Error al eliminar la persona');
            }
        })
        .catch(function(error) {
  		  console.log(error);
  	  	});

    }

    return (
        <div>
            <h3> Listado de Personas </h3>
            <div className="text-right">                          
                <Link className="mr-3" to={`/persona/0`}>
                      Agregar Nueva Persona                               
                </Link>
            </div>
            <br/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="table-active" scope="col">Nombre Completo</th>
                        <th className="table-active" scope="col">R.U.N</th>
                        <th className="table-active" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    personas.map(item => (
                    <tr key={item.id}>
                        <td>{item.runCuerpo}-{item.runDigito}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link className="mr-3" to={`/persona/${item.id}`}>
                                Editar                               
                            </Link>
                            <Link to={`/`} onClick={() => eliminarPersona(item)}>
                                Eliminar                           
                            </Link>                        
                        </td>                    
                    </tr>
                    ))
                }
                </tbody>
            </table>            
        </div>
    )
}

export default Persona
