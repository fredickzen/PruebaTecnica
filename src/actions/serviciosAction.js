import { 
    OBTENER_PERSONAS,
    OBTENER_REGIONES,
    OBTENER_CIUDADES,
    OBTENER_COMUNAS,
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

export const obtenerRegiones = ({}) => async dispatch => {
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

    await axios.get(webConfig.urlBaseAPI + `/api/Parametros/Ciudades?RegionCodigo=${regionCodigo}`, {
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
        type: OBTENER_CIUDADES,
        payload: data
    });
}

export const obtenerComunas = ({ ciudadCodigo }) => async dispatch => {
    let data = null;
    stateSite.setLoading(true);

    await axios.get(webConfig.urlBaseAPI + `/api/Parametros/Comunas?CiudadCodigo=${ciudadCodigo}`, {
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
        type: OBTENER_COMUNAS,
        payload: data
    });
}