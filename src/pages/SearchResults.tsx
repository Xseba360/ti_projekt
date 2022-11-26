import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react'
import {CacheManager} from '../CacheManager'
import ProductGrid from "../components/ProductGrid";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const SearchResults = () => {
    let {searchQuery} = useParams()
    console.log(searchQuery)
    const [products, setProducts] = useState([] as Product[])
    const [fetchedQuery, setFetchedQuery] = useState('' as string | undefined)

    useEffect(() => {
        async function getProducts() {
            if (searchQuery === undefined) {
                return
            }
            const products = await CacheManager.searchProducts(searchQuery)
            setProducts(products)
            setFetchedQuery(searchQuery)
        }

        if (fetchedQuery !== searchQuery) {
            getProducts().then()
        }
    }, [products, searchQuery, fetchedQuery])
    return (
        <>
            <Row className='justify-content-between'>
                <Col>
                    <Breadcrumb>
                        <LinkContainer to={'/'}>
                            <Breadcrumb.Item href="#">Strona Główna</Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>Wyniki wyszukiwania</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col className={'d-none d-lg-block'}>
                    <h1 className='pb-3 text-end'>Wyniki wyszukiwania dla "{searchQuery}"</h1>
                </Col>
            </Row>

            <ProductGrid products={products}/>
        </>
    );
};

export default SearchResults;