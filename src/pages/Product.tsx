import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CacheManager} from "../CacheManager";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import ProductBreadcrumb from "../components/ProductBreadcrumb";
import formatPrice from "../FormatPrice";
import {BsCheckCircle, BsFillCartFill} from "react-icons/bs";
import {FaBox} from "react-icons/fa";

const Products = () => {
    let {id} = useParams()

    const [product, setProduct] = useState({
        name: '',
        uuid: '',
        price: 0,
        photos: [],
        description: '',
        category: '',
    } as Product)
    const [category, setCategory] = useState({
        name: '',
        uuid: '',
    } as Category)
    const [fetchedProduct, setFetchedProduct] = useState('' as string | undefined)

    useEffect(() => {
        async function getProduct() {
            if (id === undefined) {
                return
            }
            const product = await CacheManager.getProduct(id)
            setFetchedProduct(id)
            if (product !== undefined) {
                setProduct(product)
                const category = await CacheManager.getCategory(product.category)
                if (category !== undefined) {
                    setCategory(category)
                }
            }
        }

        if (fetchedProduct !== id) {
            getProduct().then()
        }
    }, [product, id, fetchedProduct, category])
    return (
        <>
            <div className={'d-lg-none'}>
                <ProductBreadcrumb product={product} category={category}/>
                <h1 className='pb-3'>{product.name}</h1>
            </div>
            <Row className='justify-content-between d-none d-lg-block'>
                <Col>
                    <ProductBreadcrumb product={product} category={category}/>
                </Col>
                <Col>
                    <h1 className='pb-3 text-end'>{product.name}</h1>
                </Col>
            </Row>
            <img src={product.photos[0]} width='100px' height='100px' alt={product.name}/>
            <Row className='justify-content-between'>
                <Col md={12} lg={8}>
                    <p>{product.description}</p>
                    <Accordion alwaysOpen flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Więcej informacji o produkcie</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                                Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
                                placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
                                erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit
                                eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
                                Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Instrukcja montażu</Accordion.Header>
                            <Accordion.Body>
                                <a href='https://i.postimg.cc/50kYsjGp/qa9-YG1-A-1.jpg'>Link do instrukcji PDF</a>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col xs={{span: 12, order: "first"}} lg={{span: 4, order: "last"}}>
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
                </Col>
            </Row>

        </>
    )
        ;
};

export default Products;