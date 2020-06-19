import React, { Component } from 'react';
import { 
    //Alert,
    Badge,
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Col, 
    Collapse,
    FormFeedback,
    FormGroup,
    Label,
    Row, 
    Button,
    ButtonGroup,
    ButtonToolbar,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader,
    Input,
    InputGroup,
    InputGroupAddon,
   
} from 'reactstrap';

import ReactTooltip from 'react-tooltip';
import SimpleBar from 'simplebar-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CustomSelect from '../ui/CustomSelect';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { validate as validateRut, format as formatRut } from 'rut.js';
import 'simplebar/dist/simplebar.css';
import '../css/simpleBar.css';
//import CustomJobOfferPreview from '../../components/UI/CustomJobOfferPreview';
//import CustomPopover from '../../components/UI/CustomPopover';
/* Table Bootstrap 2 */

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import '../css/rc-pagination.css'
//import { opcionesStateJobOffer } from '../../data/parameters';

import { Formik, Form as FormFormik } from 'formik';

//import '../../css/textSizes.css';

import {isMobile} from 'react-device-detect';

//import CustomSelect from '../../components/UI/CustomSelect';

/**
 * Data Ranges
 */
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
//  import 'react-dates/lib/css/_datepicker.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import esLocale from 'moment/locale/es';
import moment from 'moment-timezone';

import { isIterable } from '../utiles';

import { webConfig } from '../GlobalConfig';

import { obtenerPersonas , obtenerRegiones, obtenerCiudades, obtenerComunas, createPersona, obtenerUnaPersonas, updatePersona, deletePersona} from '../actions/serviciosAction';

// Redux
import { connect } from 'react-redux';

class Grilla extends Component {

    columnsGrid = [
        {
            dataField: 'id',
            text: 'Id',
            hidden: true,
            headerStyle: (colum, colIndex) => {
            return { width: 'auto', textAlign: 'left' };
            },
            sort: true
        },
        {
            dataField: 'nombre',
            text: 'Nombre',
            sort: false,
            hidden: false,
            headerStyle: (colum, colIndex) => {
            return { width: 'auto', textAlign: 'left' };
            },
        }, 
        {
            dataField: 'runCuerpo',
            isDummyField: true,
            sort: false,
            text: 'R.U.T',
            headerStyle: (colum, colIndex) => {
				return { width: 'auto', textAlign: 'center' };
			},
            formatter: (cellContent, row) => {

                return(
                    <div className="text-right">
                         {row.runCuerpo + "-" + row.runDigito}
                    </div>
                );
                
            },
            style: {
                'whiteSpace': 'wrap',
                "verticalAlign": "middle"
            }
        }, 
        {
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acciones',
            headerStyle: (colum, colIndex) => {
				return { width: 'auto', textAlign: 'center' };
            },
            style: { 
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle",
                textAlign: "center"
            },
            formatter: (cellContent, row) => {
                
                return(
                    <Row className="justify-content-center align-items-center">
                        <ReactTooltip id={"btnEdit_" + row.id}>
                        </ReactTooltip> 
                       
                        <ReactTooltip id={"btnDelete_" + row.id}>
                        </ReactTooltip>  
                        
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button disabled={row.estado === 'revision'} data-for={"btnEdit_" + row.id} data-tip={"Editar persona cód: " +  row.id}  color="primary" onClick={(e) => { 
                                    
                                    this.props.obtenerUnaPersonas({ id: row.id });
                                } } >
                                    <i className="fa fa-edit"></i>
                                </Button>

                                <Button data-for={"btnDelete_" + row.id} data-tip={"Eliminar persona cód: " +  row.id} color="danger" onClick={(e) => { 
                                     this.confirmWindow({title : 'Confirmar Eliminar', message : `Seguro que desea eliminar persona(${ row.nombre + ' | Id: ' + row.id}) ?`, 
                                     onClickYes : () => { this.eliminarPersona(row.id); }, 
                                     onClickNo : null })
                                } } >
                                    <i className="fa fa-eraser"></i>
                                   
                                     
                                </Button>

                            </ButtonGroup>
                        </ButtonToolbar>
                    
                    </Row>
                );
                
            }
        },];

