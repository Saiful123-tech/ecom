export interface SignUp{
name: string,
password: string,
email: string
}
export interface login{
    email: string,
    password: string
}
export interface product{
    length: any
    forEach(arg0: (product: product) => void): unknown
    array: any
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id:number,
    quantity:undefined | number,
    productId: undefined | number
}
export interface cart{
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id:number | undefined
    quantity:undefined | number,
    userId: number,
    productId: number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalprice:number,
    userId:number,
    id:number | undefined
}