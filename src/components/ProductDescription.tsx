import {Accordion} from "react-bootstrap";

interface ProductDescriptionProps {
    product: Product;
}

function ProductDescription(props: ProductDescriptionProps) {
    const product = props.product;
    return (
        <>
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
        </>
    );
}

export default ProductDescription;