    constructor(props) {
        super(props);
        registerLocale('es', es);

        moment.updateLocale("es", esLocale);
        
        this.state = {
            listaPersonasGrid: [],
            listaPersonas: [],
            listaRegiones: [],
            listaCiudades: [],
            listaComunas: [],
            unaPersona: null,
            bCreatePersona: null,
            actualizarUnaPersona: null,
            eliminarUnaPersona: null,
            /* Grid */
            pageNumber: 1,
            pageSize: 10,
            totalRegister: 0,

            /**
			 * Modal
			 */
            modal: false,
            modalSize: '',
            modalMsjButttoOk: 'Entendido!',
            classNameModal: "",
            titleModal: "",
            contentModal: <div></div>,
            hiddenFooterModal: false,

            
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePageChange = this.handleSizePageChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.onClick_CreatePersona = this.onClick_CreatePersona.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);
        this.createFrom = this.createFrom.bind(this);
        this.notify = this.notify.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onChangeRegiones = this.onChangeRegiones.bind(this);
        this.onChangeCiudades = this.onChangeCiudades.bind(this);
        this.onChangeComunas = this.onChangeComunas.bind(this);
        this.confirmWindow = this.confirmWindow.bind(this);
        this.eliminarPersona = this.eliminarPersona.bind(this);
    }

    componentDidMount() {
       
        this.props.obtenerPersonas({pageIndex: this.state.pageNumber, pageSize: this.state.pageSize});

        this.props.obtenerRegiones({});

        this.props.obtenerCiudades({regionCodigo : null});
        this.props.obtenerComunas({ciudadCodigo : null});
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        if(nextProps.listaPersonas !== this.state.listaPersonas){

            console.log(nextProps.listaPersonas);
            if(nextProps.listaPersonas && nextProps.listaPersonas.result){
                this.setState({
                    listaPersonas:nextProps.listaPersonas,
                    listaPersonasGrid: nextProps.listaPersonas.result.results,
                    totalRegister: nextProps.listaPersonas.result.rowCount
                });
             }else{
                this.setState({listaPersonas: [], totalRegister: 0});
             }
        }

        if(nextProps.listaRegiones !== this.state.listaRegiones){

            //console.log(nextProps.listaRegiones);

            if(nextProps.listaRegiones && nextProps.listaRegiones.result){

                const opcionesRegiones = nextProps.listaRegiones.result.map( item => {
                    return { value: item.codigo, label: item.nombre };
                });

                this.setState({
                    listaRegiones: opcionesRegiones,
                });
             }else{
                this.setState({listaRegiones: []});
             }
        }

        if(nextProps.listaCiudades !== this.state.listaCiudades){

            //console.log(nextProps.listaCiudades);

            if(nextProps.listaCiudades && nextProps.listaCiudades.result){

                const opcionesCiudades = nextProps.listaCiudades.result.map( item => {
                    return { value: item.codigo, label: item.nombre };
                });

                this.setState({
                    listaCiudades: opcionesCiudades,
                });
             }else{
                this.setState({listaCiudades: []});
             }
        }

        if(nextProps.listaComunas !== this.state.listaComunas){

            //console.log(nextProps.listaCiudades);

            if(nextProps.listaComunas && nextProps.listaComunas.result){

                const opcionesComunas = nextProps.listaComunas.result.map( item => {
                    return { value: item.codigo, label: item.nombre };
                });

                this.setState({
                    listaComunas: opcionesComunas,
                });
             }else{
                this.setState({listaComunas: []});
             }
        }

        if(nextProps.bCreatePersona !== this.state.bCreatePersona){

            //console.log(nextProps.bCreatePersona);

            if(nextProps.bCreatePersona && !nextProps.bCreatePersona.error){
                this.notify("Persona creada con exito...", true);
                this.setState({
                    bCreatePersona: nextProps.bCreatePersona ,
                });
                this.props.obtenerPersonas({PageIndex: this.state.pageNumber, PageSize: this.state.pageSize});
             }else if(nextProps.bCreatePersona && nextProps.bCreatePersona.error){
                this.notify("No ha sido posible crear la persona...", true);
                this.setState({bCreatePersona: nextProps.bCreatePersona});
             }
        }
        
        if(nextProps.unaPersona !== this.state.unaPersona){

            //console.log(nextProps.unaPersona);

            if(nextProps.unaPersona && nextProps.unaPersona.result){

                this.onClick_CreatePersona(nextProps.unaPersona.result);

                this.setState({
                    unaPersona: nextProps.unaPersona,
                });

             }
        }

        if(nextProps.actualizarUnaPersona !== this.state.actualizarUnaPersona){

            //console.log(nextProps.actualizarUnaPersona);

            if(nextProps.actualizarUnaPersona && !nextProps.actualizarUnaPersona.error){
                this.notify("Persona actualizada con exito...", true);
                this.setState({
                    actualizarUnaPersona: nextProps.actualizarUnaPersona ,
                });
                this.props.obtenerPersonas({PageIndex: this.state.pageNumber, PageSize: this.state.pageSize});
             }else if(nextProps.actualizarUnaPersona && nextProps.actualizarUnaPersona.error){
                this.notify("No ha sido posible actualizar la persona...", true);
                this.setState({actualizarUnaPersona: null});
                this.setState({
                    actualizarUnaPersona: nextProps.actualizarUnaPersona ,
                });
             }
        }
        
        if(nextProps.eliminarUnaPersona !== this.state.eliminarUnaPersona){

            //console.log(nextProps.actualizarUnaPersona);

            if(nextProps.eliminarUnaPersona && !nextProps.eliminarUnaPersona.error){
                this.notify("Persona eliminada con exito...", true);
                this.setState({
                    eliminarUnaPersona: nextProps.eliminarUnaPersona ,
                });
                this.props.obtenerPersonas({PageIndex: this.state.pageNumber, PageSize: this.state.pageSize});
             }else if(nextProps.eliminarUnaPersona && nextProps.eliminarUnaPersona.error){
                this.notify("No ha sido posible eliminar a la persona...", true);
                this.setState({actualizarUnaPersona: null});
                this.setState({
                    eliminarUnaPersona: nextProps.eliminarUnaPersona ,
                });
             }
        }
    }

