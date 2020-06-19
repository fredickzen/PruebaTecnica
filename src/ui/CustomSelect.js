import React, { Component } from 'react';
import Select from 'react-select';

import '../css/react-selectv2.css'


class CustomSelect extends Component {

    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      if(this.props.nameAttr){
        this.props.onChange(this.props.nameAttr, value);
      }
    }
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      if(this.props.nameAttr){
        if(this.props.onBlur){
          this.props.onBlur(this.props.nameAttr, true);
        }
        
      }
    }

  	customStyles = (width) => {

		let control = styles => ({ 
			...styles, 
			//backgroundColor: 'white',
			//width: "200" 
		}) ;

		if(width){
			control = styles => ({ 
				...styles, 
				//backgroundColor: 'white',
				width: width 
			}) ;
		}

		return {
			container: base => ({
				...base,
        flex: 1,
        //zIndex: 10
			  }),
			/*option: (provided, state) => ({
				...provided,
				//borderBottom: '1px dotted pink',
				//color: state.isSelected ? 'red' : 'blue',
				//padding: 20,
			}),*/
			control: control,
			/*control: () => ({
				// none of react-select's styles are passed to <Control />
				width: 200,
			}),*/
			/*singleValue: (provided, state) => {
				const opacity = state.isDisabled ? 0.5 : 1;
				const transition = 'opacity 300ms';

				return { ...provided, opacity, transition };
			}*/
		}
    }

    render() {
      return (
        <React.Fragment>
          <Select
            id={this.props.id}
            name={this.props.id}
            placeholder={this.props.placeholder}
            options={this.props.options}
            isMulti={this.props.isMulti ? true: false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            onMenuOpen={this.props.onMenuOpen}
            isSearchable={true}
            loadingMessage={() => { return "Cargando..."; }}
            isLoading={this.props.isLoading}
            isClearable={this.props.isClearable !== undefined && this.props.isClearable !== null ? this.props.isClearable : true }
            
			styles={this.customStyles(this.props.width)}
			
            theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                ...theme.colors,
                  primary25: '#20a8d8',
                  primary: '#63c2de',
                  neutral20: this.props.invalid ? '#f86c6b' : theme.colors.neutral20
                }
              })}
          
          ></Select>
          {
			this.props.errors && this.props.touched && this.props.errors ? 
			<p className="text-danger small">{this.props.errors && this.props.touched && this.props.errors}</p> :
			null
          }
          
        </React.Fragment>
      );
    }
  }

  export default CustomSelect;