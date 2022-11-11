import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react'
import {CacheManager} from '../CacheManager'
import ProductGrid from "../components/ProductGrid";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Category = () => {
    let {id} = useParams()

    const [products, setProducts] = useState([] as Product[])
    const [category, setCategory] = useState({
        name: '',
        uuid: '',
    } as Category)
    const [fetchedCategory, setFetchedCategory] = useState('' as string | undefined)

    useEffect(() => {
        async function getProducts() {
            if (id === undefined) {
                return
            }
            const products = await CacheManager.getProducts(id)
            const category = await CacheManager.getCategory(id)
            setProducts(products.sort((a: Product, b: Product) => a.price - b.price))
            setFetchedCategory(id)
            if (category !== undefined) {
                setCategory(category)
            }
        }

        if (fetchedCategory !== id) {
            getProducts().then()
        }
    }, [products, id, fetchedCategory, category])
    return (
        <>
            <Row className='justify-content-between'>
                <Col>
                    <Breadcrumb>
                        <LinkContainer to={'/'}>
                            <Breadcrumb.Item href="#">Strona Główna</Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col className={'d-none d-lg-block'}>
                    <h1 className='pb-3 text-end'>{category.name}</h1>
                </Col>
            </Row>

            <ProductGrid products={products}/>
        </>
    );
};

export default Category;