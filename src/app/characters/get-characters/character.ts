export interface ICharacter {
    id: number,
    name: string,
    birthDate: string,
    address: ICharacterAddress,
    interests: string[],
    image: string

}

interface ICharacterAddress {
    street: string,
    city: string,
    state: string,
    zip: number
}