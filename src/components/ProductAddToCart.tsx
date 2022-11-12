import {Button, Card} from "react-bootstrap";
import {BsCheckCircle, BsFillCartFill, BsTruck} from "react-icons/bs";
import {FaBox} from "react-icons/fa";
import formatPrice from "../FormatPrice";
import {useGeolocated} from "react-geolocated";
import {useEffect, useState} from "react";

interface ProductAddToCartProps {
    product: Product
}

function ProductAddToCart(props: ProductAddToCartProps) {
    const product = props.product;


    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const [location, setLocation] = useState(undefined as (undefined | string))

    useEffect(() => {
        async function getLocation() {
            if (coords && coords.latitude && coords.longitude) {
                const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${coords?.latitude},${coords?.longitude}&polygon_geojson=1&format=json`)
                const data = await response.json()
                const postal = String(data[0].display_name).match(/(\d\d-\d\d\d)/g)
                setLocation(postal ? postal[0] : undefined)
            }
        }

        if (isGeolocationAvailable && isGeolocationEnabled && coords && location === undefined) {
            getLocation().then()
        }
    }, [coords, isGeolocationAvailable, isGeolocationEnabled, location])

    return (
        <Card>
            <Card.Body>
                <div className="d-grid gap-4">
                    <h2 className='text-end'>{formatPrice(product.price, true)}</h2>
                    <div className='text-success'><BsCheckCircle size={'1.5em'}/> Produkt Dostępny</div>
                    {isGeolocationAvailable && isGeolocationEnabled && coords && location &&
                        <div className='text-success'><BsTruck size={'1.5em'}/> Dostawa do <b>{location}</b></div>}
                    <div>Darmowa dostawa dla zamówień powyżej 100zł</div>
                    <Button
                        size='lg'
                        variant="primary"
                    >
                        <BsFillCartFill size={'1.25em'} className='me-2'/> Dodaj do koszyka
                    </Button>
                    <Button
                        size='lg'
                        variant="success"
                    >
                        <FaBox size={'1.25em'} className='me-2'/> Kup teraz
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductAddToCart;