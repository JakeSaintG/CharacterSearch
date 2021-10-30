export interface IPostCharacter {
    id: number,
    name: string,
    birthDate: Date,
    address: ICharacterAddress,
    interests: string[],
}

export interface ICharacterAddress {
    street: string,
    city: string,
    state: string,
    zip: number
}