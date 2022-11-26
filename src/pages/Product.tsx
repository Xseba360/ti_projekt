import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CacheManager} from "../CacheManager";
import {Col, Row} from "react-bootstrap";
import ProductBreadcrumb from "../components/ProductBreadcrumb";
import ProductDescription from "../components/ProductDescription";
import ProductAddToCart from "../components/ProductAddToCart";
import ImageGallery, {ReactImageGalleryItem} from "react-image-gallery";
import './../Product.sass';

interface PhotoGalleryProps {
    images: string[]
}

interface PhotoGalleryState {
    images: ReactImageGalleryItem[]
}

class PhotoGallery extends React.Component<PhotoGalleryProps, PhotoGalleryState> {
    images: ReactImageGalleryItem[];

    constructor(props: PhotoGalleryProps) {
        super(props);
        this.images = props.images.map((image) => {
            return {
                original: image,
                thumbnail: image,
            };
        });
    }

    render() {
        return <ImageGallery items={this.images}/>;
    }
}

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
            {/*<img src={product.photos[0]} width='100px' height='100px' alt={product.name}/>*/}
            <Row className='justify-content-between'>
                <Col md={12} lg={8}>
                    {product.photos.length > 0 ? <PhotoGallery images={product.photos}/> : <></>}
                </Col>
                <Col md={12} lg={4}>
                    <ProductAddToCart product={product}/>
                </Col>
            </Row>
            <Row className='justify-content-between'>
                <Col md={12} lg={8}>
                    <ProductDescription product={product}/>
                </Col>
                <Col md={12} lg={4}>
                </Col>
            </Row>

        </>
    )
        ;
};

export default Products;