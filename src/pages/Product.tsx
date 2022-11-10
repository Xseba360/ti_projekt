import {useParams} from "react-router-dom";

const Products = () => {
    let {id} = useParams()
    return <h1>Product {id}</h1>;
};

export default Products;