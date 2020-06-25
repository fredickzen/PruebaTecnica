import React from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import Sexo from './Sexo';


const Usuario = () => {



    const {id} = useParams();
    const [persona, setPersona] = React.useState([]);
    const [regiones, setRegiones] = React.useState([{codigo:0 , nombre : 'Seleccione Region', nombreOficial:'Seleccione', codigoLibroClaseElectronico: 0,ciudad: Array(0)}]);
    const [ciudades, setCiudades] = React.useState([{regionCodigo:0 , codigo : 0, nombre:'Seleccione Ciudad', regionCodigoNavigation:null, comuna: Array(0)}]);
    const [comunas,setComuna] = React.useState([{regionCodigo:0 , ciudadCodigo : 0, codigo:0 , nombre:'Seleccione Comuna', codigoPostal:0, codigoLibroClaseElectronico:0, ciudad:null, persona: Array(0)}])
    const [sexos,setSexos] = React.useState([]);
    const [modoEditado, setModoEditado] = React.useState(false);

     /*datos de formulario*/
    const[run,setRun] = React.useState('');
    const[nombre, setNombre] = React.useState('');
    const[apellidoPaterno, setApellidoPaterno] = React.useState('');
    const[apellidoMaterno, setApellidoMaterno] = React.useState('');
    const[correo, setCorreo] = React.useState('');
    const[codigoSexo,setCodigoSexo] = React.useState(0);
    const[fechaNacimiento, setFechaNacimiento] = React.useState('');
    const[idRegion, setIdRegion] = React.useState(0);
    const[idCiudad, setIdCiudad] = React.useState(0);
    const[idComuna, setIdComuna] = React.useState(0);
    const[direccion, setDireccion] = React.useState('');
    const[telefono, setTelefono] = React.useState(0);
    const[comentario, setComentario] = React.useState('');


    React.useEffect(()=>{

        const fechDataRegiones = async () => {
            const data = await fetch(`https://localhost:5001/api/v1/Region/`);
            const todasRegiones = await data.json()
            const unionRegiones = [...regiones, ...todasRegiones];
            setRegiones(unionRegiones)
        }
        
        const fechDataCiudades = async () => {
            const data = await fetch(`https://localhost:5001/api/v1/Ciudad/`);
            const todasCiudades = await data.json()
            const unionCiudades = [...ciudades, ...todasCiudades];
            setCiudades(unionCiudades);
    
        }

        const fechDataComuna = async () => {
            const data = await fetch(`https://localhost:5001/api/v1/Comuna/`);
            const todasComunas = await data.json()
            const unionComunas = [...comunas, ... todasComunas];
            setComuna(unionComunas);
        }

        const fechDataSexos = async () => {
            const data = await fetch(`https://localhost:5001/api/v1/Sexo/`);
            const todosSexos = await data.json()
            console.log(todosSexos);
            setSexos(todosSexos);
        }


        const fetchData = async () => {
            const data = await fetch(`https://localhost:5001/api/v1/persona/${id}`);
            const persona = await data.json()
            setPersona(persona)
            setRun(persona.runCuerpo +'-'+ persona.runDigito);
            setNombre(persona.nombres);
            setApellidoPaterno(persona.apellidoPaterno);
            setApellidoMaterno(persona.apellidoMaterno);
            setCorreo(persona.email);
            setCodigoSexo(persona.sexoCodigo);
            setFechaNacimiento(persona.fechaNacimiento);
            setIdRegion(persona.regionCodigo);
            setIdCiudad(persona.ciudadCodigo);
            setIdComuna(persona.comunaCodigo);
            setDireccion(persona.direccion);
            setTelefono(persona.telefono);
            setComentario(persona.observaciones);
        }

        fechDataRegiones();
        fechDataCiudades();
        fechDataComuna();
        fechDataSexos();

        console.log(id);
        if(id !== "0"){
            fetchData();
            setModoEditado(false);
        }else{
            setModoEditado(true);
            setRun('');
            setNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setCorreo('');
            setCodigoSexo(0);
            setFechaNacimiento('');
            setIdRegion(0);
            setIdCiudad(0);
            setIdComuna(0);
            setDireccion('');
            setTelefono('');
            setComentario('');
        }

    },[id])

    const seleccionarRegion = (idRegion) =>{
        console.log('region :' + idRegion);
    }

    const dataPersona = ()=>{
        return  {
            runCuerpo: 999999999,
            runDigito: "3",
            nombres: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            email: correo,
            sexoCodigo: codigoSexo ,
            fechaNacimiento: fechaNacimiento,
            regionCodigo: idRegion,
            ciudadCodigo: idCiudad,
            comunaCodigo: idComuna,
            direccion : direccion,
            telefono: telefono,
            observaciones: comentario,
            comuna: null,
            sexoCodigoNavigation: null
        };
    }

    const modificarPersona = e => {
        e.preventDefault();
        /*validar formaulario*/
        

        /*proceso de modificar*/
        var datos =  dataPersona ();
        datos.id = persona.id;
        console.log(JSON.stringify( datos ));
        var url = `https://localhost:5001/api/v1/persona/${persona.id}`;
		fetch(url,
		{
		    method: "PUT",
		    headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		    body: JSON.stringify( datos )
		})
		.then((resp) => resp.json())
		.then(function(data){ 
			if(Object.keys(data).length !== 0){
                console.log('enviar a listado de personas');
			}else{
                console.log('error, al modificar un persona');
			}
		})
		.catch(function(error) {
  		  console.log(error);
  	  	});
        /*fin de proceso de modificacion*/

    }
    

    const agregarPersona = e => {
        e.preventDefault();
        /*proceso de validcion de formulario*/


        /*proceso de agregar persona*/
        var datos =  dataPersona ();
        var url = 'https://localhost:5001/api/v1/persona/';
		fetch(url,
		{
		    method: "POST",
		    headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		    body: JSON.stringify( datos )
		})
		.then((resp) => resp.json())
		.then(function(data){ 
			if(Object.keys(data).length !== 0){
                console.log('enviar a listado de personas');
			}else{
                console.log('error, al agregar un registro de persona');
			}
		})
		.catch(function(error) {
  		  console.log(error);
  	  	});

    } 

    return (
        <div className="container">
            <h3>Editando Persona</h3>
            <form onSubmit={ modoEditado ? agregarPersona : modificarPersona }>
                {
                    modoEditado ? (
                        <div className="form-group">
                            <label>R.U.N</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="RUT"
                            value={ run }
                            onChange={e => setRun(e.target.value)}
                            />
                        </div>
                    ):(
                        <div className="form-group">
                            <label>R.U.N</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="RUT"
                            value={ run }
                            />
                        </div>

                    ) 
                }

                <div className="form-group">
                    <label>Nombre :</label>
                    <br/>
                    <div className="form-check form-check-inline">
                        <input type="text" 
                        className="form-control mr-3" 
                        placeholder="Nombre"
                        value={ nombre }
                        onChange={e => setNombre(e.target.value)}
                        />
                        <input type="text" 
                        className="form-control mr-3" 
                        placeholder="Apellido Paterno"
                        value={ apellidoPaterno }
                        onChange={e => setApellidoPaterno(e.target.value)}
                        />
                        <input type="text" 
                        className="form-control" 
                        placeholder="Apellido Materno"
                        value={ apellidoMaterno }
                        onChange={e => setApellidoMaterno(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" 
                    className="form-control" 
                    placeholder="Correo" 
                    value={ correo }
                    onChange={e => setCorreo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sexo</label>   
                    <br/>
                    {
                        sexos.map((item,index) => (
                            <Sexo key={index} sexo={ codigoSexo } codigo={item.codigo} nombre={item.nombre} letra={item.letra}/>
                        ))
                    }
                </div>

                {
                    modoEditado ? (
                        <div className="form-group">
                            <label>Fecha Nacimiento</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="DD/MM/AAAA" 
                            value={ fechaNacimiento }
                            onChange={e => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                    ):(
                        <div className="form-group">
                            <label>Fecha Nacimiento</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="DD/MM/AAAA" 
                            value={ fechaNacimiento }
                            />
                        </div>
                    ) 
                }
                <div className="form-group">
                    <label>Regiones</label>
                    <select className="form-control">
                    {
                        regiones.map((item,index) => item.codigo === idRegion ?
                            (<option key={ index } selected="true" value={ idRegion }> {item.nombre}</option>) 
                            :
                            (<option key={ index } value={ idRegion }> {item.nombre}</option>)
                        )
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>Ciudades</label>
                    <select className="form-control">
                    {
                        ciudades.map((item,index) =>  item.codigo === idCiudad ?
                         (
                             <option key={ index }  selected="true" value={ idCiudad }>{item.nombre}</option>
                         ):(
                            <option key={ index }  value={ idCiudad } >{item.nombre}</option>
                         )
                        )
                    }

                    </select>
                </div>
                <div className="form-group">
                    <label>Comunas</label>
                    <select className="form-control">
                    {
                        comunas.map((item,index) => item.codigo === idComuna ? 
                            (
                                <option key={ index } selected="true" value={ idComuna } >{ item.nombre }</option>
                            ):(
                                <option key={ index } value={ idComuna }>{ item.nombre }</option>
                            )
                        )
                    }

                    </select>
                </div>
                <div className="form-group">
                    <label>Direccion</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Direccion" 
                    value={ direccion }
                    onChange={e => setDireccion(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Telefono</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Telefono" 
                    value={ telefono }
                    onChange={e => setTelefono(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Comentario</label>
                    <textarea class="form-control" 
                              id="exampleFormControlTextarea1" 
                              placeholder="Comenatrio"
                              rows="3"
                              value={ comentario }
                              onChange={e => setComentario(e.target.value)}/>
                </div>

                <div className="text-right">
                    <Link className="btn btn-outline-secondary mr-3" to={`/`}>Volver</Link>   
                    {
                    modoEditado ? (
                        <button className="btn btn-outline-primary" type="submit">Agregar</button>
                        ):(
                        <button className="btn btn-outline-success" type="submit">Modificar</button>
                        )
                    }
                </div>

            </form>
        </div>
    )
}

export default Usuario
