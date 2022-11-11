declare type UUID = string

declare interface BaseCategory {
    name: string,
}

declare interface Category extends BaseCategory {
    uuid: UUID,
}

declare interface BaseProduct {
    name: string,
    description: string,
    price: number,
    photos: string[],
    category: Category['uuid'],
}

declare interface Product extends BaseProduct {
    uuid: UUID,
}

type ApiStatus = 'success' | 'error'
type ApiResultCategory = { status: ApiStatus; message?: string; category?: Category, categories?: Category[] }
type ApiResultProduct = { status: ApiStatus; message?: string; product?: Product, products?: Product[] }
type ApiResult = ApiResultCategory & ApiResultProduct