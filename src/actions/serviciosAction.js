import { 
    OBTENER_PERSONAS,
    OBTENER_REGIONES,
    OBTENER_CIUDADES,
    OBTENER_COMUNAS,
    CREAR_PERSONA,
    OBTENER_UNA_PERSONAS,
    ACTUALIZAR_UNA_PERSONA,
    ELIMINAR_UNA_PERSONA,
} from './types';

import { webConfig, stateSite } from '../GlobalConfig';

import axios from 'axios';

// Servicios

export const obtenerPersonas = ({PageIndex = 1, PageSize = 10}) => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Personas/Get?PageIndex=${PageIndex}&PageSize=${PageSize}`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: null,
                error : true
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: OBTENER_PERSONAS,
        payload: data
    });
}

export const obtenerRegiones = () => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Parametros/Regiones`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: null,
                error : true
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: OBTENER_REGIONES,
        payload: data
    });
}

export const obtenerCiudades = ({ regionCodigo }) => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Parametros/Ciudades${ regionCodigo ? `?RegionCodigo=${regionCodigo}` : '' }`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: null,
                error : true
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: OBTENER_CIUDADES,
        payload: data
    });
}

export const obtenerComunas = ({ ciudadCodigo }) => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Parametros/Comunas${ ciudadCodigo ? `?CiudadCodigo=${ciudadCodigo}` : '' }`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            //console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: null,
                error : true
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: OBTENER_COMUNAS,
        payload: data
    });
}

export const createPersona = (params) => async dispatch => {
    let data = {};

    console.log(params);
    stateSite.setLoading(true);

    await axios.post(webConfig.urlBaseAPI + '/api/Personas/Create', params ,{
        headers: {
          'Content-Type': 'application/json'
          
        }
      })
    .then(response => {
        console.log(response);
        
        data = {
            result: response.data,
            error: false,
            codeErrors: null
        }
        data.error = false;

    }).catch(error => {
        console.log(error);
        
        data = {
            result: null,
            error: true,
            codeErrors: null
        }

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: CREAR_PERSONA,
        payload: data
    });
}

export const obtenerUnaPersonas = ({ id = null}) => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Personas/GetOne?id=${id}`, {
        headers: {
          'Content-Type': 'application/json'/*,
          Authorization: `bearer ${token}`*/
        }
      })
        .then(response => {
            console.log(response);
            data = {
                result: response.data,
                error:false,
                codeErrors: null
            }
            data.error = false;
        }).catch((error) => {
            console.log(error.response);

            data = { 
                result: null,
                error : true
            };
        }).then((e) => {
            stateSite.setLoading(false);
        });
    
    dispatch({
        type: OBTENER_UNA_PERSONAS,
        payload: data
    });
}

export const updatePersona = (params) => async dispatch => {
    let data = {};

    console.log(params);
    stateSite.setLoading(true);

    await axios.post(webConfig.urlBaseAPI + '/api/Personas/Update', params ,{
        headers: {
          'Content-Type': 'application/json'
          
        }
      })
    .then(response => {
        console.log(response);
        
        data = {
            result: response.data,
            error: false,
            codeErrors: null
        }
        data.error = false;

    }).catch(error => {
        console.log(error);
        
        data = {
            result: null,
            error: true,
            codeErrors: null
        }

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: ACTUALIZAR_UNA_PERSONA,
        payload: data
    });
}

export const deletePersona = (params) => async dispatch => {
    let data = {};

    console.log(params);
    stateSite.setLoading(true);

    await axios.post(webConfig.urlBaseAPI + '/api/Personas/Delete', params ,{
        headers: {
          'Content-Type': 'application/json'
          
        }
      })
    .then(response => {
        console.log(response);
        
        data = {
            result: response.data,
            error: false,
            codeErrors: null
        }
        data.error = false;

    }).catch(error => {
        console.log(error);
        
        data = {
            result: null,
            error: true,
            codeErrors: null
        }

    }).then((e) => {
        stateSite.setLoading(false);
    });

    dispatch({
        type: ELIMINAR_UNA_PERSONA,
        payload: data
    });
}