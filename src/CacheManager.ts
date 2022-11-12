import apiUrls from './apiUrls.json'

const urls: string[] = []
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    for (const url of apiUrls.apiUrls.dev) {
        urls.push(url)
    }
} else {
    for (const url of apiUrls.apiUrls.prod) {
        urls.push(url)
    }
}

export class CacheManager {
    private static selectedApiUrl: string
    private static readonly apiVersion: string = 'v1'
    private static fetchedAllCategories: boolean = false
    private static fetchedProductsByCategory: Map<UUID, boolean> = new Map()
    private static categoryCache = new Map<UUID, Category>()
    private static productCache = new Map<UUID, Product>()
    private static fetchedRecommendedProducts: boolean = false;
    private static recommendedProductUUIDs = new Set<UUID>()

    private static get apiUrl(): string {
        if (!this.selectedApiUrl) {
            this.selectedApiUrl = this.selectRandomApiUrl()
        }
        return this.selectedApiUrl + 'api/' + this.apiVersion + '/'
    }

    public static invalidateCache(): void {
        this.fetchedAllCategories = false
        this.fetchedProductsByCategory.clear()
        this.categoryCache.clear()
        this.productCache.clear()
    }

    public static async getAllCategories(): Promise<Category[]> {
        if (!this.fetchedAllCategories) {
            const apiUrl = this.apiUrl
            const response = await fetch(`${apiUrl}categories/getAll`)
            const data = await response.json() as ApiResultCategory
            if (data.status === 'success') {
                this.fetchedAllCategories = true
                if (data.categories && data.categories.length > 0) {
                    data.categories.forEach((category: Category) => {
                        this.categoryCache.set(category.uuid, category)
                    })
                }
            }
        }
        return Array.from(this.categoryCache.values())
    }

    public static async getCategory(uuid: UUID): Promise<Category | undefined> {
        if (!this.categoryCache.has(uuid)) {
            const apiUrl = this.apiUrl
            const response = await fetch(`${apiUrl}categories/get/${uuid}`)
            const data = await response.json() as ApiResultCategory
            if (data.status === 'success') {
                if (data.category) {
                    this.categoryCache.set(uuid, data.category)
                }
            }
        }
        return this.categoryCache.get(uuid)
    }

    public static async getProduct(uuid: UUID): Promise<Product | undefined> {
        if (!this.productCache.has(uuid)) {
            const apiUrl = this.apiUrl
            const response = await fetch(`${apiUrl}products/get/${uuid}`)
            const data = await response.json() as ApiResultProduct
            if (data.status === 'success') {
                if (data.product) {
                    this.productCache.set(uuid, data.product)
                }
            }
        }
        return this.productCache.get(uuid)
    }

    public static async getProducts(category: UUID): Promise<Product[]> {
        if (!this.fetchedProductsByCategory.has(category)) {
            const apiUrl = this.apiUrl
            const response = await fetch(`${apiUrl}products/getByCategory/${category}`)
            const data = await response.json() as ApiResultProduct
            if (data.status === 'success') {
                this.fetchedProductsByCategory.set(category, true)
                if (data.products) {
                    data.products.forEach((product: Product) => {
                        this.productCache.set(product.uuid, product)
                    })
                }
            }
        }
        return Array.from(this.productCache.values()).filter((product: Product) => product.category === category)
    }

    public static async getRecommendedProducts(): Promise<Product[]> {
        if (!this.fetchedRecommendedProducts) {
            const apiUrl = this.apiUrl
            const count = 6
            const response = await fetch(`${apiUrl}products/getRecommended/${count}`)
            const data = await response.json() as ApiResultProduct
            if (data.status === 'success') {
                this.fetchedRecommendedProducts = true
                this.recommendedProductUUIDs.clear()
                if (data.products) {
                    data.products.forEach((product: Product) => {
                        this.productCache.set(product.uuid, product)
                        this.recommendedProductUUIDs.add(product.uuid)
                    })
                }
            }
        }
        return Array.from(this.productCache.values()).filter((product: Product) => this.recommendedProductUUIDs.has(product.uuid))
    }

    private static selectRandomApiUrl(): string {
        return urls[Math.floor(Math.random() * urls.length)]
    }
}