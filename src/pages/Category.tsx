import {useParams} from "react-router-dom";

const Category = () => {
    let {id} = useParams()
    return <h1>Category {id}</h1>;
};

export default Category;