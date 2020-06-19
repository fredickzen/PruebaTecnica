import { 
    OBTENER_PERSONAS,
    OBTENER_REGIONES,
    OBTENER_CIUDADES,
    OBTENER_COMUNAS,
    CREAR_PERSONA,
    OBTENER_UNA_PERSONAS,
    ACTUALIZAR_UNA_PERSONA,
    ELIMINAR_UNA_PERSONA,
} from '../actions/types';

const initialState = {
    token: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case OBTENER_PERSONAS:
            return {
                ...state,
                reducersObtenerPersonas: action.payload
            };
        case OBTENER_REGIONES:
            return {
                ...state,
                reducersObtenerRegiones: action.payload
            }
        case OBTENER_CIUDADES:
            return {
                ...state,
                reducersObtenerCiudades: action.payload
            }
        case OBTENER_COMUNAS:
            return {
                ...state,
                reducersObtenerComunas: action.payload
            }
        case CREAR_PERSONA:
            return {
                ...state,
                reducersCrearPersona: action.payload
            }
        case OBTENER_UNA_PERSONAS:
            return {
                ...state,
                reducersObtenerUnaPersona: action.payload
            } 
        case ACTUALIZAR_UNA_PERSONA:
            return {
                ...state,
                reducersActualizarUnaPersona: action.payload
            }
        case ELIMINAR_UNA_PERSONA:
            return {
                ...state,
                reducersEliminarUnaPersona: action.payload
            }
        default:
            return state;
    }
}