    handlePageChange(pageNumber, pageSize) {
       console.log();
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        });

        this.props.obtenerPersonas({PageIndex : pageNumber, PageSize : pageSize});
    }

    handleSizePageChange(pageNumber, pageSize){
        this.setState({
            pageNumber: pageNumber,
            pageSize:pageSize
        });

        this.props.obtenerPersonas({PageIndex : pageNumber, PageSize : pageSize});
    }

    handleTableChange = (type, { sortField, sortOrder, data }) => {
        
    }

    onChangeRegiones = (e) => {

        if(e){
            this.props.obtenerCiudades({regionCodigo : e.value});
        }

    }

    onChangeCiudades(e){
        if(e){
            this.props.obtenerComunas({ciudadCodigo : e.value});
        }
    }

    onChangeComunas(e){
        console.log(e);
    }

    onClick_CreatePersona = (e) => {

        console.log(e);

        let bEvaluarFechaNacimiento = false;
    
        let initialValues = {  
            id: null,
            run: '', 
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            sexo: '',
            direccion: '',
            telefono: '',
            observaciones: '',
            region: null,
            ciudad: null,
            comuna: null,
            email: '',
            fechaNacimiento: new Date()
        };

        if(e){

            const region = this.state.listaRegiones.find(item => item.value ==  e.regionCodigo);
            const ciudad = this.state.listaCiudades.find(item => item.value ==  e.ciudadCodigo);
            const comuna = this.state.listaComunas.find(item => item.value ==  e.comunaCodigo);

            initialValues =
            {
                id: e.id,
                run: e.runCuerpo ? e.runCuerpo + '-' + e.runDigito : 0, 
                nombres: e.nombres ? e.nombres: '',
                apellidoPaterno: e.apellidoPaterno ? e.apellidoPaterno : '',
                apellidoMaterno: e.apellidoMaterno ? e.apellidoMaterno : '',
                sexo: e.sexoCodigo ? e.sexoCodigo : 100,
                direccion: e.direccion ? e.direccion : '',
                telefono: e.telefono ? e.telefono : 0,
                observaciones: e.observaciones ? e.observaciones : '',
                region: e.regionCodigo ? { value: e.regionCodigo ? e.regionCodigo : 0, label: region ? region.label: 's/d'} : null,
                ciudad: e.ciudadCodigo ? { value: e.ciudadCodigo ? e.ciudadCodigo : 0, label: ciudad ? ciudad.label : 's/d'} : null,
                comuna: e.comunaCodigo ? { value: e.comunaCodigo ? e.comunaCodigo : 0, label: comuna ? comuna.label: 's/d'} : null,
                email: e.email ? e.email : '',
                fechaNacimiento: e.fechaNacimiento ? new Date(e.fechaNacimiento) : new Date(),
            };
        }

        const content =
        <React.Fragment>
            
            <Formik
                // enableReinitialize={true}
                initialValues={initialValues}
                validate={ (values) => {

                    let errors = {};
                    
                    if (!values.run) {
                        errors.run = 'Campo R.U.N es requerido .';
                    }else if(!validateRut(values.run)){
                        errors.run = 'Debe ser un R.U.N valido.';
                    }else{
                        values.run = formatRut(values.run);
                    }

                    if (!values.nombres) {
                        errors.nombres = 'Campo Nombre es requerido.';
                    }else if(values.nombres.length > 100){
                        errors.nombres = 'Campo Nombre debe ser de largo máximo 100 carácteres.';
                    }

                    if (!values.apellidoPaterno) {
                        errors.apellidoPaterno = 'Campo Apellido Paterno es requerido.';
                    }else if(values.apellidoPaterno.length > 100){
                        errors.apellidoPaterno = 'Campo Apellido Paterno debe ser de largo máximo 100 carácteres.';
                    }

                    if (!values.apellidoMaterno) {
                        errors.apellidoMaterno = 'Campo Apellido Materno es requerido.';
                    }else if(values.apellidoMaterno.length > 100){
                        errors.apellidoMaterno = 'Campo Apellido Materno debe ser de largo máximo 100 carácteres.';
                    }

                    if (!values.email) {
                        errors.email = 'Campo Email es requerido.';
                    }else if(values.email.length > 100){
                        errors.email = 'Campo Email debe ser de largo máximo 100 carácteres.';
                    }else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Debe proporcial un email valido.';
                    }

                    if(!values.fechaNacimiento){
                        errors.fechaNacimiento = 'Campo Fecha de Nacimiento es requerido.';
                    }

                    if(!values.sexo){
                        errors.sexo = 'Debe seleccionar el género.';
                    }

                    if (!values.direccion) {
                        errors.direccion = 'Campo Dirección es requerido.';
                    }else if(values.direccion.length > 100){
                        errors.direccion = 'Campo Dirección debe ser de largo máximo 100 carácteres.';
                    }

                    if (!values.telefono) {
                        errors.telefono = 'Campo Teléfono es requerido.';
                    }else if(parseInt(values.telefono) > 999999999){
                        errors.telefono = 'Campo Teléfono debe ser de un número menor a 999999999.';
                    }

                    if (isNaN( values.telefono)) {
                        errors.telefono = 'Campo Teléfono debe ser numérico.';
                    }
                    
                    if (!values.observaciones) {
                        errors.observaciones = 'Campo Teléfono es requerido.';
                    }else if(values.observaciones.length > 1000){
                        errors.observaciones = 'Campo Teléfono debe ser de largo máximo 100 carácteres.';
                    }
                    
                    if(!values.region){
                        errors.region = 'Debe seleccionar la región.';
                    }

                    if(!values.ciudad){
                        errors.ciudad = 'Debe seleccionar la ciudad.';
                    }

                    if(!values.comuna){
                        errors.comuna = 'Debe seleccionar la comuna.';
                    }

                    bEvaluarFechaNacimiento = true;
                    
                    return errors;

                    
                }}
                
                onSubmit={(values, { setSubmitting }) => {

					
                    this.setSubmitting = setSubmitting;
                    this.setSubmitting(false);
                    console.log(values);
                    if(values.id === null){
                        this.notify("Creando Persona...", true);
                       
                        let rut = values.run;
                        rut = rut.replace('.','').replace('.','').replace('-','');
                        rut = rut.substring(0, String(rut).length - 1);
                        console.log(rut);
                        
                        this.props.createPersona({
                            Id : null,
                            Run : '',
                            RunCuerpo : parseInt(rut),
                            RunDigito : String(values.run).substring(String(values.run).length - 1, String(values.run).length),
                            Nombre : values.nombres,
                            Nombres : values.nombres,
                            ApellidoPaterno : values.apellidoPaterno,
                            ApellidoMaterno : values.apellidoMaterno,
                            Email : values.email,
                            SexoCodigo : parseInt(values.sexo),
                            FechaNacimiento : new Date(values.fechaNacimiento).toISOString(),
                            RegionCodigo : values.region.value,
                            CiudadCodigo : values.ciudad.value,
                            ComunaCodigo : values.comuna.value,
                            Direccion : values.direccion,
                            Telefono : parseInt(values.telefono) ,
                            Observaciones : values.observaciones
                        });
                    }else{
                        this.notify("Actualizando Persona...", true);
                       
                        let rut = values.run;
                        rut = rut.replace('.','').replace('.','').replace('-','');
                        rut = rut.substring(0, String(rut).length - 1);
                        console.log(rut);
                        this.props.updatePersona({
                            Id : values.id,
                            Run : '',
                            RunCuerpo : parseInt(rut) ,
                            RunDigito : String(values.run).substring(String(values.run).length - 1, String(values.run).length),
                            Nombre : values.nombres,
                            Nombres : values.nombres,
                            ApellidoPaterno : values.apellidoPaterno,
                            ApellidoMaterno : values.apellidoMaterno,
                            Email : values.email,
                            SexoCodigo : parseInt(values.sexo),
                            FechaNacimiento : new Date(values.fechaNacimiento).toISOString(),
                            RegionCodigo : values.region.value,
                            CiudadCodigo : values.ciudad.value,
                            ComunaCodigo : values.comuna.value,
                            Direccion : values.direccion,
                            Telefono : parseInt(values.telefono) ,
                            Observaciones : values.observaciones
                        });
                    }

                    this.setState({
                        modal: false,
                    });
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    setFieldTouched,
                    validateForm 
                    /* and other goodies */
                }) => {
                    
                    return (
                    <FormFormik onSubmit={handleSubmit}>
                        <React.Fragment> {/** Crear Oferta de Trabajo */}
							
							<Row>
								<Col xs="12">
                                    {/* RUN */}
                                    <FormGroup>
										<Label htmlFor="run">R.U.N<i className="text-danger">★</i></Label>
										<Input type="text" id="run" 
											name="run"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.run || ''}
											placeholder='Por ej. 11.111.111-1'
											valid={values.run !== '' && touched.run}
											invalid={errors.run !== undefined  && touched.run} ></Input>
										<FormFeedback className="help-block">{errors.run && touched.run && errors.run}</FormFeedback>
                                        
									</FormGroup>

									<FormGroup>
										<Label htmlFor="nombres">Nombre<i className="text-danger">★</i></Label>
										<Input type="text" id="nombres" 
											name="nombres"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.nombres || ''}
											placeholder='Nombres...'
											valid={values.nombres !== '' && touched.nombres}
											invalid={errors.nombres !== undefined  && touched.nombres} ></Input>
										<FormFeedback className="help-block">{errors.nombres && touched.nombres && errors.nombres}</FormFeedback>
                                        <p className={ values.nombres.length > 100 ? "text-danger small" :"small"}>{values.nombres.length + " / 100" }</p>
									</FormGroup>

                                    <FormGroup>
										<Label htmlFor="apellidoPaterno">Apellido Paterno<i className="text-danger">★</i></Label>
										<Input type="text" id="apellidoPaterno" 
											name="apellidoPaterno"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.apellidoPaterno || ''}
											placeholder='Apellido Paterno...'
											valid={values.apellidoPaterno !== '' && touched.apellidoPaterno}
											invalid={errors.apellidoPaterno !== undefined  && touched.apellidoPaterno} ></Input>
										<FormFeedback className="help-block">{errors.apellidoPaterno && touched.apellidoPaterno && errors.apellidoPaterno}</FormFeedback>
                                        <p className={ values.apellidoPaterno.length > 100 ? "text-danger small" :"small"}>{values.apellidoPaterno.length + " / 100" }</p>
									</FormGroup>

                                    <FormGroup>
										<Label htmlFor="apellidoMaterno">Apellido Materno<i className="text-danger">★</i></Label>
										<Input type="text" id="apellidoMaterno" 
											name="apellidoMaterno"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.apellidoMaterno || ''}
											placeholder='Apellido Materno...'
											valid={values.apellidoMaterno !== '' && touched.apellidoMaterno}
											invalid={errors.apellidoMaterno !== undefined  && touched.apellidoMaterno} ></Input>
										<FormFeedback className="help-block">{errors.apellidoMaterno && touched.apellidoMaterno && errors.apellidoMaterno}</FormFeedback>
                                        <p className={ values.apellidoMaterno.length > 100 ? "text-danger small" :"small"}>{values.apellidoMaterno.length + " / 100" }</p>
									</FormGroup>

                                    <FormGroup>
										<Label htmlFor="email">Email<i className="text-danger">★</i></Label>
										<Input type="text" id="email" 
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email || ''}
											placeholder='Email...'
											valid={values.email !== '' && touched.email}
											invalid={errors.email !== undefined  && touched.email} ></Input>
										<FormFeedback className="help-block">{errors.email && touched.email && errors.email}</FormFeedback>
                                        <p className={ values.email.length > 100 ? "text-danger small" :"small"}>{values.email.length + " / 100" }</p>
									</FormGroup>


                                    <FormGroup check inline>
                                        <Input className="form-check-input" type="radio" id="inline-radio1" name="sexo" checked={values.sexo === 100 ? true: false} value={100} onChange={sexo => {
                                            
                                            this.setState({sexo: 100});
                                            return setFieldValue("sexo", 100);
                                        }}
											onBlur={handleBlur} />
                                        <Label className="form-check-label" check htmlFor="inline-radio1">Masculino</Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Input className="form-check-input" type="radio" id="inline-radio2" name="sexo" checked={values.sexo === 200 ? true: false} value={200}  onChange={sexo => {
                                          
                                           
                                           this.setState({sexo: 200});
                                           return setFieldValue("sexo", 200);
                                        }}
											onBlur={handleBlur} />
                                        <Label className="form-check-label" check htmlFor="inline-radio2">Femenino</Label>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                                    <div>
                                    <DatePicker className="form-control"
                                        id="fechaNacimiento"
                                        dateFormat="dd MMM yyyy"
                                        showYearDropdown
                                        showMonthDropdown
                                        locale="es"
                                        selected={values.fechaNacimiento}
                                        onChange={date => {
                                            return setFieldValue("fechaNacimiento", date);
                                        }}
                                        valid={values.fechaNacimiento}
											invalid={errors.fechaNacimiento} 
                                    ></DatePicker> 
                                    { !values.fechaNacimiento && bEvaluarFechaNacimiento? <p className="text-danger small">El campo Fecha de Naciemitno es requerido.</p> : null }
                                    </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="region">Región</Label>
                                        <CustomSelect
                                            id={"region"}
                                            placeholder={'Seleccione la región...'}
                                            nameAttr={'region'}
                                            onChange={(e,a) => {
                                                this.onChangeRegiones(a);
                                                return setFieldValue(e,a);
                                            }}
                                            onBlur={setFieldTouched}
                                            value={values.region}
                                            // isLoading={this.state.isLoadingSelectPresencialComunas}
                                            options={this.state.listaRegiones || []}
                                            errors={errors.region}
                                            touched={touched.region}
                                            invalid={errors.region !== undefined && touched.region }
                                            defaultValue={{ label: 2002, value: 2002 }}
                                        ></CustomSelect>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="ciudad">Ciudad</Label>
                                        <CustomSelect
                                            id={"ciudad"}
                                            placeholder={'Seleccione la ciudad...'}
                                            nameAttr={'ciudad'}
                                            onChange={(e,a) => {
                                                this.onChangeCiudades(a);
                                                return setFieldValue(e,a);
                                            }}
                                            onBlur={setFieldTouched}
                                            value={values.ciudad}
                                            // isLoading={this.state.isLoadingSelectPresencialComunas}
                                            options={this.state.listaCiudades || []}
                                            errors={errors.ciudad}
                                            touched={touched.ciudad}
                                            invalid={errors.ciudad !== undefined && touched.ciudad }
                                        ></CustomSelect>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="comuna">Comuna</Label>
                                        <CustomSelect
                                            id={"comuna"}
                                            placeholder={'Seleccione la comuna...'}
                                            nameAttr={'comuna'}
                                            onChange={(e,a) => {
                                                this.onChangeComunas(a);
                                                
                                                return setFieldValue(e,a);
                                            }}
                                            onBlur={setFieldTouched}
                                            value={values.comuna}
                                            // isLoading={this.state.isLoadingSelectPresencialComunas}
                                            options={this.state.listaComunas || []}
                                            errors={errors.comuna}
                                            touched={touched.comuna}
                                            invalid={errors.comuna !== undefined && touched.comuna }
                                        ></CustomSelect>
                                    </FormGroup>

                                    <FormGroup>
										<Label htmlFor="direccion">Dirección<i className="text-danger">★</i></Label>
										<Input type="text" id="direccion" 
											name="direccion"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.direccion || ''}
											placeholder='Dirección...'
											valid={values.direccion !== '' && touched.direccion}
											invalid={errors.direccion !== undefined  && touched.direccion} ></Input>
										<FormFeedback className="help-block">{errors.direccion && touched.direccion && errors.direccion}</FormFeedback>
                                        <p className={ values.direccion.length > 100 ? "text-danger small" :"small"}>{values.direccion.length + " / 100" }</p>
									</FormGroup>

                                    <FormGroup>
										<Label htmlFor="telefono">Teléfono<i className="text-danger">★</i></Label>
										<Input type="text" id="telefono" 
											name="telefono"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.telefono || ''}
											placeholder='Teléfono...'
											valid={values.telefono !== '' && touched.telefono}
											invalid={errors.telefono !== undefined  && touched.telefono} ></Input>
										<FormFeedback className="help-block">{errors.telefono && touched.telefono && errors.telefono}</FormFeedback>
                                        <p className={ String(values.telefono).length > 100 ? "text-danger small" :"small"}>{String(values.telefono).length + " / 100" }</p>
									</FormGroup>

                                    <FormGroup>
                                    <Label htmlFor="observaciones">Observacions<i className="text-danger">★</i></Label>
                                    <Input type="textarea" id="observaciones" 
                                        rows="9"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.observaciones || ''}
                                        placeholder='Observaciones...'
                                        valid={values.observaciones !== '' && touched.observaciones }
                                        invalid={errors.observaciones !== undefined && touched.observaciones } ></Input>
                                    <FormFeedback className="help-block">{errors.observaciones && touched.observaciones && errors.observaciones}</FormFeedback>
                                    <p className={ values.observaciones.length > 1000 ? "text-danger small" :"small"}>{values.observaciones.length + " / 1000" }</p>
                                </FormGroup>

								</Col>
							</Row>
							
                        </React.Fragment>
                        
						<React.Fragment>
							<Row>
								<Col xs="12">
									<Button block color="success" type="submit" disabled={isSubmitting} onClick={(e) => this.createFrom(e, "create")} >
									Crear
									</Button>
								</Col>
							</Row>
						</React.Fragment>
                    </FormFormik>
                    );
                }}
                </Formik>
       
        </React.Fragment>

        this.setOpenModal(true, 'lg', 'Listo!', 'modal-info', "Crear Persona", true, content);
    }

    eliminarPersona = (id) => {
        this.props.deletePersona({Id: id});
    }

    setOpenModal(isOpen, size, modalMsjButttoOk,classNameModal, titleModal, hiddenFooterModal,contentModal) {
        this.setState({
          modal: isOpen,
          modalSize: size,
          modalMsjButttoOk: modalMsjButttoOk,
          classNameModal: classNameModal,
          titleModal: titleModal,
          contentModal: contentModal,
          hiddenFooterModal: hiddenFooterModal,
        });
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
    }

    createFrom = (e, action) => {


    }

    /**
     * Notify
     */
    toastId = null;

    notify = (msj, autoClose) => { 
        
        this.toastId = toast.info(msj, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose
        }); 
    }

    dismissNotify = () =>  {

        setTimeout(() => {
            if(this.toastId){
                toast.dismiss(this.toastId);
                this.toastId = null;

                
            }
        }, 10);
        
    }

    confirmWindow = ({title = 'Confirm to submit', message = 'Are you sure to do this.', onClickYes = null, onClickNo = null }) => {
        confirmAlert({
          title: title,
          message: message,
          buttons: [
            {
              label: 'Sí',
              onClick: onClickYes
            },
            {
              label: 'No',
              onClick: onClickNo
            }
          ]
        });
      };

    render() {

        const customPaginator = (handlePageChange, pageNumber, pageSize, total) => {

            const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
            '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
            '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
            '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

            const doublePath = [
            'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' +
            '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' +
            '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            ];

            const getSvgIcon = (path, reverse, type) => {
            const paths = Array.isArray(path) ? path : [path];
            const renderPaths = paths.map((p, i) => {
                return (
                <path key={i} d={p} />
                );
            });
            return (
                <i className={`custom-icon-${type}`} style={{
                fontSize: '16px',
                }}
                >
                <svg
                    viewBox="0 0 1024 1024"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    style={{
                    verticalAlign: '-.125em',
                    transform: `rotate(${reverse ?  180 : 0}deg)`,
                    }}
                >
                    {renderPaths}
                </svg>
                </i>
            );
            };

            const nextIcon = getSvgIcon(arrowPath, false, 'next');
            const prevIcon = getSvgIcon(arrowPath, true, 'prev');
            const jumpNextIcon = () => getSvgIcon(doublePath, false, 'jump-next');
            const jumpPrevIcon = () => getSvgIcon(doublePath, true, 'jump-prev');

            const iconsProps = {
                prevIcon,
                nextIcon,
                jumpPrevIcon,
                jumpNextIcon,
              } ;

            
              
            if(isMobile){

                return (   
                    <Row>
                        
                        <Col xs="12" className="align-self-center">
                            <div className="d-flex justify-content-center justify-content-lg-end">
                                <Pagination 
                                    onChange={handlePageChange} 
                                    onShowSizeChange={this.handleSizePageChange}
                                    current={pageNumber} 
                                    total={total} 
                                    pageSize={pageSize}
                                    selectComponentClass={Select}
                                    {...iconsProps}
                                    showLessItems
                                    showTitle={false}
                                    
                                ></Pagination>
                            </div>                                   
                        </Col>
                    </Row>
    
                );
            }

            return (   
                <Row>
                    
                    <Col xs="12" className="align-self-center">
                        <div className="d-flex justify-content-center justify-content-lg-end">
                            <Pagination 
                                onChange={handlePageChange} 
                                onShowSizeChange={this.handleSizePageChange}
                                current={pageNumber} 
                                total={total} 
                                pageSizeOptions={["5","10","20","30","40","50"]}
                                pageSize={pageSize}
                                selectComponentClass={Select}
                                showQuickJumper
                                showSizeChanger
                                showLessItems
                                showTitle={false}
                                showPrevNextJumpers={true}
                                {...iconsProps}
                                showTotal={(total, range) => (
                                    <div>
                                        mostrando {range[0]} - {range[1]} de {total} registros
                                    </div>
                                )}
                                 
                                locale={{
                                    // Options.jsx
                                    items_per_page: '/ personas',
                                    jump_to: 'Ir a',
                                    jump_to_confirm: 'confirmar',
                                    page: '',
                                  
                                    // Pagination.jsx
                                    prev_page: 'Página anterior',
                                    next_page: 'Página siguiente',
                                    prev_5: '5 páginas previas',
                                    next_5: '5 páginas siguientes',
                                    prev_3: '3 páginas previas',
                                    next_3: '3 páginas siguientes'
                                  }}
                                ></Pagination>
                        </div>                                   
                    </Col>
                </Row>

            );
        }
  
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggleModal}>&times;</button>;
        return (
            <div>
                 <Row className="mb-2">
                    <Col className="align-self-center">
                        <strong >Gestionar Personas</strong>
                    </Col>
                    <Col>
                        <div className="card-header-actions">
                            <Button block color="success" onClick={(e) => this.onClick_CreatePersona(null) }> 
                                <div className="align-self-center">
                                    Crear Persona
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        
                        <BootstrapTable
                            id="mapping_table"
                            striped
                            hover
                            condensed
                            bootstrap4
                            remote
                            ref={ n => this.node = n }
                            
                            keyField='id'
                            //caption="Plain text header"
                            noDataIndication={ 
                                () =>
                                <strong>Sin datos...</strong>
                            }
                            data={ this.state.listaPersonasGrid } 

                            columns={ this.columnsGrid } 
                            onTableChange={ this.handleTableChange }
                        ></BootstrapTable>
                        {customPaginator(this.handlePageChange, this.state.pageNumber, this.state.pageSize, this.state.totalRegister)}
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} size={this.state.modalSize} 
                    className={this.state.classNameModal + " " + this.props.className} external={externalCloseBtn}>
                    <ModalHeader toggle={this.toggleModal} >{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        { this.state.contentModal }
                    </ModalBody>
                    <ModalFooter hidden={this.state.hiddenFooterModal}>
                        <Button color="info" onClick={this.toggleModal}>{ this.state.modalMsjButttoOk }</Button>{' '}
                    </ModalFooter>
                </Modal>
                <ToastContainer></ToastContainer>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    listaPersonas: state.serviciosReducers.reducersObtenerPersonas,
    listaRegiones: state.serviciosReducers.reducersObtenerRegiones,
    listaCiudades: state.serviciosReducers.reducersObtenerCiudades,
    listaComunas: state.serviciosReducers.reducersObtenerComunas,
    bCreatePersona: state.serviciosReducers.reducersCrearPersona,
    unaPersona: state.serviciosReducers.reducersObtenerUnaPersona,
    actualizarUnaPersona: state.serviciosReducers.reducersActualizarUnaPersona,
    eliminarUnaPersona: state.serviciosReducers.reducersEliminarUnaPersona,
});


export default connect(mapStateToProps, { 
    obtenerPersonas,
    obtenerRegiones,
    obtenerCiudades,
    obtenerComunas,
    createPersona,
    obtenerUnaPersonas,
    updatePersona,
    deletePersona,
})(Grilla);