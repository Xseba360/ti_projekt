import confused from '../assets/confused.svg'
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const NotFound = () => {
    return (
        <>
            <Row>
                <Col xs={12} sm={2} md={4}></Col>
                <Col xs={12} sm={8} md={4}>
                    <img src={confused} alt='confused' className='img-fluid'/>
                </Col>
                <Col xs={12} sm={2} md={4}></Col>
            </Row>
            <h1 className='text-center'>Ups...</h1>
            <p className='text-center'>Strona, której szukasz niestety nie istnieje</p>
            <p className='text-center'><Link to={'/'}>Wróć do strony głównej</Link></p>
        </>
    );
};

export default NotFound;