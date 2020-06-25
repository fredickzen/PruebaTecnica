import React from 'react'

const Sexo = (props) => {
    console.log(props);

    const [codigoSexo, setCodigoSexo] = React.useState(0);

    return (
        <div className="form-check form-check-inline">
        {
            (props.codigo  === props.sexo) ? (
                <input className="form-check-input ml-3" 
                type="radio" 
                name="inlineRadioOptions" 
                id={props.letra} 
                key={props.codigo}
                checked
                onChange={e => setCodigoSexo(e.target.value)}

                />

            ) : (
                <input className="form-check-input ml-3" 
                type="radio" 
                name="inlineRadioOptions" 
                id={props.letra} 
                key={props.codigo}
                value={ codigoSexo }
                onChange={e => setCodigoSexo(e.target.value)}
                />   
            )
        }
        <label className="form-check-label" for="inlineRadioOptions">
            {props.nombre}
        </label>  
        </div>        
    )
}

export default Sexo
