import {Button, Card} from "react-bootstrap";
import {BsCheckCircle, BsFillCartFill} from "react-icons/bs";
import {FaBox} from "react-icons/fa";
import formatPrice from "../FormatPrice";

interface ProductAddToCartProps {
    product: Product
}

function ProductAddToCart(props: ProductAddToCartProps) {
    const product = props.product;
    return (
        <Card>
            <Card.Body>
                <h3 className='text-end'>{formatPrice(product.price, true)}</h3>
                <div className='text-success mb-3'><BsCheckCircle size={'1.5em'}/> Dostępny</div>
                <div className="mb-3">Darmowa dostawa dla zamówień powyżej 100zł</div>
                <Button
                    className="mb-3"
                    size='lg'
                    variant="primary"
                >
                    <BsFillCartFill size={'1.25em'} className='me-2'/> Dodaj do koszyka
                </Button><br/>
                <Button
                    className="mb-3"
                    size='lg'
                    variant="success"
                >
                    <FaBox size={'1.25em'} className='me-2'/> Kup teraz
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductAddToCart;