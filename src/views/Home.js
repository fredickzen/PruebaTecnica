
import React, { Component, Suspense } from "react";
import { Row, Col,
Card, CardBody, CardHeader, CardFooter

} from 'reactstrap';
import Spinner from "react-spinkit";

import Grilla from './Grilla';

export default class Home extends Component {

    loading = () => 
    <div className="container d-flex justify-content-center" style={{height:"100vh"}}>
        <div className="my-auto">
            <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
        </div>
    </div>

    render() {
        return (
            <div className="app">
                
                    <main className="main ml-0 mr-0">
                        <Row className="justify-content-center m-0">
                            <Col md="2" xs="0"></Col>
                            <Col md="8" xs="12" className="p-0">
                                
                                <Suspense fallback={this.loading()}>
                                    <Row>
                                        <Col className="p-0">
                                            <Card>
                                                <CardHeader>
                                                    <h3>Personas</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <Grilla></Grilla>
                                                </CardBody>
                                                <CardFooter></CardFooter>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Suspense>

                            </Col>
                            <Col md="2" xs="0"></Col>
                        </Row>
                    </main>
               
            </div>
        )
    }
}
