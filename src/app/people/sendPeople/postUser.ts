export interface IPostUser {
    id: number,
    name: string,
    birthDate: Date,
    address: IUserAddress,
    interests: string[],
}

export interface IUserAddress {
    street: string,
    city: string,
    state: string,
    zip: number
}