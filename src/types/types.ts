export type Type = {
    id: number;
    description: string;
    image: string;
}

export type Season = {
    id: number;
    description: string;
}

export type Image = {
    id: number;
    source: string;
}

export type Category = {
    id: number;
    name: string;
    images: Image[];
    price: number;
    season: Season;
    type: Type;
}

export type User = {
    id: number;
    username: string;
    email: string;
    profilePhoto: string;
}