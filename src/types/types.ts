export type Type = {
    id: number;
    description: string;
    image: string;
}

export type Season = {
    id: number;
    description: string;
    image: string;
}

export type Size = {
    id: number;
    description: string;
}

export type TypePurchase = {
    id: number;
    description: string;
}

export type StatePurchase = {
    id: number;
    description: string;
}

export type Color = {
    id: number;
    description: string;
    code: string;
}

export type Image = {
    id: number;
    color: Color;
    source: string;
}

export type Category = {
    id: number;
    name: string;
    images: Image[];
    sizes: Size[];
    colors: Color[];
    price: number;
    season: Season;
    type: Type;
}

export type Product = {
    category : Category;
    size : Size;
    color : Color;
}

export type User = {
    id: number;
    username: string;
    email: string;
    profilePhoto: string;
    document: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    province: string;
}

export type ItemCart = {
    product: Product;
    amount : number;
}

export type Purchase = {
    id: number;
    price : number;
    typePurchase : TypePurchase;
    statePurchase : StatePurchase;
    createdAt : string;
    image : Image;
    title : string;
}