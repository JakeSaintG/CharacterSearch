export interface ICharacters {
    id: number,
    name: string,
    birthDate: string,
    address: ICharactersAddress,
    interests: string[],
    image: string

}

interface ICharactersAddress {
    street: string,
    city: string,
    state: string,
    zip: number
}