export default function formatPrice(price: number, long?: boolean): string {
    if (long) {
        return price.toLocaleString('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).replace(',00', ',-').trim();
    } else {
        return price.toLocaleString('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).replace('zł', '').replace(',00', ',-').trim();
    }
}