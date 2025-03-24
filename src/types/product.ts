export type Product = {
    _id: string
    name: string
    description: string
    category: string
    stock: number
    price: number
    image: string
} 

export type ProductForm = Omit<Product, "_id">;
