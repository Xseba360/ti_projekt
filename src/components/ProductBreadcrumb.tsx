import {Breadcrumb} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

interface ProductBreadcrumbProps {
    product: Product;
    category: Category;
}

function ProductBreadcrumb(props: ProductBreadcrumbProps) {
    return (
        <Breadcrumb>
            <LinkContainer to={'/'}>
                <Breadcrumb.Item href="#">Strona Główna</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to={'/category/' + props.category.uuid}>
                <Breadcrumb.Item href="#">{props.category.name}</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{props.product.name}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default ProductBreadcrumb;