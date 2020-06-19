import { 
    OBTENER_PERSONAS,
    OBTENER_REGIONES,
    OBTENER_CIUDADES,
    OBTENER_COMUNAS,
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
        default:
            return state;
    }
}