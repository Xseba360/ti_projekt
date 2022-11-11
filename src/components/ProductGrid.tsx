import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import formatPrice from "../FormatPrice";
import {Link} from "react-router-dom";

interface ProductGridProps {
    products: Product[];
}

function ProductGrid(props: ProductGridProps) {
    return (
        <Row sm={1} md={3} xl={4} className="g-4 align-items-stretch">
            {props.products.map((product, _) => (
                <Col key={product.uuid}>
                    <Card className={"border-0"}>
                        <Card.Img variant="top" src={product.photos[0]}/>
                        <Card.Body>
                            <Card.Title className={"d-flex justify-content-between"}>
                                <Link to={`/product/${product.uuid}`}
                                      className='m-1 stretched-link text-decoration-none text-dark'>
                                    {product.name}
                                </Link>
                                <span className='m-1 text-dark fw-normal'>{formatPrice(product.price)}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ProductGrid;