import {useEffect, useState} from "react";
import {CacheManager} from "../CacheManager";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
    const [products, setProducts] = useState([] as Product[])
    useEffect(() => {
        async function getRecommendedProducts() {
            const fetchedProducts = await CacheManager.getRecommendedProducts()
            console.log(fetchedProducts.length)
            setProducts(fetchedProducts)
        }

        if (products.length === 0) {
            getRecommendedProducts().then()
        }
    }, [products])
    return (
        <>
            <h1 className={'text-end'}>Polecane produkty</h1>
            <ProductGrid products={products}/>
        </>
    );
};

export default Home;