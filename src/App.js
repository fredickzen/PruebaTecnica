import React, { Component } from 'react';

import { 
  stateSite,
} from './GlobalConfig';

import Loadable from 'react-loadable';

import Spinner from "react-spinkit";
import Loader from 'react-loader-advanced';
import './App.scss';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const loading = () => 
<div className="container d-flex justify-content-center" style={{height:"100vh"}}>
    <div className="my-auto">
        <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
    </div>
</div>



// Home
const Home = Loadable({
    loader: () => import('./views/Home'),
    loading
});


// const Contenido = (props) => <h2 className="text-danger">{props.children}</h2>

class App extends Component {

    state = {
        isLoading: false,
        percentageUpload: ""
    }

    constructor(props){
        super(props);

        //localStorage.removeItem('tokenResult');
        //cookie.remove(webConfig.cookieNameAuth, { path: '/' })

        stateSite.setLoading = this.setLoading.bind(this);;
        stateSite.getLoading = this.getLoading.bind(this);;

        stateSite.setPercentajeUpload = this.setPercentajeUpload;
        stateSite.getPercentajeUpload = this.getPercentajeUpload;

        
    }
    
    componentDidMount(){

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
           
        }
       
    }

    componentDidUpdate (prevProps, prevState) {
        
    }

    setPercentajeUpload = (value) => {
        this.setState({
            percentageUpload: value
        });
    }

    getPercentajeUpload = () => {
        return this.state.percentageUpload;
    }

    setLoading = (value) => {
        this.setState({
            isLoading: value
        });
    }

    getLoading = () => {
        return this.state.isLoading;
    }

    render() {
        
        const spinner = 
            <div>
                <div style={{
                    position: "fixed",
                    width: "100%",
                    top: "30%"
                }} >
                    <span className="text-center text-danger font-weight-bold">{stateSite.getPercentajeUpload()}</span>
                </div>
                    
                <div style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%"
                }}>
                    
                    <div className="text-center text-info">
                        
                        <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
                    </div>
                </div>
            </div>

        return (
            
            <Provider store={store}>
                
                <Loader 
                    show={stateSite.getLoading()} 
                    message={spinner}>

                  <Home></Home>
                        
                </Loader>
                
            </Provider>   
            
        );
    }
}

export default App;


